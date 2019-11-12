//@flow

export type CurrencyRates = {
    [string]: number
}

// Model objects
export type Currency = {
    name: string,
    code: string,
    char: string,
    rates: ?CurrencyRates
};

export type Account = MapT<{
    balance: number
}>;

// Redux objects
export type ActionType = {
    type: string,
    payload: ?object
}

export type Dispatch = (ActionType) => void;

export type RequestStatus = 'NOT_PENDING' | 'IN_PROGRESS' | 'SUCCESS' | 'FAILURE';





