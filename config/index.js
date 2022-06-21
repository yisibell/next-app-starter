const devConfig = require('./env/env.development')

module.exports = function (env) {
  switch (env) {
    case 'development':
      return devConfig
    case 'ft':
      return require('./env/env.ft')
    case 'production':
      return require('./env/env.production')
    default:
      return devConfig
  }
}
