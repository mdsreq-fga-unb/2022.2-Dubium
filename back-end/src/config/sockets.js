const emitter = require('../auth/emitter.js');
const http = require('../server.js')
const io = require("socket.io")(http, {cors: {origin: "http://localhost:5173"}})
const chatService = require("../service/chatService.js")


const connectedUsers = {}; 

io.on('connection', socket => {
    console.log('SOCKET CONECTADO:', socket.id)
    socket.on('idUser', (idUser) => {
        socket.idUser = idUser
    })
    socket.on('joinInstance', room => {
        if(Array.isArray(room)){
            room.forEach(chat => {
                console.log(`O socket ${socket.idUser} conectou no chat ${chat.idChat}`)
                socket.join(chat.idChat)
            })
        }
    })

    socket.on('leaveInstance', room => {
        if(Array.isArray(room)){
            room.forEach(chat => {
                console.log(`O socket ${socket.idUser} saiu do chat ${chat.idChat}`)
                socket.leave(chat.idChat)
            })
        }
    })

    socket.on('sendMessage', (data) => {
        socket.to(data.idRoom).emit('receivedMessage', data)
        console.log('-----', )
        //pegar os participantes da sala pelo front, conferir se estão todos conectados, caso não, enviar notificação para quem não está conectado
        let socketsConectadosRoom = []
        let verify = false
        const connectedSockets = io.sockets.adapter.rooms.get(data.idRoom);
        for (const socketId of connectedSockets) {
            const socket = io.sockets.sockets.get(socketId);
            if (socket) {
              socketsConectadosRoom.push(socket.idUser)
            }
          }
        if(socketsConectadosRoom.includes(data.user.id)) {
            chatService.registrarNotificacao(data.idRoom, data.idTarget)
                .then(data => {console.log(data)})
        } else {
            console.log("Ele está no chat")
        }
        console.log(`Sockets conectados na sala: `, socketsConectadosRoom);
    })

    socket.on("limparNotificacao", (data) => {
        chatService.limparNotificacao(data.idChat, data.idUser)
    })

    socket.on("test", () => {
        console.log("teste")
    })

    // socket.on('registerUser', (data) => {
    //     connectedUsers[data.idRoom] = socket;
    //     console.log(`Usuário registrado: ${data.idRoom}`);
    // })

    // // Evento para enviar notificações para um usuário específico
    // socket.on('sendNotification', ({ data }) => {
    //     const userSocket = connectedUsers[data.idRoom];
    //     if (userSocket) {
    //         userSocket.emit('notification', data.message);
    //         console.log(`Notificação enviada para o usuário ${data.idRoom}: ${data.message}`);
    //     } else {
    //         console.log(`Usuário ${data.idRoom} não está conectado`);
    //     }
    // })
  

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
