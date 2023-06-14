const emitter = require('../auth/emitter.js');
const http = require('../server.js')
const io = require("socket.io")(http, {cors: {origin: "http://localhost:5173"}})
const chatService = require("../service/chatService.js")


const connectedUsers = {}; 

io.on('connection', socket => {
    console.log('SOCKET CONECTADO:', socket.id)
    socket.on('idUser', (idUser) => {
        socket.idUser = idUser
        console.log("O socket", socket.id, "recebeu o novo id: ", socket.idUser)
    })

    let rooms = []
    socket.on('joinInstance', room => {
        rooms = room
        if(Array.isArray(room)){
            room.forEach(chat => {
                console.log(`O socket ${socket.idUser} conectou no chat ${chat.idChat}`)
                socket.join(chat.idChat)
            })
        }
    })
    socket.on('leaveInstance', () => {
        if(Array.isArray(rooms)){
            rooms.forEach(chat => {
                console.log(`O socket ${socket.idUser} saiu do chat ${chat.idChat}`)
                socket.leave(chat.idChat)
            })
        }
    })

    function findSocketIdByUserId(userId) {
        const sockets = io.sockets.sockets.values();
        for (const socket of sockets) {
          if (socket.idUser === userId) {
            return socket.id;
          }
        }
        return null; // Retornar null se o socket do usuário não for encontrado
      }

    socket.on('sendMessage', (data) => {
        socket.to(data.idRoom).emit('receivedMessage', data)
        if(data.privado){
            let socketsConectadosRoom = []
            const connectedSockets = io.sockets.adapter.rooms.get(data.idRoom);
            for (const socketId of connectedSockets) {
                const socket = io.sockets.sockets.get(socketId);
                if (socket) {
                socketsConectadosRoom.push(socket.idUser)
                }
            }
            if(socketsConectadosRoom.includes(data.idTarget)) {
                console.log("Ele está no chat")
            } else {
                console.log("enviar notificacao")
                const socketId = findSocketIdByUserId(data.idTarget);
                if(socketId){
                    socket.to(socketId).emit("incrementarNotificacao", socketId)
                }
                chatService.registrarNotificacao(data.idRoom, data.idTarget)

            }
        }
    })

    socket.on("limparNotificacao", (data) => {
        chatService.limparNotificacao(data.idChat, data.idUser)
    })

    socket.on("test", () => {
        console.log("teste")
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
