//@flow
import type { Currency } from './Types';
/**
 * List of the supported currencies
 */
const SupportedCurrencies: Array<Currency> = [
    {
        name: 'Złoty',
        code: 'PLN',
        char: 'zł'
    },
    {
        name: 'Pound',
        code: 'GBP',
        char: '£'
    },
    {
        name: 'Dollar',
        code: 'USD',
        char: '$'
    },
    {
        name: 'Euro',
        code: 'EUR',
        char: '€'
    }
];
export const SupportedCurrenciesByKeys = Object.values(SupportedCurrencies).reduce((acc, el) => { acc[el.code] = el; return acc ;}, {});
export default SupportedCurrencies;
