import currencyReducer from './../../reducers/currencyReducer';
import {fromJS} from 'immutable';
import ActionTypes from "../../constants/ActionTypes";
import RequestStatuses from "../../constants/RequestStatuses";

describe('Reducer: Currency', () => {

    it('should test initial state', () => {
        const state = currencyReducer(
           undefined, {});

        expect(state.toJS()).toEqual({
            status: RequestStatuses.NOT_PENDING,
            error: null,
            intervalLoop: false,
            entries: []
        });
    });

    it('should test action CURRENCIES_VALUES_GET', () => {
        const state = currencyReducer(
            fromJS({}),
            {
                type: ActionTypes.CURRENCIES_VALUES_GET,
                payload: {}
            });

        expect(state.toJS()).toEqual({
            status : 'IN_PROGRESS'
        });

        const stateWithUpdate = currencyReducer(
            fromJS({}),{
                type: ActionTypes.CURRENCIES_VALUES_GET,
                payload: {
                    isUpdate: true
                }
            });
        expect(stateWithUpdate.toJS()).toEqual({});
    });

    it('should test action CURRENCIES_VALUES_GET_SUCCESS', () => {
        const state = currencyReducer(
            fromJS({}),
            {
                type: ActionTypes.CURRENCIES_VALUES_GET_SUCCESS,
                payload: {
                    entries: [{ a : 'element '}]
                }
            });

        expect(state.toJS()).toEqual({
            status : 'SUCCESS',
            entries: [{ a : 'element '}]
        });
    });

    it('should test action CURRENCIES_TOGGLE_INTERVAL', () => {
        const state = currencyReducer(
            fromJS({
                intervalLoop: false
            }),
            {
                type: ActionTypes.CURRENCIES_TOGGLE_INTERVAL,
            });

        expect(state.toJS()).toEqual({
            intervalLoop: true
        });
    });
});
