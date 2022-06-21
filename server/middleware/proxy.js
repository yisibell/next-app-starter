const k2c = require('koa-connect')
const { createProxyMiddleware } = require('http-proxy-middleware')
const envConfig = require('../../config')

const { NUXT_APP_ENV } = process.env

const { proxy: proxyOptions, NUXT_APP_BASE_API } = envConfig(NUXT_APP_ENV)

module.exports = () => {
  return async (ctx, next) => {
    if (
      proxyOptions &&
      proxyOptions.target &&
      ctx.url.startsWith(NUXT_APP_BASE_API)
    ) {
      await k2c(createProxyMiddleware(proxyOptions))(ctx, next)
    }

    await next()
  }
}
