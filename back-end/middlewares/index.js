const { corsSetupMiddleware } = require('./corsSetupMiddleware')
const { ensureAuthenticated } = require('./ensureAuthenticated')
const { expressSessionSetup } = require('./expressSessionMiddleware')

module.exports = {
  corsSetupMiddleware,
  expressSessionSetup,
  ensureAuthenticated
}
