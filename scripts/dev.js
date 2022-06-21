/* for development mode */

const argv = require('yargs/yargs')(process.argv.slice(2)).parse()
const execa = require('execa')

async function run() {
  try {
    const { env = 'development', host = '127.0.0.1', port = 3389, https } = argv
    const cmdStr = `cross-env NODE_ENV=development HOST=${host} PORT=${port} NEXT_APP_HTTPS=${https} NEXT_APP_ENV=${env} node server/index.js`

    await execa.command(cmdStr, {
      stdio: 'inherit',
    })
  } catch (err) {
    console.error(err)
  }
}

run()
