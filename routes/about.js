const async = require('async')

module.exports = (app, db) => {
  return (req, res, next) => {
    async.parallel({
      clubs: db.clubs.find.bind(db.clubs),
      staticData: db.staticdata.find.bind(db.staticdata)
    }, (err, data) => {
      if (err) {
        return res.render('error', {
          message: 'Database error',
          error: err
        })
      }
      res.context.section = req.params.section
      res.context.clubs = data.clubs
      res.context = data.staticData.reduce((context, item) => {
        context[item.name] = item.value
        return context
      }, res.context)
      res.render('about', res.context)
    })
  }
}
