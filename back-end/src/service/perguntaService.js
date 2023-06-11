const avisoSchema = require("../model/avisoSchema.js")
const perguntaSchema = require("../model/perguntaSchema.js")
const usuarioSchema = require("../model/usuarioSchema.js")
const usuarioService = require("../service/usuarioService.js")

const criarPergunta = async (titulo, curso, conteudo, filtro, idUsuario) => {
    const pergunta = new perguntaSchema({ titulo: titulo, curso: curso, conteudo: conteudo, filtro: filtro, idUsuario: idUsuario, data: Date.now() })
    return await pergunta.save()
}



// router.get("/view", (req, res) => {
//     perguntaSchema.find().lean().sort({data: -1})
//         .then(data => {
//             res.status(200).json(data)
//         })
//         .catch(err => {
//             res.status(404).send(err)
//         })
// })

// router.get("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
//     perguntaSchema.findOne({ _id: req.params.id }).lean()
//         .then(data => {
//             res.status(201).send(data)
//         })
//         .catch(err => {
//             res.status(404).send({
//                 error: "Erro ao procurar perguntar",
//                 message: err
//             })
//         })
// })

// router.delete("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
//     const { id } = req.params
//     perguntaSchema.findOne({ _id: id })
//         .then((pergunta) => {
//             if(pergunta.idUsuario.id == req.user._id){
//                 pergunta.deleteOne()
//                     .then(() => {
//                         res.status(201).send({
//                         message: "Pergunta deletada com sucesso!"
//                         });
//                     })
//                     .catch(err => {
//                         res.status(500).send({
//                         error: "Falha ao deletar pergunta",
//                         message: err
//                         });
//                     });          
//             }
//         })
//         .catch(err => {
//             res.status(404).send({
//                 error: "Falha ao procurar pergunta",
//                 message: err
//             })
//         })
// })

// router.post("/favoritar/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
//     const { id } = req.params
//     const { idUsuario, idPergunta, favorito } = req.body
//     perguntaSchema.findOne({ _id: id })
//         .then(data => {
//             if(favorito){
//                 data.updateOne({ $inc: { favoritado: +1 }, $push: { "favoritadoPor": idUsuario } })
//                     .then(() => {
//                         res.status(201).send("Atualizado com sucesso!")
//                     })
//                     .catch(err => {
//                         res.send({
//                             error: "Erro ao atualizar favoritos",
//                             message: err
//                         })
//                     })
//             } else {
//                 data.updateOne({ $inc: { favoritado: -1 }, $pull: { "favoritadoPor": idUsuario } })
//                     .then(() => {
//                         res.status(201).send("Atualizado com sucesso!")
//                     })
//                     .catch(err => {
//                         res.send({
//                             error: "Erro ao atualizar favoritos",
//                             message: err
//                         })
//                     })
//             }
//         })
//         .catch(err => {
//             res.status(404).send({
//                 error: "Falha ao procurar pergunta",
//                 message: err
//             })
//         })
// })

// router.post("/salvar", passport.authenticate('jwt', { session: false }), (req, res) => {
//     const { id_usuario, id_pergunta, salvo } = req.body
//     usuarioSchema.findOne({ _id: id_usuario })
//         .then(data => {
//             if(salvo){
//                 data.updateOne({ $push: { "salvos.perguntas": id_pergunta }})
//                     .then(() => {
//                         res.status(201).send("Salvo com sucesso!")
//                     })
//                     .catch(err => {
//                         res.status(400).send({
//                             error: "Erro ao salvar pergunta!",
//                             message: err
//                         })
//                     })
//             } else {
//                 data.updateOne({ $pull: { "salvos.perguntas": id_pergunta } })
//                     .then(() => {
//                         res.status(201).send("Removido dos salvos")
//                     })
//                     .catch(err => {
//                         res.status(400).send({
//                             error: "Falha ao alterar a pergunta",
//                             message: err
//                         })
//                     })
//             }
//         })
//         .catch(err => {
//             res.status(404).send({
//                 error: "Erro ao procurar usuário!",
//                 message: err
//             })
//         })
// })


// router.post("/salvos", passport.authenticate('jwt', { session: false }), (req, res) => {
//     const { arrayPerguntas } = req.body
//     perguntaSchema.find({ _id: { $in: arrayPerguntas } })
//         .then((data) => {
//             res.status(201).send(data)
//         })
//         .catch(err => {
//             res.status(404).send({
//                 error: "Nao foi possível achar",
//                 message: err
//             })
//         })
// })


module.exports = {
    criarPergunta,

}