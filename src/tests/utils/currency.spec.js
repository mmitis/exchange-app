import {  validateCurrencyNumber, getLoopRangedIndex, getNewCurrencyIndex, formatWithFloating } from '../../utils/currency';

describe('Utils: currency', () => {

    it('should test validateCurrencyNumber', async () => {
        expect(validateCurrencyNumber('asdasd')).toEqual(false);
        expect(validateCurrencyNumber('0.aa')).toEqual(false);
        expect(validateCurrencyNumber('0.00')).toEqual(true);
        expect(validateCurrencyNumber('1')).toEqual(true);
    });

    it('should test getLoopRangedIndex', async () => {
        expect(getLoopRangedIndex(-3, 7)).toEqual(6);
        expect(getLoopRangedIndex(7, 7)).toEqual(0);
    });

    it('should test getNewCurrencyIndex', async () => {
        expect(getNewCurrencyIndex(1, 1, [1,1,1], 2)).toEqual(0);
        expect(getNewCurrencyIndex(2, 1, [1,1,1], 1)).toEqual(0);
        expect(getNewCurrencyIndex(0, 1, [1,1,1], 2)).toEqual(1);
    });

    it('should test formatWithFloating', async () => {
        expect(formatWithFloating(1)).toEqual('1.00');
        expect(formatWithFloating(0)).toEqual('0.00');

    });
});
