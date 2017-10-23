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


// Socket.io Connection
io.on('connection', (socket) => {
  console.log('\n\tUser Connected')
  socket.on('chat message', (msg) => io.emit('chat message', msg))

  socket.on('attacked health', (hp) => {
    io.emit('attacked health', hp)
    // console.log(hp)
  })

  socket.on('healed health', (hp) => {
    io.emit('healed health', hp)
    // console.log(hp)
  })


  socket.on('disconnect', () => console.log('\n\tUser Disconnected'))
})
