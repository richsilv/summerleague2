module.exports = (app, db) => {
  return (req, res, next) => {
    res.context.fixtureName = req.params.name
    res.render('fixtures', res.context)
  }
}
