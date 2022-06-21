const execa = require('execa')
const consola = require('consola')
const argv = require('yargs/yargs')(process.argv.slice(2)).parse()

async function buildSrc(env) {
  consola.info(`start building app...`)

  const cmdArr = ['cross-env', `NEXT_APP_ENV=${env}`, 'next build']

  const cmdStr = cmdArr.join(' ')

  await execa.command(cmdStr, {
    stdio: 'inherit',
  })

  consola.success(`App build complete.`)
}

async function run() {
  try {
    const { env = 'production' } = argv

    await buildSrc(env)
  } catch (err) {
    consola.error(err)
  }
}

run()
