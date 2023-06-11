
const express = require('express');
const router = express.Router();
router.use(express.json());
const passport = require('passport');
const perguntaController = require('../controller/perguntaController');

router.post("/", passport.authenticate('jwt', { session: false }), perguntaController.criarPergunta)


module.exports = router;