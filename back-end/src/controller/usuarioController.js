const express = require("express")
const { json } = require("body-parser")
const router = express.Router()
router.use(json())
const passport = require("passport")
const usuarioSchema = require("../model/usuarioSchema.js")
const perguntaSchema = require("../model/perguntaSchema.js")
const chatSchema = require("../model/chatSchema.js")


router.get("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.params
    usuarioSchema.findOne({ _id: id }).lean()
        .then(data => {
            res.status(201).send(data)
        })
        .catch(err => {
            res.status(404).send({
                error: "Usuario não encontrado",
                message: err
            })
        })
})

router.get("/pergunta/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.params
    perguntaSchema.find({ "idUsuario.id": id }).lean()
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(404).send({
                error: "Erro ao achar as perguntas",
                message: err
            })
        })
})


router.post("/editar/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.params
    const { nome_completo, matricula, curso, celular, email, password } = req.body
    if(id != req.user._id) {
        return new Error({message: "Erro ao achar usuário"})
    }
    usuarioSchema.findOne({ _id: id })
        .then(data => {
            data.updateOne({ nome_completo: nome_completo, matricula: matricula, curso: curso, celular: celular, email: email, password: password })
                .then(() => {
                    res.status(201).send("Alterado com sucesso!")
                })
                .catch(err => {
                    res.status(401).send({
                        error: "Erro ao salvar as alterações!",
                        message: err
                    })
                })
        })
        .catch(err => {
            res.status(404).send({
                error: "Usuário não encontrado",
                message: err
            })
        })
})

router.get("/salvos/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.params
    usuarioSchema.findOne({ _id: id })
        .then(data => {
            res.status(201).json(data.salvos)
        })
        .catch(err => {
            res.status(404).send({
                error: "Falha ao encontrar usuário",
                message: err
            })
        })


})

router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    usuarioSchema.find().lean()
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(404).send({
                error: "Erro ao encontrar usuários",
                message: err
            })
        })
})

router.post("/chatInstance", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { user, userTarget, privado } = req.body

        //vetor necessário pleo updatemany
    const userIds = [user.id, userTarget.id]
    const users = {user, userTarget}
    const infosChat = {
        usuarios: userIds,
        privado: privado,
        idChat: ''
    }

    new chatSchema({ privado: privado, usuarios: users }).save()
        .then(data => {
            infosChat.idChat = data._id
            usuarioSchema.updateMany({ _id: { $in: userIds } }, { $push: { chats: infosChat } })
            .then(() => {
                res.status(200).send(data._id)
            })
            .catch(err => {
                res.status(400).send({
                    erro: "Falha ao salvar instância",
                    message: err
                })
            })
        })
        .catch(err => {
            res.status(400).send({
                error: "Erro ao fazer requisição",
                message: err
            })
        })

    })







module.exports = router