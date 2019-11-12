import ExchangeSlide from './../../components/ExchangeSlide';
import { mount } from 'enzyme';
import React from "react";

describe('Component: ExchangeSlide', () => {

    it('test simple render', async () => {
        const props = {
            onLeftClick: () => {},
            onRightClick: () => {},
            className: 'sample-class'
        };
        const rotate = mount(<ExchangeSlide
            {...props}
        >
            <div className={'sample-div'}></div>

        </ExchangeSlide>);
        
        expect(rotate).toMatchSnapshot();
    });

});
