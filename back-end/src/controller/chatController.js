const express = require("express")
const router = express.Router()
router.use(express.json())
const jwt = require("jsonwebtoken")
const chatSchema = require('../model/chatSchema.js')
const passport = require("passport")
const usuarioSchema = require("../model/usuarioSchema.js")

router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { chats } = req.body
    const idChats = chats.map(chat => chat.idChat)
    chatSchema.find({ _id: { $in: idChats } }).lean()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(400).send({
                error: "Erro ao fazer requisição",
                message: err
            })
        })
})

router.get("/:idChat", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { idChat } = req.params
    chatSchema.findOne({ _id: idChat })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send({
                error: "Erro ao fazer requisição",
                message: err
            })
        })
})

router.post("/messages", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { messages, idChat } = req.body
    chatSchema.findOneAndUpdate(
        { _id: idChat },
        { $push: { mensagens: { $each: messages } } },
      )
        .then(updatedChat => {
          res.status(200).send("Mensagens salvas com sucesso")
        })
        .catch(error => {
            res.status(400).send({
                error: "Erro ao fazer requisição",
                message: error
            })
        });
})

router.post("/chatPublico", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { privado, nome, tema, userAdmin, foto } = req.body
    new chatSchema({ privado: privado, nome: nome, tema: tema, usuarios: [userAdmin], foto: foto }).save()
        .then(data => {
            usuarioSchema.findOne({ _id: userAdmin.id })
                .then(user => {
                    user.updateOne({ $push: { chats: { idChat: data._id, privado: false } } })
                        .then(response => {
                            res.status(200).send("Instância pública criada com sucesso!")
                        })
                        .catch(err => res.status(400).send({error: "Erro ao salvar instância no usuario", message: err}))
                })
                .catch(err => {
                    res.status(400).send({error: "Erro ao salvar instância no usuário", message: err})})
        })
        .catch(err => {
            res.status(400).send({
                error: "Erro ao criar instância de chat",
                message: err
            })
        })

})

router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    chatSchema.find({ privado: false }).lean()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => res.status(400).send({error: "Erro ao encontrar chats", message: err}))
})


router.post("/joinUser", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { idChat, idUsuario } = req.body
    usuarioSchema.findOneAndUpdate({ _id: idUsuario }, { $push: { chats: {idChat: idChat, privado: false} } })
        .then(response => {
            chatSchema.findOneAndUpdate({ _id: idChat }, { $push: { usuarios: { id: idUsuario, nome: response.nome_completo } } })
                .then(response => {
                    res.status(200).send("Usuario adicionado ao chat com sucesso!")
                })
                .catch(err => res.status(400).send({error: "Erro ao registrar usuario no chat", message: err}))
        })
        .catch(err => res.status(400).send({error: "Erro ao registrar usuário no chat", message: err}))
})








module.exports = router