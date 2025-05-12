import { Command } from '@commander-js/extra-typings'
import { FakeDevice } from './fake_device.class'

interface IArgs {
	host: string
	port: number
	namespace: string
}
// try {
// 	// eslint-disable-next-line @typescript-eslint/no-require-imports
// 	require('dotenv').config({
// 		path: ['.env', '.env.' + process.env.NODE_ENV, '.env.' + process.env.NODE_ENV + '.local'],
// 		override: true,
// 	})
// } catch (err) {
// 	console.error(err)
// }

const host = process.env.host ?? 'http://localhost'
const port = process.env.port ?? '3100'
const program = new Command()

program.version('0.0.1')
program
	.requiredOption('-n, --namespace <string>', 'namespace')
	.option('-h, --host <string>', 'host', host)
	.option('-p, --port <number>', 'port', port)

program.parse(process.argv)
const params: IArgs = program.opts() as unknown as IArgs
console.log(params)
const fakeClient = FakeDevice.Factory(params.host, params.port, params.namespace, {})
fakeClient.connect()
