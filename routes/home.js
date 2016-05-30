module.exports = (app, db) => {
  return (req, res, next) => {
    res.render('home', res.context)
  }
}
