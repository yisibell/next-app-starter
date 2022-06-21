const Koa = require('koa')
const consola = require('consola')
const createNextAppRoutes = require('./nextApp')
const proxy = require('./middleware/proxy')

async function start() {
  try {
    const app = new Koa()

    // proxy
    app.use(proxy())

    // Next render routes
    await createNextAppRoutes(app)

    const host = process.env.HOST || '127.0.0.1'
    const port = process.env.PORT || 3389

    app.listen(port, host)
    consola.success(`Server listening on http://${host}:${port}`)

    app.on('error', (err, ctx) => {
      console.error('server error', err, ctx)
    })
  } catch (err) {
    consola.error(err)
  }
}

start()
