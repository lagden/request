/* eslint new-cap: 0 */
import uWS from 'uWebSockets.js'
import createError from 'http-errors'
import readJson from './read-json.js'

// Create a new uWS HTTP server
const app = uWS.App()
const ctk = 'Content-Type'
const ctv = 'application/json'

app.post('/data', (res) => {
	readJson(
		res,
		(data) => {
			res.writeHeader(ctk, ctv).end(JSON.stringify({ data }))
		},
		() => {
			const error = createError(500)
			res.writeStatus(`${error.statusCode} ${error.message}`)
				.writeHeader(ctk, ctv)
				.end(JSON.stringify({ status: error.statusCode, error: 'Invalid JSON or no data at all!' }))
		},
	)
})
	.post('/redirect', (res) => {
		res.writeStatus('301 Moved Permanently').writeHeader('Location', '/data').end()
	})
	.post('/redirect-loop', (res) => {
		res.writeStatus('301 Moved Permanently').writeHeader('Location', '/redirect-loop').end()
	})
	.get('/json', (res) => {
		res.writeHeader(ctk, ctv).end(JSON.stringify({ data: 'ok' }))
	})
	.get('/status/:code', (res, req) => {
		const code = req.getParameter(0)
		const error = createError(Number(code))
		res.writeStatus(`${error.statusCode} ${error.message}`)
			.writeHeader(ctk, ctv)
			.end(JSON.stringify({ status: error.statusCode, error: error.message }))
	})
	.get('/any', (res) => {
		const error = createError(401)
		res.writeStatus(`${error.statusCode} ${error.message}`).end(error.message)
	})
	.any('/*', (res) => {
		res.end('Nothing to see here!')
	})

export default app
