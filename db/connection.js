
////////////// DATABASE CONFIGURATION /////////////////////////////////
///////////////////////////////////////////////////////////////////////


//// require mongoose ////
var mongoose = require('mongoose')


//// establish connection to database ////
mongoose.connect('mongodb://localhost/ga-thesis-db');


//// console log database connection status ////
const db = mongoose.connection
db.on('error', err => {
  console.error(err),
  console.log("\n\tConnection to Database: Failed \n\t\t> Please confirm database status.\n")
})
db.once('open', () => console.log("\n\tConnection to DataBase: Successful\n"))





////////////// EXPORT MODULE //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

//// export this entire module ////
module.exports = mongoose
