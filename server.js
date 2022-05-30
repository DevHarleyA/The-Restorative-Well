const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const configDB = require('./config/config.js')

MongoClient.connect(configDB.connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('gratitude-list')
    const gratsCollection = db.collection('gratitudes')

    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    app.get('/', (req, res) => {
      gratsCollection.find().toArray()
        .then(results => {
          res.render('index.ejs', { gratitudes: results })
        })
        .catch(err => console.error(err))
    })
    // /gratitudes is /quotes in the tutorial
    app.post('/gratitudes', (req, res) => {
      gratsCollection.insertOne({ alias: req.body.alias, gratitude: req.body.gratitude, country: req.body.country, peace: 0, report: 0 }, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
      })
    })

    app.put('/gratitudes', (req, res) => {
      // update request
      gratsCollection.findOneAndUpdate({ gratitude: req.body.gratitude }, {
        $set: { // changes this part of the object
          peace: req.body.peace + 1
        }
      }, {
        sort: { _id: -1 },
        upsert: false
        // creates something for you
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.put('/gratitudesReport', (req, res) => {
      // update request
      gratsCollection.findOneAndUpdate({ gratitude: req.body.gratitude }, {
        $set: {
          report: req.body.report - 1
        }
      }, {
        sort: { _id: -1 },
        upsert: false
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.listen(2800, function () {
      console.log('listening on 2800')
    })
  })
  .catch(console.error)