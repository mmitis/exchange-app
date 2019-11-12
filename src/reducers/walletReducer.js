import Big from 'big.js';
import {Map} from 'immutable';
import type { Map as MapT} from 'immutable';

import type { ActionType, Account } from "../constants/Types";
import ActionTypes from "../constants/ActionTypes";
import {SupportedCurrenciesByKeys} from "../constants/SupportedCurrencies";

const DEFAULT_BALANCE_START = 100;

export type WalletState = MapT<{
    accounts: MapT<{
        [string] : Account
    }>
}>;

const initialState : WalletState = Map({
    accounts: Map(Object.keys(SupportedCurrenciesByKeys)
        .reduce((acc, key : string) => {
            acc[key] = Map({
               balance : DEFAULT_BALANCE_START
            });
            return acc;
        }, {}))
});

const WalletReducer = function (state: WalletState = initialState, action: ActionType) : WalletState {
    switch (action.type) {
        case ActionTypes.WALLET_EXCHANGE_CURRENCY:
            const {source, target } = action.payload;
            
            //source
            const sourcePreValue = state.getIn(['accounts',source.code, 'balance'], 0);
            const newSourceValue = new Big(sourcePreValue).minus(source.value).toFixed(2);
            const preState = state.setIn(['accounts',source.code, 'balance'],  parseFloat(newSourceValue));

            //target
            const targetPreValue =  preState.getIn(['accounts',target.code, 'balance'], 0);
            const newTargetValue = new Big(targetPreValue).plus(target.value).toFixed(2);
            return preState.setIn(['accounts',target.code, 'balance'], parseFloat(newTargetValue));
        default:
            return state;
    }
};

export default WalletReducer;
