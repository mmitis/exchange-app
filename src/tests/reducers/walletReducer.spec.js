import walletReducer from './../../reducers/walletReducer';
import { fromJS } from 'immutable';
import ActionTypes from "../../constants/ActionTypes";

describe('Reducer: Wallet', () => {

    it('should test initial state', () => {
        const state = walletReducer(
            undefined ,{});

        expect(state.toJS()).toEqual({
            accounts: {
                PLN : {
                    balance: 100
                },
                GBP : {
                    balance : 100
                },
                EUR : {
                    balance : 100
                },
                USD: {
                    balance : 100
                }
            }
        });
    });

    it('should test action WALLET_EXCHANGE_CURRENCY', () => {
        const state = walletReducer(
            fromJS({
                accounts: {
                    WAW : {
                        balance : 100
                    },
                    NON : {
                        balance : 100
                    }
                }
            }),
            {
                type: ActionTypes.WALLET_EXCHANGE_CURRENCY,
                payload: {
                    source : {
                        code : 'WAW',
                        value: 30
                    },
                    target : {
                        code : 'NON',
                        value: 40
                    }
                }
            });

        expect(state.toJS()).toEqual({
            accounts: {
                WAW : {
                    balance : 70
                },
                NON : {
                    balance : 140
                }
            }
        });

    });

});
