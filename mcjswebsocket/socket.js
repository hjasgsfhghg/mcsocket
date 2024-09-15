const WebSocket = require('ws')
const uuid = require('uuid')

// Create a new websocket server on port 3000
console.log('Ready. On MineCraft chat, type /connect localhost:3000')
const wss = new WebSocket.Server({ port: 3003 })

wss.on('connection', socket => {
  console.log('Connected')

  // Tell Minecraft to send all chat messages. Required once after Minecraft starts
  socket.send(JSON.stringify({
    "header": {
      "version": 1,                   
      "requestId": uuid.v4(),          
      "messageType": "commandRequest",  
      "messagePurpose": "subscribe"     
    },
    "body": {
      "eventName": "PlayerMessage"     
    },
  }))

  // When MineCraft sends a message (e.g. on player chat), print it.
  socket.on('message', packet => {
    const msg = JSON.parse(packet)
    console.log(msg)
  })
})
