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
const User = Schema.User








// Socket.io Connection
io.on('connection', (socket) => {
  console.log('\n\tUser Connected')

  socket.on('chat message', (msg) => io.emit('chat message', msg))



  User.find({}).limit(20).then(response => {
    const users = response.map(user => user.name)
    io.emit('initial users', user)
  })


  socket.on('new user', (user) => {
    io.emit('new user', user)
    User.create({name: user})
  })




  socket.on('attacked health', (hp) => {
    io.emit('attacked health', hp)
  })

  socket.on('healed health', (hp) => {
    io.emit('healed health', hp)
  })



  socket.on('disconnect', () => console.log('\n\tUser Disconnected'))
})
