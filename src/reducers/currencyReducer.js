import type {ActionType, Currency, RequestStatus} from "../constants/Types";
import ActionTypes from "../constants/ActionTypes";
import RequestStatuses from "../constants/RequestStatuses";
import {Map, List} from 'immutable';
import type { Map as MapT, List as ListT} from 'immutable';

type CurrencyState = MapT<{
    status: RequestStatus,
    error: string | null,
    intervalLoop: boolean,
    entries: ListT<Currency>
}>

const initialState : CurrencyState = Map({
    status: RequestStatuses.NOT_PENDING,
    error: null,
    intervalLoop: false,
    entries: List()
});

const CurrencyReducer = function (state: CurrencyState = initialState, action: ActionType) : CurrencyState {
    switch (action.type) {
        case ActionTypes.CURRENCIES_VALUES_GET:
            if(action.payload.isUpdate){
                return state;
            }
            return state.set('status', RequestStatuses.IN_PROGRESS);
        case ActionTypes.CURRENCIES_VALUES_GET_SUCCESS:
            const { entries } = action.payload;
            return state.merge({
                status: RequestStatuses.SUCCESS,
                entries: List(entries)
            });
        case ActionTypes.CURRENCIES_TOGGLE_INTERVAL:
            return state.set('intervalLoop', !state.get('intervalLoop', false));
        default:
            return state;
    }
};

export default CurrencyReducer;
