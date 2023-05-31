const express = require("express")
const app = express()
const PORT = 8080
const cookieParser = require("cookie-parser")
const http =  require('http').createServer(app)
const io = require("socket.io")(http, {cors: {origin: "http://localhost:5173"}})


//rotas
const cadastro = require("./controller/cadastroController.js")
const login = require("./controller/loginController.js")
const pergunta = require("./controller/perguntaController.js")
const resposta = require("./controller/respostaController.js")
const usuario = require("./controller/usuarioController.js")
const aviso = require("./controller/avisoController.js")
//require mongo
require("./config/MongoConfig.js")
//require cors
const cors = require("cors")
const corsPort = {
    credentials: true,
    origin: ["http://localhost:5173"],
}
app.use(cors(corsPort))
//cookie
app.use(cookieParser())

app.get("/", (req, res) => {
    res.status(200).cookie("teste", "sasasa", {httpOnly: true, secure: true, sameSite: "strict", path: '/'}).send("ok")
})

app.use("/pergunta", pergunta)
app.use("/cadastro", cadastro)
app.use("/login", login)
app.use("/resposta", resposta)
app.use("/usuario", usuario)
app.use("/aviso", aviso)

const _message = {
    user: {nome: "Arthur"},
    message: "deu bom bagarai",
    horario: new Date()
  }

io.on('connection', socket => {
    console.log('SOCKET CONECTADO:', socket.id)
    socket.on('new-user', room => {
        socket.join(room)
        // rooms[room].users[socket.id] = 'user'
    })
    
    socket.on('sendMessage', (data) => {
        socket.broadcast.emit('receivedMessage', data)
    })

    socket.on('disconnect', () => {
        console.log("Desconectado:", socket.id)
    })
})

const server = http.listen(PORT, () => {
    console.log(`O servidor está rodando em: http://localhost:${PORT}`)
})

module.exports = server;
