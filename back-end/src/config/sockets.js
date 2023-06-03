const http = require('../server.js')
const io = require("socket.io")(http, {cors: {origin: "http://localhost:5173"}})

io.on('connection', socket => {
    console.log('SOCKET CONECTADO:', socket.id)
    socket.on('joinInstance', room => {
        if(Array.isArray(room)){
            room.forEach(chat => {
                console.log(`O socket ${socket.id} conectou no chat ${chat.idChat}`)
                socket.join(chat.idChat)
            })
        }
    })
    socket.on('sendMessage', (data) => {
        socket.to(data.idRoom).emit('receivedMessage', data)
    })

    socket.on('disconnect', () => {
        console.log("Desconectado:", socket.id)
    })
})

module.exports = io;
