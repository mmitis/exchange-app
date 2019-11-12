import type {Currency, Dispatch} from "../constants/Types";
import SupportedCurrencies, { SupportedCurrenciesByKeys} from "../constants/SupportedCurrencies";
import {fetchFromAPI} from "../utils/fetchers";
import ApiEndpoints from "../constants/ApiEndpoints";
import {transformCurrencyFromAPItoApp} from "../utils/transforms";
import {replaceParamsInPath} from "../utils/url";
import ActionTypes from "../constants/ActionTypes";
import {requestFailure, requestStart, requestSuccess} from "../utils/redux";

const CURRENCY_REFRESH_INTERVAL = 10000;

/**
 * Updates all supported currencies rates
 */
export function getCurrencyRates (isUpdate : boolean  = false) {
    return async (dispatch : Dispatch ) => {

            dispatch(requestStart(ActionTypes.CURRENCIES_VALUES_GET, {
                isUpdate
            }));

            const currencyPromises = SupportedCurrencies
                .map((currency : Currency) => {
                    const currencyURL = replaceParamsInPath(ApiEndpoints.CURRENCIES, {
                        currency: currency.code
                    });
                    return fetchFromAPI({
                        endpoint: currencyURL
                    });

                });
            try {
                const results = await Promise.all(currencyPromises);
                const transformedResult =  transformCurrencyFromAPItoApp(results, SupportedCurrenciesByKeys);
                dispatch(requestSuccess(ActionTypes.CURRENCIES_VALUES_GET, {
                    entries : transformedResult,
                    isUpdate
                }));

            } catch (error) {
                console.warn('Unable to get currency rates' , error);
                dispatch(requestFailure(ActionTypes.CURRENCIES_VALUES_GET), error);
            }
    }
}

/**
 * Performs exchange between two user wallets
 * @param sourceCurrency
 * @param targetCurrency
 * @param sourceValue
 * @param targetValue
 */
export function makeExchange(sourceCurrency : Currency, targetCurrency : Currency, sourceValue : string, targetValue : string) {
    return {
        type: ActionTypes.WALLET_EXCHANGE_CURRENCY,
        payload: {
            source: {
                code: sourceCurrency.code,
                value: sourceValue
            },
            target: {
                code: targetCurrency.code,
                value: targetValue
            }
        }
    }
}

/**
 * Starts interval of refreshing data
 */
export function runRefreshInterval() {
    return (dispatch : Dispatch) => {
        dispatch({
            type: ActionTypes.CURRENCIES_TOGGLE_INTERVAL
        });
        dispatch(refreshRatesInterval())
    }
}

/**
 * Perform refreshing data till the flag in the reducer is set to true
 */
export function refreshRatesInterval() {
    return async (dispatch : Dispatch, getState) => {
        setTimeout(function refreshInterval() {
            const state = getState();
            const isLoopActive = state.currency.get('intervalLoop');
            if(isLoopActive) {
                dispatch(getCurrencyRates(true));
                dispatch(refreshRatesInterval());
            }
        }, CURRENCY_REFRESH_INTERVAL);
    }
}
