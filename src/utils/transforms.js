//@flow
import type {APICurrency, APICurrencyResponse} from "../constants/TypesAPI";
import type {Currency} from "../constants/Types";

/**
 * Transforms from API format to application format
 * @param response
 * @param supportedCurrencies
 * @return {Array<Currency>}
 */
export function transformCurrencyFromAPItoApp(response : APICurrencyResponse, supportedCurrencies : { [string] : Currency}) {
    return response.reduce((acc: Array<Currency>, currency: APICurrency) => {
        if(currency.base in supportedCurrencies) {
            const newElement : Currency = {
                name: supportedCurrencies[currency.base].name,
                code: currency.base,
                char: supportedCurrencies[currency.base].char,
                rates: Object.keys(supportedCurrencies)
                    .reduce(function rate(acc, currencyCode) {
                        if(currencyCode in currency.rates){
                            acc[currencyCode] = currency.rates[currencyCode];
                        }
                        return acc;
                    }, {})
            };
            acc.push(newElement);
        }
        return acc;
    }, []);
}
