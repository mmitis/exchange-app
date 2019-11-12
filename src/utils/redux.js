/**
 * Action creator for request start
 * @param actionType
 * @param payload
 * @return {{type: *}}
 */
export function requestStart(actionType: string, payload: any = {}) {
    return {
        type: actionType,
        payload
    }
}

/**
 * Action creator for request success
 * @param actionType
 * @param payload
 * @return {{payload: *, type: string}}
 */
export function requestSuccess(actionType: string, payload : any = {}) {
    return {
        type: `${actionType}_SUCCESS`,
        payload
    }
}

/**
 * Action creator for request failure
 * @param actionType
 * @param error
 * @param payload
 * @return {{payload: {error: *}, type: string}}
 */
export function requestFailure(actionType: string, error: string, payload = {}) {
    return {
        type: `${actionType}_FAILURE`,
        payload: {
            error,
            ...payload
        }
    }
}

