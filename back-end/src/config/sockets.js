const http = require('../server.js')
const io = require("socket.io")(http, {cors: {origin: "https://dubium-frontend.vercel.app/"}})

const connectedUsers = {}; 

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
        console.log('-----', data)
    })
    socket.on('registerUser', (data) => {
        connectedUsers[data.idRoom] = socket;
        console.log(`Usuário registrado: ${data.idRoom}`);
    })

    // Evento para enviar notificações para um usuário específico
    socket.on('sendNotification', ({ data }) => {
        const userSocket = connectedUsers[data.idRoom];
        if (userSocket) {
            userSocket.emit('notification', data.message);
            console.log(`Notificação enviada para o usuário ${data.idRoom}: ${data.message}`);
        } else {
            console.log(`Usuário ${data.idRoom} não está conectado`);
        }
    })
  

    socket.on('digitando', (data) => {
        socket.to(data.idRoom).emit('targetDig', data)
    })

    socket.on('naoDigitando', (data) => {
        socket.to(data).emit('targetNaoDig', data)
    })

    socket.on('disconnect', () => {
        console.log("Desconectado:", socket.id)
    })
})

module.exports = io;
