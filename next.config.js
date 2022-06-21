const envConfig = require('./config')
const { getPublicRuntimeConfig } = require('./config/util')
const env = process.env.NEXT_APP_ENV

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: getPublicRuntimeConfig(envConfig(env)),
}

module.exports = nextConfig
