import axios from 'axios';

const CancelToken = axios.CancelToken;
const activeRequests = {};
axios.interceptors.response.use(undefined, axiosRetryInterceptor);


/**
 * Rewritten interceptor to handle cancels
 * @param err
 * @return {Promise<never>|Promise<AxiosResponse<any>>}
 */
export function axiosRetryInterceptor(err) {
    const config = err.config;

    // If config does not exist or the retries option is not set, reject
    if (!config || !config.retries) {
        return Promise.reject(err);
    }

    // Set the variable for keeping track of the retries count
    config._retriesCount = config._retriesCount || 0;

    // Check if we've maxed out the total number of retries
    if (config._retriesCount >= config.retries) {
        return Promise.reject(err);
    }

    // Increase the retries count
    config._retriesCount += 1;

    // Retry the request after specified "retryDelay"
    return new Promise((resolve) => {
        setTimeout(resolve, config.retryDelay || 1);
    }).then(() => {
        return axios(config);
    });
}

/**
 * Simple fetcher for the API calls
 * @param endpoint
 * @param method
 * @param retries
 * @param transformResultFn
 * @return {Promise<*>}
 */
export async function fetchFromAPI({
                                               endpoint,
                                               method = 'GET',
                                               retries = 0,
                                               transformResultFn = (res) => res
                                           }) {
    const requestKey = `${method}_${endpoint}`;
    if (activeRequests[requestKey]) {
        activeRequests[requestKey].cancel();
    }
    const newCancelToken = CancelToken.source();
    activeRequests[requestKey] = newCancelToken;
    try {
        const response = await axios(endpoint, {
            method,
             cancelToken: newCancelToken.token,
            retries
        });
        return transformResultFn(response.data);
    } catch (error) {
        if (!axios.isCancel(error)) {
            console.warn(error);
        }
        throw error;
    }
}
