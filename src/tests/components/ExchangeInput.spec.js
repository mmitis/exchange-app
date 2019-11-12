import ExchangeInput from './../../components/ExchangeInput';
import { mount } from 'enzyme';
import React from "react";

describe('Component: ExchangeInput', () => {

    it('test simple render', async () => {
        const props = {
            currency : {
                code: 'PLN',
                char: 'zł',
            },
            balance  : 100,
            onValueChange: () => {},
            onBlur: () => {},
            value: 23,
            className: 'none'
        };
        const ratio = mount(<ExchangeInput
            {...props}
        />);
        
        expect(ratio).toMatchSnapshot();
    });

});
