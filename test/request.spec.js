import assert from 'node:assert'
import {after, before, test} from 'node:test'
import uWS from 'uWebSockets.js'
import {server} from './helper/server.js'
import request from '../src/request.js'

const ctx = {}

before(async () => {
	const {token, http} = await server()
	ctx.token = token
	ctx.http = http
})

after(() => {
	if (ctx.token) {
		uWS.us_listen_socket_close(ctx.token)
	}
})

test('rest function - should return response object', async () => {
	const response = await request(`${ctx.http}/data`, {
		method: 'POST',
		json: {key: 'value'},
		responseType: 'json',
	})

	assert.equal(typeof response, 'object')
	assert.deepEqual(response, {data: {key: 'value'}})
})

test('rest got - simple - should return response object', async () => {
	const response = await request('https://registry.npmjs.org/@tadashi/got/latest')
	assert.equal(typeof response, 'object')
	assert.equal(response.name, '@tadashi/got')
})

test('rest function - should return response text', async () => {
	assert.rejects(request(`${ctx.http}/any`, {method: 'GET'}), {
		name: 'HTTPError',
		message: 'Unauthorized',
	})
})
