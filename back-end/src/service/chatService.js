const chatSchema = require("../model/chatSchema.js")

const criarInstanciaChat = async (privado, users) => {
    try {
        return await new chatSchema({ privado: privado, usuarios: users }).save()
    } catch (error) {
        throw new Error(error.message)
    }
}



module.exports = {
    criarInstanciaChat
}