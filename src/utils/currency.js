//@flow
import numeral from 'numeral';

/**
 * Formats currency value with the floating
 * @param value
 * @return {*}
 */
export function formatWithFloating(value: string) : string {
    return numeral(value).format('0.00');
}

/**
 * Check if the value is the correct number
 * @param value
 * @return {boolean}
 */
export function validateCurrencyNumber (value :string ): boolean {
    return (
        value === '' ||
        /^[0-9]+$/.test(value) ||
        /^[0-9]*[.]$/.test(value) ||
        /^[0-9]*[.][0-9]{1,2}$/.test(value)
    );
}

/**
 * Iterates and change the index if the array is outside of the range
 * @param index
 * @param length
 * @return {number}
 */
export function getLoopRangedIndex(index : number, length : number) {
    if(index < 0) {
        index = length - 1;
    }
    if(index >= length) {
        index = 0;
    }
    return index;
}

/**
 * Gets new index of the currency array
 * @param index
 * @param value
 * @param arrayToLoop
 * @param preventIndex
 * @return {number}
 */
export function getNewCurrencyIndex(index : number, value:number,  arrayToLoop : Array, preventIndex: number) {
    let newValueTmp = index + value;
    newValueTmp = getLoopRangedIndex(newValueTmp, arrayToLoop.length);
    if(newValueTmp === preventIndex) {
        newValueTmp = value > 0 ? newValueTmp + 1 : newValueTmp - 1;
    }
    newValueTmp = getLoopRangedIndex(newValueTmp, arrayToLoop.length);
    return newValueTmp;
}

