import ExchangeButton from './../../components/ExchangeButton';
import { mount } from 'enzyme';
import React from "react";

describe('Component: ExchangeButton', () => {

    it('test simple render', async () => {
        const button = mount(<ExchangeButton
            onClick={() => {}}
            label={'Exchange!'}
            isDisabled={true}
        />);

        expect(button).toMatchSnapshot();

    });

    it('test simple render - disabled', async () => {
              const button = mount(<ExchangeButton
            onClick={() => {}}
            label={'Exchange!'}
            isDisabled={false}
        />);

        expect(button).toMatchSnapshot();

    });
});
