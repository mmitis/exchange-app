// @flow
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import currencyReducer from "./reducers/currencyReducer";
import walletReducer from  "./reducers/walletReducer";

const storeMiddlewares = applyMiddleware(
    thunkMiddleware
);

const storeReducers = combineReducers({
    currency : currencyReducer,
    wallet: walletReducer
});


export const store = compose(
    storeMiddlewares,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)(createStore)(storeReducers);
