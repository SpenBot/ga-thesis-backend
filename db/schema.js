// Initializing Mongoose
const mongoose = require('mongoose')

// Connect to the database
mongoose.connect('mongodb://localhost/chat4')
const db = mongoose.connection
db.on('error', err => { console.log(err) })
db.once('open', () => { console.log('\n\tDatabase connection successful.\n') })

// Defining the schema
const Schema = mongoose.Schema

const Player1Schema = new Schema({
  name: { type: String, unique: false, required: true },
  time : { type : Date, default: Date.now }
})

const Player2Schema = new Schema({
  name: { type: String, unique: false, required: true },
  time : { type : Date, default: Date.now }
})

// Defining the models
const Player1 = mongoose.model('Player1', Player1Schema)
const Player2 = mongoose.model('Player2', Player2Schema)

// Exporting
module.exports = { mongoose, Player1, Player2 }
