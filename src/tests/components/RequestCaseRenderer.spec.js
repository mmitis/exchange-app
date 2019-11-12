import RequestCaseRenderer from './../../components/RequestCaseRenderer';
import { mount } from 'enzyme';
import React from "react";

describe('Component: RequestCaseRenderer', () => {

    it('test simple render - in_progress', async () => {
        const props = {
           status: 'IN_PROGRESS'
        };
        const rotate = mount(<RequestCaseRenderer
            {...props}
        >
            <div className={'sample-div'}></div>

        </RequestCaseRenderer>);
        
        expect(rotate).toMatchSnapshot();
    });

    it('test simple render - error', async () => {
        const props = {
           status: 'FAILURE',
           error: 'Sample Error'
        };
        const rotate = mount(<RequestCaseRenderer
            {...props}
        >
            <div className={'sample-div'}></div>

        </RequestCaseRenderer>);
        
        expect(rotate).toMatchSnapshot();
    });

    it('test simple render - success', async () => {
        const props = {
           status: 'SUCCESS'
        };
        const rotate = mount(<RequestCaseRenderer
            {...props}
        >
            <div className={'sample-div'}></div>

        </RequestCaseRenderer>);
        
        expect(rotate).toMatchSnapshot();
    });

});
