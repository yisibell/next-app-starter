const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const conf = require('../next.config.js')
const dir = process.cwd()
const nextApp = next({ dev, conf, dir })
const nextAppHandle = nextApp.getRequestHandler()

module.exports = async (app) => {
  await nextApp.prepare()

  app.use((ctx) => {
    ctx.respond = false
    ctx.status = 200

    nextAppHandle(ctx.req, ctx.res)
  })
}
