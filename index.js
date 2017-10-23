// Express
const express = require('express')
const app = express()

// Socket.io
const http = require('http')
const socketIO = require('socket.io')
const server = http.createServer(app)
const io = socketIO.listen(server)
server.listen(4000, () => {
    console.log("\n\tServer active. Listening on port 4000\n")
})

// Schema & Model
const Schema = require('./db/schema.js')
const Message = Schema.Message




// Socket.io Connection
io.on('connection', (socket) => {

  console.log('\n\tUser Connected')

  Message.find({}).then(response => {
    const messages = response.map(message => message.body)
    io.emit('initial messages', messages)
    console.log(Messages = `${messages}`)
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
    Message.create({body: msg})
  })



  socket.on('disconnect', () => console.log('\n\tUser Disconnected'))
})
