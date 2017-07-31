const mongoose = require('mongoose')
const RaceSchema = require('../schemas/race')

const Race = mongoose.model('Race', RaceSchema)

module.exports = Race