const request = require("supertest");
const server = require("../index");
const { excluirUsuario } = require('../service/usuarioService');

let token;

beforeAll( async () => {
  //criação de usuário
  const response = await request(server)
    .post("/cadastro")
    .send({
        nome_completo: "Teste da Silva",
        curso: 1,
        matricula: 1234567,
        email: "usuario_teste@gmail.com",
        celular: "619999699",
        password: 123456,
    });
  
    expect(response).toHaveProperty('status', 200)
});

describe('Teste', () => {
  it('Deve fazer login em um usuário', async () => {
    const response = await request(server)
      .post('/login')
      .send({
        username: 'usuario_teste@gmail.com', 
        password: '123456' 
      })

    token = response.headers['set-cookie'][0].split('=')[1].split(';')[0];

    expect(response).toHaveProperty('status', 200)
  });
})

afterAll( async () => {
  //retira o usuário de teste do banco de dados
  await excluirUsuario('usuario_teste@gmail.com')
})

