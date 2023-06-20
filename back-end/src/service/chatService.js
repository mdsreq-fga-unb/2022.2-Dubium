const chatSchema = require("../model/chatSchema.js")

const criarInstanciaChat = async (privado, users) => {
    try {
        return await new chatSchema({ privado: privado, usuarios: users }).save()
    } catch (error) {
        throw new Error(error.message)
    }
}

const registrarNotificacao = async (idChat, idUser) => {
    try {
        chatSchema.findOne({ _id: idChat })
        .then(data => {
            if(idUser == data.usuarios[0].user.id){
                data.updateOne({ $inc: { "usuarios.0.user.notificacoes": 1 } })
                    .then(() => console.log("Foi")).catch(error => {new Error(error)})
            } else {
                data.updateOne({ $inc: { "usuarios.0.userTarget.notificacoes": 1 } })
                    .then(() => console.log("Foi")).catch(error => {new Error(error)})
            }
        })
        .catch(error => {new Error(error)})
    } catch (error) {
        throw new Error(error.message)
    }
}

const limparNotificacao = async (idChat, idUser) => {
    try {
        chatSchema.findOne({ _id: idChat })
        .then(data => {
            if(idUser == data.usuarios[0].user.id){
                data.updateOne({ "usuarios.0.user.notificacoes": 0 })
                    .then(() => console.log("limpou")).catch(error => {new Error(error)})
            } else {
                data.updateOne({ "usuarios.0.userTarget.notificacoes": 0 })
                    .then(() => console.log("limpou")).catch(error => {new Error(error)})
            }
        })
        .catch(error => {new Error(error)})
    } catch (error) {
        throw new Error(error.message)
    }
}



module.exports = {
    criarInstanciaChat,
    registrarNotificacao,
    limparNotificacao
}