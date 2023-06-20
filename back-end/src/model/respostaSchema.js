const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RespostaSchema = new Schema({
    Usuario: {
        type: Object,
        required: true
    },
    idPergunta: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    respostas: {
        type: Array,
    },
    votos: {
        type: Number,
        default: 0
    },
    favoritadoPor: {
        type: Array,
    },
    data: {
        type: Date,
        required: false
    },
})

module.exports = mongoose.model("Resposta", RespostaSchema)