const express = require('express');
const router = express.Router();
router.use(express.json());
const passport = require('passport');
const usuarioController = require("../controller/usuarioController")


router.get("/:id", passport.authenticate('jwt', { session: false }), usuarioController.buscarUsuario)
router.post("/editar/:id", passport.authenticate('jwt', { session: false }), usuarioController.editarUsuario)
router.get("/salvos/:id", passport.authenticate('jwt', { session: false }), usuarioController.conteudosSalvos)
router.get("/", passport.authenticate('jwt', { session: false }), usuarioController.obterUsuarios)
router.post("/salvarFoto", passport.authenticate('jwt', { session: false }), usuarioController.salvarFoto)

router.post("/chatInstance", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { user, userTarget, privado } = req.body
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




module.exports = router;