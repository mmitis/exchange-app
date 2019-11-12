import RatioDisplay from './../../components/RatioDisplay';
import { mount } from 'enzyme';
import React from "react";

describe('Component: RatioDisplay', () => {

    it('test simple render', async () => {
        const props = {
            ratio:3,
            ratioCharFrom: 'PLN',
            ratioCharTo: 'EUR'
        };
        const ratio = mount(<RatioDisplay
            {...props}
        />);
        
        expect(ratio).toMatchSnapshot();
    });

});
