//@flow
import React from "react";
import {connect} from "react-redux";
import Big from 'big.js';
import {bindActionCreators} from "redux";
import isEqual from 'lodash/isEqual';

import { makeExchange } from "../actions/currencyAction";
import {formatWithFloating,  getNewCurrencyIndex, validateCurrencyNumber} from "../utils/currency";

import ExchangeInput from "../components/ExchangeInput";
import ExchangeSlide from '../components/ExchangeSlide';
import ExchangeRotate from "../components/ExchangeRotate";
import ExchangeButton from "../components/ExchangeButton";
import RatioDisplay from "../components/RatioDisplay";

const DIR = {
    TARGET : 'TARGET',
    SOURCE: 'SOURCE'
};

const CLEARED_STATE = {
    targetValue: '0.00',
    sourceValue: '0.00',
};

export class ExchangeContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            exchangeWarning: '',
            exchangeDisabled: true,
            targetIndexCurrency: 0,
            sourceIndexCurrency: 1,
            
            targetValue: '0.00',
            sourceValue: '0.00'
        };

        this.exchange = this.exchange.bind(this);
        this.checkValueSource = this.checkValueOnBlur.bind(this, 'sourceValue');
        this.checkValueTarget = this.checkValueOnBlur.bind(this, 'targetValue');
    }

    componentDidUpdate(prevProps){
        if(!isEqual(prevProps.currencies,this.props.currencies)) {
            this.calculateCurrencyValues(DIR.SOURCE, this.state.sourceValue);
        }
    }
    
    getRate(source : number, target : number) {
        const { currencies } = this.props;
        return currencies[target].rates[currencies[source].code];
    }

    exchange() {
        const { currencies, makeExchange } = this.props;
        const { targetIndexCurrency, sourceIndexCurrency, targetValue, sourceValue} = this.state;
        this.setState({
            ...CLEARED_STATE,
            exchangeDisabled: true
        });
        return makeExchange(currencies[sourceIndexCurrency], currencies[targetIndexCurrency], sourceValue, targetValue);
    }
    
    
    calculateCurrencyValues(direction, value) {
        if (value === '') {
            this.setState(CLEARED_STATE);
        } else {
            const { targetIndexCurrency, sourceIndexCurrency } = this.state;

            if (direction === DIR.SOURCE) {
                const recalculatedValue = new Big(value)
                    .times(this.getRate(targetIndexCurrency, sourceIndexCurrency))
                    .toFixed(2);

                this.setState({
                    targetValue: formatWithFloating(recalculatedValue)
                });
                this.checkIfCanExchange(value);
            } else {
                const recalculatedValue = new Big(value)
                    .times(this.getRate(sourceIndexCurrency, targetIndexCurrency))
                    .toFixed(2);
                this.setState({
                    sourceValue: formatWithFloating(recalculatedValue)
                });
                this.checkIfCanExchange(recalculatedValue);

            }
        }
    };

    checkValueOnBlur(field,value) {
        this.checkIfCanExchange(this.state.sourceValue);
        if(parseFloat(value) === 0) {
            this.setState();
        } else {
            this.setState({
                [field]: formatWithFloating(value)
            });
        }
    }

    checkIfCanExchange(value : string) {
        const { sourceIndexCurrency } = this.state;
        const { accounts, currencies } = this.props;
        const balance = accounts[currencies[sourceIndexCurrency].code].balance;
        this.setState({
            exchangeWarning: parseFloat(balance) < parseFloat(value) ? 'There are insufficient funds to make exchange' : '',
            exchangeDisabled: parseFloat(value) === 0 || parseFloat(balance) < parseFloat(value),
        });
    }

    onValueChange(direction : string, value : string) {
        if (validateCurrencyNumber(value)) {
            const formattedValue = value !== '' ? value : '';
            if(direction === DIR.SOURCE) {
                this.setState({
                    sourceValue: formattedValue
                });
            } else {
                this.setState({
                    targetValue: formattedValue
                });
            }
            this.calculateCurrencyValues(direction, value);
        }
    };

    onSlideTarget(value : string) {
        const { targetIndexCurrency, sourceIndexCurrency } = this.state;
        const { currencies } = this.props;

        let newValueTmp = getNewCurrencyIndex(targetIndexCurrency, value, currencies, sourceIndexCurrency); 
        this.setState({
            targetIndexCurrency: newValueTmp 
        }, () => {
            this.calculateCurrencyValues(DIR.TARGET, this.state.targetValue);
        });
    }

    onSlideSource(value : string) {
        const { targetIndexCurrency, sourceIndexCurrency } = this.state;
        const { currencies } = this.props;

        let newValueTmp = getNewCurrencyIndex(sourceIndexCurrency, value, currencies, targetIndexCurrency); 

        this.setState({
            sourceIndexCurrency: newValueTmp 
        }, () => {
            this.calculateCurrencyValues(DIR.SOURCE, this.state.sourceValue);
        });
    }

    onRevertCurrencies() {
        this.setState({
            targetIndexCurrency: this.state.sourceIndexCurrency,
            sourceIndexCurrency: this.state.targetIndexCurrency,
            sourceValue: this.state.targetValue
        }, () => {
            this.calculateCurrencyValues(DIR.SOURCE, this.state.sourceValue);
        });
        
    }

    render() {
        const { currencies, accounts } = this.props;
        const { targetIndexCurrency, sourceIndexCurrency, exchangeDisabled, exchangeWarning } = this.state;

        if (currencies.length > 2) {
            const ratio = this.getRate(targetIndexCurrency, sourceIndexCurrency);
            return (
                <div className="exchange-container container">
                        <ExchangeSlide
                            onLeftClick={this.onSlideSource.bind(this, -1)}
                            onRightClick={this.onSlideSource.bind(this, 1)}
                        >
                            <ExchangeInput
                                currency={currencies[sourceIndexCurrency]}
                                balance={accounts[currencies[sourceIndexCurrency].code].balance}
                                onValueChange={this.onValueChange.bind(this, DIR.SOURCE)}
                                onBlur={this.checkValueSource}
                                value={this.state.sourceValue}
                            />
                        </ExchangeSlide>
                        <RatioDisplay ratio={ratio} ratioCharFrom={currencies[sourceIndexCurrency].char}
                                      ratioCharTo={currencies[targetIndexCurrency].char}/>
                        
                        <ExchangeRotate onClick={this.onRevertCurrencies.bind(this)}/>
                        <ExchangeSlide
                            onLeftClick={this.onSlideTarget.bind(this, -1)}
                            onRightClick={this.onSlideTarget.bind(this, 1)}
                        >
                            <ExchangeInput
                                currency={currencies[targetIndexCurrency]}
                                balance={accounts[currencies[targetIndexCurrency].code].balance}
                                onValueChange={this.onValueChange.bind(this, DIR.TARGET)}
                                onBlur={this.checkValueTarget}
                                value={this.state.targetValue}
                            />
                        </ExchangeSlide>
                        <ExchangeButton 
                            label={'Exchange!'}
                            onClick={this.exchange}
                            isDisabled={exchangeDisabled}
                            disabledMsg={exchangeDisabled}
                        />
                        <div className="text-center">{exchangeWarning}</div>
                </div>
            )
        }
        return null;
    }
}

const mapStateToProps = ({wallet, currency}) => {
    return {
        accounts: wallet.get('accounts').toJS(),
        currencies: currency.get('entries').toJS()
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        makeExchange
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ExchangeContainer);

