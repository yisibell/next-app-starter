const execa = require('execa')
const consola = require('consola')
const argv = require('yargs/yargs')(process.argv.slice(2)).parse()

async function buildSrc(env, { analyze } = {}) {
  consola.info(`start building app...`)

  const cmdArr = [
    'cross-env',
    `NEXT_APP_ENV=${env}`,
    `ANALYZE=${analyze}`,
    'next build',
  ]

  const cmdStr = cmdArr.join(' ')

  await execa.command(cmdStr, {
    stdio: 'inherit',
  })

  consola.success(`App build complete.`)
}

async function run() {
  try {
    const { env = 'production', analyze } = argv

    consola.info('build with analyze?', analyze === '1' ? 'yes' : 'no')

    await buildSrc(env, { analyze })
  } catch (err) {
    consola.error(err)
  }
}

run()
