const moment = require('moment')

module.exports = {
  populateContext: (app, db) => {
    app.use((req, res, next) => {
      db.fixtures.find((err, docs) => {
        if (err) {
          return res.render('error', {
            message: 'Database error',
            error: err
          })
        }
        res.context = {
          fixtures: docs,
          formattedDate: (date) => {
            if (date instanceof Date) return moment(date).format('h:mm a, D MMM YY')
            else return 'TBC'
          }
        }
        next()
      })
    })
  }
}
