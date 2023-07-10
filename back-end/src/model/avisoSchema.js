const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AvisoSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    curso: {
        type: Number,
        required: true
    },
    materia: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    respostas: {
        type: Array
    },
    votos: {
        type: Number,
        default: 0
    },
    usuario: {
        type: Object,
        required: true
    },
    favoritadoPor: {
        type: Array,
    },
    data: {
        type: Date,
        required: false
    },
})


module.exports = mongoose.model("Avisos", AvisoSchema)