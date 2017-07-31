const express = require('express')
const app = express()

//// CONECTION MONGOD
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', {
    useMongoClient: true
})
mongoose.Promise = global.Promise
const { Race } = require('./models')

app.get('/hook', (req, res) => {
    const { micro, mini, full, checkPointName } = req.query
    const data = {
        checkpoint: checkPointName,
        race: {
            micro: micro,
            mini: mini,
            full: full
        }
    }

    Race.create(data).then(race => {
        console.log(race)
        res.send(race)
    }).catch(err => {
        res.end(err)
    })
})

app.get('/race', (req, res) => {
    Race.find().exec().then(race => {
        res.send(race)
    })
})

app.delete('/race/:id', (req, res) => {
    Race.deleteOne({_id: req.params.id}).exec().then(race => {
        res.send(race)
    })
})

app.put('/race/:id', (req, res) => {
    const { checkPointName } = req.query 
    Race.findOneAndUpdate({_id: req.params.id}, {$set: {checkpoint: checkPointName}}, {new: true}).exec().then(race => {
        res.send(race)
    })
})

const port = 3000
app.listen(port, function() {
    console.log(`Server listening on port ${port}`)
})