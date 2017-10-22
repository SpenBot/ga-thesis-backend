
////////////// SERVER CONFIGURATION /////////////////////////////////
/////////////////////////////////////////////////////////////////////

/// require external module dependencies ///
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

/// require database connection module ///
const mongoose = require('./db/connection.js')

/// run app as an express app,  ///
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http);


// const client = require('socket.io').listen(3000).sockets





////////////// RUN SERVER ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

http.listen(4000, () => {
  console.log("\n\tServer running. Listening on port 4000\n")
})






////////////// ROUTES ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.send('<h1>Hey, fuck you buddy!</h1>')
})







////////////// EMMITER //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// connect to socket.io //
io.on('connection', (socket) => {

  console.log('\n\tUser Connected\n');

  let chat = db.collection('chats')

// emit the status //
  sendStatus = (s) => {
    socket.emit('status', s)
  }

// get chats from mongo collection, and emit message //
  chat.find().limit(100).sort( {_id: 1} ).toArray( (err, res) => {
    if (err) {
      console.error(err)
    }
    socket.emit('output', res)
  })

  // handle input events
  socket.on('input', function(data) {
    let name = data.name
    let message = data.message

    // check for name and messgae
    if(name == '' || message == '') {
      // sned error status
      sendStatus('Please enter a name and message')
    } else {
      chat.insert( {name: name, message: message}, () => {
        io.emit('output', [data])

        // send status object
        sendStatus({
          message: 'Message sent',
        })
      })
    }
  })
})




// io.on('connection', (socket) => {
//
//   console.log('\n\tUser Connected\n');
//
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
//
//   socket.on('disconnect', () => {
//     console.log('\n\tUser Disconnected\n');
//   });
//
// });
