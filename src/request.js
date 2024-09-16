import { uuid } from '@tadashi/common'
import got from 'got'

/**
 * Makes an HTTP request using the 'got' library and returns the parsed JSON response or the entire response object.
 *
 * @param {string} endpoint - The URL endpoint for the HTTP request.
 * @param {import('got').OptionsInit} [options={}] - Additional options for the 'got' library that configure the HTTP request.
 * @param {boolean} [preferJson=true] - A flag indicating whether to resolve with the JSON-parsed response body only or the full response object.
 * @returns {Promise<Object|import('got').Response>} A promise that resolves to the JSON-parsed response if `preferJson` is true, or the full response object otherwise.
 * @throws {Error} If the HTTP request fails, throws an error with additional properties such as status, message, and a log object for error tracking and debugging.
 */
async function request(endpoint, options = {}, preferJson = true) {
	try {
		if (preferJson) {
			options.responseType = 'json'
			options.resolveBodyOnly = true // Automatically resolve the promise with the response body.
		}

		return await got(endpoint, options)
	} catch (error) {
		// Set additional properties for error handling and logging
		error.status = error?.response?.statusCode
		error.message = error?.response?.statusMessage
		error.expose = true

		// Log information for error tracking and debugging
		const log = {
			level: 'error',
			http_response_code: error.status,
			message: error.message,
			file: import.meta.url,
			options: JSON.stringify(options, undefined, '  '),
			endpoint,
			tracking_error: uuid(false),
		}

		/* c8 ignore start */
		// Convert URLSearchParams to array for logging purposes
		if (options?.searchParams instanceof URLSearchParams) {
			log.searchParams = [...options.searchParams.entries()]
		}
		/* c8 ignore stop */

		/* c8 ignore start */
		// Include response body in log if available
		if (error?.response?.body) {
			log.body = typeof error.response.body === 'string' ? error.response.body : JSON.stringify(error.response.body, undefined, '  ')
		}
		/* c8 ignore stop */

		// Attach the log to the error object
		error.log = log

		// Re-throw the error after logging
		throw error
	}
}

export default request
