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
router.post("/chatInstance", passport.authenticate('jwt', { session: false }), usuarioController.instanciarChatUsuario)



module.exports = router;