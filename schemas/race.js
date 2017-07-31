const { Schema } = require('mongoose')

const Race = new Schema ({
    race: {
        micro: String,
        mini: String,
        haft: String,
        full: String,
        other: String
    } ,
    checkpoint: [String]
})

module.exports = Race