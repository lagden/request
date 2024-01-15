import hexId from '@tadashi/hex-id'
import toPort from 'hash-to-port'
import app from './app.js'

const port = toPort(hexId())
const host = '127.0.0.1'

export function server(p = port) {
	return new Promise(resolve => {
		app.listen(host, Number(p), token => {
			if (token) {
				resolve({
					token,
					http: `http://${host}:${p}`,
				})
			}
		})
	})
}
