const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PerguntaSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    curso: {
        type: Number,
        required: true
    },
    filtro: {
        type: String
    },
    midia: {
        type: String
    },
    votos: {
        type: Number,
        default: 0
    },
    idUsuario: {
        type: Object,
        required: true
    },
    respostas: {
        type: Array
    },
    data: {
        type: Date,
        required: false
    },
    favoritado: {
        type: Number,
        default: 0
    },
    favoritadoPor: {
        type: Array
    }
})

module.exports = mongoose.model("Pergunta", PerguntaSchema)