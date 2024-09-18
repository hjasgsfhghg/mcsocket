const WebSocket = require('ws')
const uuid = require('uuid')


const ws = new WebSocket.Server({ port: 3003 })
console.log('启动')
ws.on('connection', socket => {
  console.log('Connected')



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

  socket.send(JSON.stringify({
    "header": {
      "version": 1,
      "requestId": uuid.v4(),
      "messageType": "commandRequest",
      "messagePurpose": "subscribe"
    },
    "body": {
      "eventName": "ScreenHeartBeat"
    },
  }))

  socket.on('message', data => {
    console.log(data.toString())
    const msg = JSON.parse(data.toString())

    console.log(msg.header.eventName)
    if (msg.header.eventName == 'PlayerMessage') {

      ws.clients.forEach(man => {

        if (man.id == 'bot') {
          console.log('有')
          man.send(JSON.stringify(msg))
        }
      })
    } else if (msg.header.eventName == 'botid') {
      socket.id = 'bot'
    }
  })

  socket.on('update', packet => {
    const msg = JSON.parse(packet)
    console.log(msg)
  })
})
