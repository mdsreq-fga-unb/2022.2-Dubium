const express = require("express");
const router = express.Router();
router.use(express.json());
const usuarioSchema = require('../model/usuarioSchema.js');

router.get("/", (req, res) => {
  res.send("Rota cadastro funcionando");
});

router.post("/", (req, res) => {
  const { nome_completo, curso, matricula, email, celular, password } = req.body;
  usuarioSchema.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        res.status(400).send({
          error: "Email já cadastrado!",
          message: "O email fornecido já está cadastrado no sistema."
        });
      } else {
        new usuarioSchema({ nome_completo, curso, matricula, email, celular, password }).save()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(400).send({
              error: "Falha ao criar usuário!",
              message: err
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: "Erro no servidor!",
        message: err
      });
    });
});

module.exports = router;
