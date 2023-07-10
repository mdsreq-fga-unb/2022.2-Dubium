const express = require("express")
const router = express.Router()
router.use(express.json())
const jwt = require("jsonwebtoken")
const { decrypt, encrypt } = require("../auth/crypto.js")
const { EventEmitter } = require("node:events")

//User
const Usuario = require("../model/usuarioSchema.js")
const passport = require("passport")

router.use(passport.initialize())

require("../auth/passport.js")


router.post("/", (req, res) => {
    const { username, password } = req.body
    Usuario.findOne({ email: username, password: password })
    .then(user => {
        if(!user){
            return res.status(401).send({
                success: false,
                message: "User not found"
            })
        }

        const playload = {
            username: username,
            id: user.id,
            nome: user.nome_completo,
            curso: user.curso,
            foto: user.foto
        }


        // const secretData = encrypt(JSON.stringify(playload))
        const token = jwt.sign({secret: playload}, "randomString", { expiresIn: "30m" })
        // const ivToken = jwt.sign({secret: secretData.iv}, "randomString", { expiresIn: "30m" })
        // emitter.emit("recieve", secretData.iv)
        // res.cookie('twj', ivToken, { httpOnly: false, secure: true })
        res.cookie('jwt', token, { httpOnly: false, secure: true })
        res.status(200).send({
          success: true,
          message: "Logged",
          token: token
        })
    })
    .catch(err => {
        res.send({
            error: "User not found",
            message: err
        })
    })
})




module.exports = router