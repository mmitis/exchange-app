import { ExchangeContainer } from './../../containers/ExchangeContainer';
import { mount } from 'enzyme';
import React from "react";

describe('Component: ExchangeContainer', () => {
    const props = {
        accounts: {
            PLN : { balance : 100 },
            USD : { balance : 100 }
        },
        currencies: [
            { code: 'PLN', char: 'zł', rates: { USD: 2 }},
            { code: 'USD', char: '$', rates: { PLN: 0.5}}
        ],
        makeExchange: jest.fn()
    }

    it('test simple render', async () => {
        const container = mount(<ExchangeContainer
            {...props}
        />);
        
        expect(container).toMatchSnapshot();
    });

    it('should simple calculate ratio', async () => {
        const container = mount(<ExchangeContainer
            {...props}
        />);
        const instance = container.instance();
        instance.calculateCurrencyValues('SOURCE', 10);
        container.update();
        expect(instance.state.targetValue).toEqual('5.00');
        instance.calculateCurrencyValues('TARGET', 10);
        container.update();
        expect(instance.state.sourceValue).toEqual('20.00');

    });

    it('should call properly exchange', async () => {
        const container = mount(<ExchangeContainer
            {...props}
        />);
        const instance = container.instance();
        instance.exchange();
        expect(props.makeExchange).toHaveBeenCalledWith({"char": "$", "code": "USD", "rates": {"PLN": 0.5}}, 
        {"char": "zł", "code": "PLN", "rates": {"USD": 2}}, "0.00", "0.00");
    });

    it('should get rate', async () => {
        const container = mount(<ExchangeContainer
            {...props}
        />);
        const instance = container.instance();
        expect(instance.getRate(0,1)).toEqual(0.5);
        expect(instance.getRate(1,0)).toEqual(2);
    });

    it('should check if can get exchange', async () => {
        const container = mount(<ExchangeContainer
            {...props}
        />);
        const instance = container.instance();
        instance.checkIfCanExchange('120.00');
        container.update();
        expect(instance.state.exchangeDisabled).toEqual(true);
        instance.checkIfCanExchange('90.00');
        container.update();
        expect(instance.state.exchangeDisabled).toEqual(false);
    });

    it('should revert currencies', async () => {
        const container = mount(<ExchangeContainer
            {...props}
        />);
        const instance = container.instance();
        instance.setState({
            targetValue: 5,
            sourceValue: 3
        });
        container.update();
        instance.onRevertCurrencies();
        container.update();
        expect(instance.state).toEqual({
            "exchangeDisabled": false,
            "exchangeWarning": "",
            "sourceIndexCurrency": 0,
            "sourceValue": 5,
            "targetIndexCurrency": 1,
            "targetValue": "10.00",
        })
    });

});
