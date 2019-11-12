/**
 * Replaces params inside URL path in string
 * @param path
 * @param params
 */
export function replaceParamsInPath(path: string, params: object) {
    const paramHits = path.match(/(::.+?)(?=\/|\?|#|$)/g);
    if (paramHits) {
        paramHits.forEach(hit => {
            const paramName = hit.substring(2);
            const paramValue = params[paramName];
            if (!paramValue) {
                console.warn(`Url param "${paramName}" is missing in specified params object.`);
            }

            path = path.replace('::' + paramName, paramValue);
        });
    }
    return path;
}
