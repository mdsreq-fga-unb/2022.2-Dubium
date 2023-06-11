const avisoSchema = require("../model/avisoSchema.js")
const perguntaSchema = require("../model/perguntaSchema.js")
const usuarioSchema = require("../model/usuarioSchema.js")


const buscarUsuario = async (id) => {
    try {
        return await usuarioSchema.findOne({ _id: id })
    }
    catch (error) {
        return new Error("Falha ao encontrar usuário!")
    }
}






module.exports = {
    buscarUsuario
}