//@flow
export type APICurrency = {
    base: string,
    date: string,
    rates: {
        [string]: number
    }
}
export type APICurrencyResponse = Array<APICurrency>;





