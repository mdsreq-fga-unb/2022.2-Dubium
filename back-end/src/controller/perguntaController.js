const { json } = require("body-parser")
const avisoSchema = require("../model/avisoSchema.js")
const perguntaSchema = require("../model/perguntaSchema.js")
const usuarioSchema = require("../model/usuarioSchema.js")
const perguntaService = require("../service/perguntaService.js")
const jwt = require('jsonwebtoken')


const criarPergunta = (req, res) => {
    const { titulo, curso, conteudo, filtro } = req.body
    const idUsuario = jwt.decode(req.cookies.jwt, {complete: true}).payload
    perguntaService.criarPergunta(titulo, curso, conteudo, filtro, idUsuario)
        .then(data => {
            res.status(201).send(data)
        })
        .catch(err => {
            res.status(404).send({
                error: "Erro ao criar pergunta",
                message: err
            })
        })
}





module.exports = {
    criarPergunta,

}