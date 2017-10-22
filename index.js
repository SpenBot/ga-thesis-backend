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
  console.log('user connected')
  socket.on('chat message', (msg) => io.emit('chat message', msg))
  socket.on('disconnect', () => console.log('user disconnected'))
})
