import {uuid} from '@tadashi/common'
import got from 'got'

/**
 * Makes an HTTP request using the 'got' library and returns the parsed JSON response.
 *
 * @param {string} endpoint - The URL endpoint for the HTTP request.
 * @param {Object} [options={}] - Additional options for the 'got' library.
 * @returns {Promise<Object>} A promise that resolves to the parsed JSON response.
 * @throws {Error} If the HTTP request fails, an error is thrown with additional information.
 */
async function request(endpoint, options = {}) {
	try {
		// Make the HTTP request using the 'got' library and parse the JSON response
		return await got(endpoint, options).json()
	} catch (error) {
		// Set additional properties for error handling and logging
		error.status = error?.response?.statusCode
		error.message = error?.response?.statusMessage
		error.expose = true

		/* c8 ignore start */
		// Convert URLSearchParams to array for logging purposes
		if (options?.searchParams instanceof URLSearchParams) {
			options.searchParams = [...options.searchParams.entries()]
		}
		/* c8 ignore stop */

		// prettier-ignore
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
