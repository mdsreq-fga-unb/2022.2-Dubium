const { json } = require("body-parser")
const express = require("express")
const router = express.Router()
const passport = require("passport")
router.use(json())
const avisoSchema = require("../model/avisoSchema.js")
const perguntaSchema = require("../model/perguntaSchema.js")
const usuarioSchema = require("../model/usuarioSchema.js")

router.post("/criar", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id_usuario, tituloAviso, corpoAviso, id_cursoAviso, filtro } = req.body
    new avisoSchema({ titulo: tituloAviso, usuario: id_usuario, conteudo: corpoAviso, materia: filtro, curso: id_cursoAviso }).save()
        .then(() => {
            res.status(201).send("Aviso criado com sucesso!")
        })
        .catch(err => {
            res.status(400).send({
                error: "Erro ao criar aviso!",
                message: err
            })
        })


})

router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    avisoSchema.find().lean()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(404).send({
                error: "Avisos não encotrados",
                message: err
            })
        })
})

router.get("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.params
    avisoSchema.findOne({ _id: id })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(404).send({
                error: "Aviso não encontrado",
                message: err
            })
        })
})


router.put("/editar/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.params;
    const { conteudo } = req.body;

    avisoSchema.findOne({ _id: id })
        .then(aviso => {
            if (!aviso) {
                return res.status(404).send({
                    error: "Aviso não encontrado"
                });
            }

            if (aviso.usuario.id != req.user._id) {
                return res.status(403).send({
                    error: "Você não tem permissão para editar esse aviso."
                });
            }

            aviso.conteudo = conteudo;

            aviso.save()
                .then(updatedAviso => {
                    res.status(200).json(updatedAviso);
                })
                .catch(err => {
                    res.status(500).send({
                        error: "Erro ao atualizar aviso",
                        message: err.message
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                error: "Erro ao buscar aviso",
                message: err.message
            });
        });
});


router.delete("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.params
    avisoSchema.findOne({ _id: id })
        .then(data => {
            if(data.usuario.id == req.user._id){
                data.deleteOne()
                    .then(() => res.status(201).send("Deletado com sucesso"))
                    .catch(err => res.status(400).send({error: "Falha ao deletar aviso", message: err}))
            } else{
                return new Error({message: "Usuário inválido"})
            }
        })
        .catch(err => {
            res.status(404).send({
                error: "Aviso não encontrado",
                message: err
            })
        })
})

router.post("/salvar", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id_usuario, id_aviso, salvo } = req.body
    usuarioSchema.findOne({ _id: id_usuario })
        .then(data => {
            if(salvo){
                data.updateOne({ $push: { "salvos.avisos": id_aviso }})
                    .then(() => {
                        res.status(201).send("Salvo com sucesso!")
                    })
                    .catch(err => {
                        res.status(400).send({
                            error: "Erro ao salvar aviso!",
                            message: err
                        })
                    })
            } else {
                data.updateOne({ $pull: { "salvos.avisos": id_aviso } })
                    .then(() => {
                        res.status(201).send("Removido dos salvos")
                    })
                    .catch(err => {
                        res.status(400).send({
                            error: "Falha ao alterar aviso",
                            message: err
                        })
                    })
            }
        })
        .catch(err => {
            res.status(404).send({
                error: "Erro ao procurar usuário!",
                message: err
            })
        })
})

router.post("/salvos", passport.authenticate('jwt', { session: false }), (req, res) => {
    const { arrayAvisos } = req.body
    avisoSchema.find({ _id: { $in: arrayAvisos } })
        .then((data) => {
            res.status(201).send(data)
        })
        .catch(err => {
            res.status(404).send({
                error: "Nao foi possível achar",
                message: err
            })
        })
})

router.post("/favoritar/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    // const { id } = req.params
    const { idUsuario, idAviso, favorito } = req.body
    avisoSchema.findOne({ _id: idAviso })
        .then(data => {
            if(favorito){
                data.updateOne({ $inc: { votos: +1 }, $push: { "favoritadoPor": idUsuario } })
                    .then(() => {
                        res.status(201).send("Atualizado com sucesso!")
                    })
                    .catch(err => {
                        res.send({
                            error: "Erro ao atualizar favoritos",
                            message: err
                        })
                    })
            } else {
                data.updateOne({ $inc: { votos: -1 }, $pull: { "favoritadoPor": idUsuario } })
                    .then(() => {
                        res.status(201).send("Atualizado com sucesso!")
                    })
                    .catch(err => {
                        res.send({
                            error: "Erro ao atualizar favoritos",
                            message: err
                        })
                    })
            }
        })
        .catch(err => {
            res.status(404).send({
                error: "Falha ao procurar resposta",
                message: err
            })
        })
})


module.exports = router