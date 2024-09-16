export default request;
/**
 * Makes an HTTP request using the 'got' library and returns the parsed JSON response or the entire response object.
 *
 * @param {string} endpoint - The URL endpoint for the HTTP request.
 * @param {import('got').OptionsInit} [options={}] - Additional options for the 'got' library that configure the HTTP request.
 * @param {boolean} [preferJson=true] - A flag indicating whether to resolve with the JSON-parsed response body only or the full response object.
 * @returns {Promise<Object|import('got').Response>} A promise that resolves to the JSON-parsed response if `preferJson` is true, or the full response object otherwise.
 * @throws {Error} If the HTTP request fails, throws an error with additional properties such as status, message, and a log object for error tracking and debugging.
 */
declare function request(endpoint: string, options?: import("got").OptionsInit, preferJson?: boolean): Promise<any | import("got").Response>;
