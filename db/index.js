const mongojs = require('mongojs')
const config = require('config')

module.exports = mongojs(`mongodb://localhost/${config.dbName}`, ['fixtures', 'staticdata', 'clubs'])
