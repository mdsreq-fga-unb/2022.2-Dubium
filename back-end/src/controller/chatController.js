const express = require("express")
const router = express.Router()
router.use(express.json())
const jwt = require("jsonwebtoken")
const chatSchema = require('../model/chatSchema.js')
const passport = require("passport")

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











module.exports = router