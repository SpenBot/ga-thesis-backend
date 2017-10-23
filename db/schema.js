// Initializing Mongoose
const mongoose = require('mongoose')

// Connect to the database
mongoose.connect('mongodb://localhost/chat3')
const db = mongoose.connection
db.on('error', err => { console.log(err) })
db.once('open', () => { console.log('\n\tDatabase connection successful.\n') })

// Defining the schema
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: { type: String, unique: false, required: true },
  time : { type : Date, default: Date.now }
})

// Defining the models
const User = mongoose.model('User', UserSchema)

// Exporting
module.exports = { mongoose, User }
