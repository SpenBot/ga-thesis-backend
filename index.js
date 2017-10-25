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
// const Schema = require('./db/schema.js')
// const Player1 = Schema.Player1
// const Player2 = Schema.Player2








// Socket.io Connection
io.on('connection', (socket) => {
  console.log('\n\tUser Connected')

  socket.on('chat message', (msg) => io.emit('chat message', msg))



// listening for Player Log-In //
  socket.on('new player1', (player1) => {
    io.emit('new player1', player1)
    // Player1.create({name: player1})
  })

  socket.on('new player2', (player2) => {
    io.emit('new player2', player2)
    // Player2.create({name: player2})
  })


  socket.on('new Turn', (newTurn) => {
    io.emit(`new Turn`, newTurn)
  })

  socket.on('new P1 HP', (newP1Health) => {
    io.emit(`new P1 HP`, newP1Health)
  })

  socket.on('new P2 HP', (newP2Health) => {
    io.emit(`new P2 HP`, newP2Health)
  })


  // socket.on('attacked health', (hp) => {
  //   io.emit('attacked health', hp)
  // })
  //
  // socket.on('healed health', (hp) => {
  //   io.emit('healed health', hp)
  // })



  socket.on('disconnect', () => console.log('\n\tUser Disconnected'))
})
