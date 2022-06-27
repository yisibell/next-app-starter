const envConfig = require('./config')
const { getPublicRuntimeConfig } = require('./config/util')
const { i18n } = require('./next-i18next.config')

const env = process.env.NEXT_APP_ENV

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 运行时环境变量
  publicRuntimeConfig: getPublicRuntimeConfig(envConfig(env)),
  // 多语言
  i18n,
}

module.exports = nextConfig
