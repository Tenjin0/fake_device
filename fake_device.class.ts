import { EventEmitter } from 'events'
import { io, Socket } from 'socket.io-client'
import { addListeners } from './listener'

export class FakeDevice extends EventEmitter {
	private host: string
	private port: number
	private socket: Socket
	private namespace: string
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	addListeners: Function

	constructor(host, port, namespace: string, opt: any) {
		super()
		this.host = host
		this.port = port
		this.namespace = namespace
		this.generateSocket()
		this.addListeners = addListeners.bind(this)(this.socket)
	}

	getUrl() {
		return `${this.host}:${this.port}/${this.namespace}`
	}
	generateSocket() {
		this.socket = io(this.getUrl(), {
			autoConnect: false,
			reconnection: true,
			reconnectionDelay: 100,
			transports: ['websocket'],
			auth: {
				token: '123',
			},
		})
		this.socket.on('connect_error', (err) => {
			console.error(err)
		})
	}

	connect() {
		this.socket.connect()
	}

	emitEvent(event: string, ...args) {
		console.log('>>> ', event, ...args)
		this.socket.emit(event, ...args)
	}

	static Factory(host: string, port: number, namespace: string, opt: any = {}) {
		return new FakeDevice(host, port, namespace, opt)
	}
}
