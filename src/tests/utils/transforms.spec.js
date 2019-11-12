import { transformCurrencyFromAPItoApp } from '../../utils/transforms';
import { SupportedCurrenciesByKeys } from '../../constants/SupportedCurrencies';
describe('Utils: transforms', () => {

    it('should test transformCurrencyFromAPItoApp', async () => {
        expect(transformCurrencyFromAPItoApp([
            {
                base: 'USD',
                date: 'none',
                rates: {
                    'EUR': 2
                }
            },
            {
                base: 'EUR',
                date: 'none',
                rates: {
                    'USD': 3
                }
            },
            {
                base: 'SMP',
                date: 'none',
                rates: {
                    'NNN': 7
                }
            }
        ], SupportedCurrenciesByKeys)).toEqual([
            {"char": "$", "code": "USD", "name": "Dollar", "rates": {"EUR": 2}},
            {"char": "€", "code": "EUR", "name": "Euro", "rates": {"USD": 3}}]);

    });
});
