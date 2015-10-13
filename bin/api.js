
/**
 * Module dependencies.
 */

import program from 'commander'
import api from '..'

// options
program
  .option('-H, --host <host>', 'specify the host [0.0.0.0]', '0.0.0.0')
  .option('-p, --port <port>', 'specify the port [4000]', '4000')
  .parse(process.argv)

const app = api()

// listen
app.listen(program.port, program.host, ~~program)
console.log(`Listening on ${program.host}:${program.port}`)
