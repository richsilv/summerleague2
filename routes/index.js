const home = require('./home')
const fixtures = require('./fixtures')
const about = require('./about')
const middleware = require('./middleware')

module.exports = function (app, db) {
  middleware.populateContext(app, db)
  app.get('/', home(app, db))
  app.get('/fixtures/:name?', fixtures(app, db))
  app.get('/about/:section?', about(app, db))
}
