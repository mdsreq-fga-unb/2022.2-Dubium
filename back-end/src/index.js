//configs server
const http = require('./server.js')

//socket
require("./config/sockets.js")


const PORT = 8080

const server = http.listen(PORT, () => {
    console.log(`O servidor está rodando em: http://localhost:${PORT}`)
})

module.exports = server;
