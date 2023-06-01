const test = require('node:test');
const assert = require('node:assert')
const axios = require('axios')

const apiRequest = axios.create({
  baseURL: "http://localhost:8080",
});

test.describe("API Workflow", () => {
    let _server = {} 
    let _globalToken = ''
    test.before(async () => {
        _server = (await require('../index.js'))
        await new Promise(resolve => _server.once('listening', resolve))
    })

    test.after(done => _server.close(done))

    test.it('deve ter sucesso no login quando user e pass. certos', async () => {
        let data = {
            username: "yasmim@gmail.com",
            password: '123456'
        }
    
        let request = await apiRequest.post("/login", data)
        assert.strictEqual(request.status, 200)
        let token = request.headers['set-cookie'][0]
        assert.ok(token, 'token foi criado')
        _globalToken = token
    })

    test.it('deve ter sucesso ao criar um usuário', async () =>{
        let data = { 
            nome_completo: "Yasmim Oliveira", 
            curso: 1,
            matricula: 1234567, 
            email: "yasmim@gmail.com", 
            celular: "619999999", 
            password: 123456 }

        let request = await apiRequest.post('/cadastro', data)
        assert.strictEqual(request.status, 200)
    })
    
    test.it('deve ')
    
})