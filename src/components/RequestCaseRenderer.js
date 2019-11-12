//@flow
import React from "react";
import type {RequestStatus} from "../constants/Types";
import RequestStatuses from "../constants/RequestStatuses";

type Props = {
    status: RequestStatus,
    error: string,
    children: React$Node
}
export const RequestCaseRenderer = ({
                                  status,
                                  error,
                                  children
} : Props) => {
    switch(status) {
        case RequestStatuses.NOT_PENDING:
            return null;
        case RequestStatuses.IN_PROGRESS:
            return <div className="spinner" />;
        case RequestStatuses.SUCCESS:
            return children;
        case RequestStatuses.FAILURE:
            return <div className="error-message">{error}</div>;
        default:
            return null;
    }
};

export default RequestCaseRenderer;
