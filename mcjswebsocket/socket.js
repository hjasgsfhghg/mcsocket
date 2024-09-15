const ws = require('nodejs-websocket')
const PORT = 3003

const server = ws.createServer(con => {
    data = {
        "body":{
            "origin":{
                "type":"player"
            },
            "commandLine":"agent creat",
            "version":1
        },
        "header":{
            "requestId":"00000000-0000-0000-0000-000000000000",
            "messagePurpose": "commandRequest",
            "version": 1,
            "messageType": "commandRequest"
        }
    }
    con.send(JSON.stringify(data))
    console.log('由用户连接')
    con.on('error' ,data => {
        console.log('有用户连接异常')
    })
    con.on('close',data => {
        console.log('由用户连接关闭')
    })
    con.on('connection',data =>{
        console.log('有用户连接')
    })
    con.on('text',data => {
        con.send('ces')
    })
    
})

server.listen(PORT,()=>{
    console.log('监听'+PORT)
})