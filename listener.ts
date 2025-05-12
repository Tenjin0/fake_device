import { Socket } from 'socket.io-client'
import { FakeDevice } from './fake_device.class'

export function addListeners(this: FakeDevice, socket: Socket) {
	socket.on('connect', () => {
		console.log('<<< connect')
	})

	socket.on('disconnect', () => {
		console.log('<<< disconnect')
	})

	socket.on('error', (err) => {
		console.log('<<< error', err)
	})
	socket.on('reconnect', () => {
		console.log('<<< reconnect')
	})
	socket.on('reconnect_error', () => {
		console.log('<<< reconnect_error')
	})
	socket.on('reconnecting', () => {
		console.log('<<< reconnecting')
	})
	socket.on('register.ask', () => {
		console.log('<<< register.ask')
		this.emitEvent('register.response', { serial: 'fake_serial 1', version: '1.0.0' })
	})

	socket.on('register.ack', () => {
		console.log('<<< register.ack')
	})
}
