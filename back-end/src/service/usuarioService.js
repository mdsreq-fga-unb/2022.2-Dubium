const avisoSchema = require("../model/avisoSchema.js")
const perguntaSchema = require("../model/perguntaSchema.js")
const usuarioSchema = require("../model/usuarioSchema.js")


const buscarUsuario = async (id) => {
    try {
        return await usuarioSchema.findOne({ _id: id })
    }
    catch (error) {
        return new Error("Falha ao encontrar usuário!")
    }
}

const editarUsuario = async (id, reqUserId, nome_completo, matricula, curso, celular, email, password) => {
    try {
        if(id != reqUserId) {
            return new Error({message: "Erro ao achar usuário"})
        }
        return await usuarioSchema.findByIdAndUpdate( { _id: id }, {
            nome_completo: nome_completo, matricula: matricula, curso: curso, celular: celular, email: email, password: password
        } )
    } catch (error) {
        throw new Error(error.message)
    }
}


const conteudosSalvos = async (id) => {
    try {
        return await usuarioSchema.findOne({ _id: id })
    } catch (error) {
        throw new Error(error.message)
    }
}

const obterUsuarios = async () => {
    try {
        return await usuarioSchema.find().lean()
    } catch (error) {
        throw new Error(error.message)
    }
}


// router.post("/chatInstance", passport.authenticate('jwt', { session: false }), (req, res) => {
//     const { user, userTarget, privado } = req.body
//     const userIds = [user.id, userTarget.id]
//     const users = {user, userTarget}
//     const infosChat = {
//         usuarios: userIds,
//         privado: privado,
//         idChat: ''
//     }

//     new chatSchema({ privado: privado, usuarios: users }).save()
//         .then(data => {
//             infosChat.idChat = data._id
//             usuarioSchema.updateMany({ _id: { $in: userIds } }, { $push: { chats: infosChat } })
//             .then(() => {
//                 res.status(200).send(data._id)
//             })
//             .catch(err => {
//                 res.status(400).send({
//                     erro: "Falha ao salvar instância",
//                     message: err
//                 })
//             })
//         })
//         .catch(err => {
//             res.status(400).send({
//                 error: "Erro ao fazer requisição",
//                 message: err
//             })
//         })

//     })
    

const salvarFoto = async (id, url) => {
    try {
        buscarUsuario(id)
            .then(user => {
                return user.updateOne({ foto: url })
            })
            .catch(error => new Error(error))
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    buscarUsuario,
    editarUsuario,
    conteudosSalvos,
    obterUsuarios,
    salvarFoto
}