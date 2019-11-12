import ExchangeRotate from './../../components/ExchangeRotate';
import { mount } from 'enzyme';
import React from "react";

describe('Component: ExchangeRotate', () => {

    it('test simple render', async () => {

        const rotate = mount(<ExchangeRotate
            onClick={() => {}}
        />);
        
        expect(rotate).toMatchSnapshot();
    });

});
