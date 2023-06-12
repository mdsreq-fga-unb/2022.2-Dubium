
const express = require('express');
const router = express.Router();
router.use(express.json());
const passport = require('passport');
const avisoController = require('../controller/avisoController');


router.post("/criar", passport.authenticate('jwt', { session: false }), avisoController.criarAviso)
router.get("/", passport.authenticate('jwt', { session: false }), avisoController.buscarAvisos)
router.get("/:id", passport.authenticate('jwt', { session: false }), avisoController.buscarAvisoPorId)
router.put("/editar/:id", passport.authenticate('jwt', { session: false }), avisoController.editarAviso)
router.delete("/:id", passport.authenticate('jwt', { session: false }), avisoController.deletarAviso);
router.post("/salvar", passport.authenticate('jwt', { session: false }), avisoController.salvarAviso)
router.post("/salvos", passport.authenticate('jwt', { session: false }), avisoController.avisosSalvos)
router.post("/favoritar/:id", passport.authenticate('jwt', { session: false }), avisoController.favoritarAviso)

module.exports = router;