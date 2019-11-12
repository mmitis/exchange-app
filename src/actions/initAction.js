import type {Dispatch} from "../constants/Types";
import {getCurrencyRates, runRefreshInterval} from "./currencyAction";

/**
 * Application initialization
 */
export function initApplication () {
    return (dispatch : Dispatch) => {
        dispatch(getCurrencyRates());
        dispatch(runRefreshInterval());
    }
}
