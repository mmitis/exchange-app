//@flow
import React, {useEffect} from 'react';
import { initApplication } from "./actions/initAction";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ExchangeContainer from "./containers/ExchangeContainer";
import RequestCaseRenderer from "./components/RequestCaseRenderer";
import type {RequestStatus} from "./constants/Types";

type Props = {
    status: RequestStatus,
    error : string,
    initApplication : () => void
}

const App = ({ initApplication, status, error } : Props) => {

    useEffect(() => {
        initApplication();
    }, [initApplication]);

    return (
        <div className="App">
            <RequestCaseRenderer status={status} error={error}>
                <ExchangeContainer />
            </RequestCaseRenderer>
        </div>
    );
};

export const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initApplication
    }, dispatch);
};

export const mapStateToProps = ({ currency }) => {
    /**
     * App uses currency status to check if it is loaded as it is the only one fetcher to wait
     * It there would be need to use more fetches - it should have separated ApplicationReducer to use
     */
    return {
        status : currency.get('status'),
        error: currency.get('error')
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

