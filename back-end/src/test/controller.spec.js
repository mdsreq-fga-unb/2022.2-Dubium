const request = require('supertest');
const server = require('../index');

let globalToken;

beforeAll((done) => {
  request(server)
      .post('/cadastro')
      .send({
        nome_completo: 'Sabrina Mattos',
        curso: 1,
        matricula: 1234567,
        email: 'sabrina_mattos@gmail.com',
        celular: '619999699',
        password: 123456
      })
      .end((err, res) => {
        done()
      });

  request(server)
    .post('/login')
    .send({ username: 'sabrina_mattos@gmail.com', password: '123456' })
    .end((err, res) => {
      expect(err).toBeNull();
      expect(res).toHaveProperty('status', 200);
      expect(res).toHaveProperty('headers');
      expect(res.headers).toHaveProperty('set-cookie');
      const token = res.headers['set-cookie'][0].split('=')[1].split(';')[0];
      globalToken = token;
      done();
    });
}, 10000);

afterAll((done) => {
  // Feche o servidor após todos os testes
  server.close(done);
});

describe('Testes das Rotas', () => {
  it('Deve criar um novo usuário', async () => {
    const response = await request(server)
      .post('/cadastro')
      .send({
        nome_completo: 'Juan Souza',
        curso: 1,
        matricula: 1234567,
        email: 'juan_souza@gmail.com',
        celular: '619999699',
        password: 123456
      });

    expect(response).toHaveProperty('status', 200);
  });

  it('Deve criar uma pergunta', async () => {
    const response = await request(server)
      .post('/pergunta')
      .send({
        titulo: 'Rei e Rainha da Derivada',
        curso: 1,
        conteudo: 'É obrigatório participar do evento?',
        filtro: 'C1'
      })
      .set('Cookie', `jwt=${globalToken}`);

    expect(response).toHaveProperty('status', 201);
  });

  it('Deve criar um aviso', async () => {
    const response = await request(server)
      .post('/aviso/criar')
      .send({
        id_usuario: {
          username: 'sabrina_mattos@gmail.com',
          id: '6484d5f01035ba31b9d493d8',
          nome: 'Sabrina Mattos',
          curso: 1
        },
        tituloAviso: 'Monitoria de APC',
        corpoAviso: 'A monitoria será na S10',
        id_cursoAviso: 1,
        filtro: 'APC'
      })
      .set('Authorization', `Bearer ${globalToken}`);

    expect(response).toHaveProperty('status', 201);
  });

  it('Deve retornar um aviso existente', async () => {
    const response = await request(server)
      .get('/aviso/6484d6820f85baedbbd2a2ae')
      .set('Authorization', `Bearer ${globalToken}`);

    expect(response).toHaveProperty('status', 201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('Deve permitir a edição de um aviso pelo proprietário', async () => {
    const response = await request(server)
      .put('/aviso/editar/6484d6820f85baedbbd2a2ae')
      .send({
        titulo: 'Editando',
        conteudo: 'Editado',
        materia: 'MDS'
      })
      .set('Authorization', `Bearer ${globalToken}`);

    expect(response).toHaveProperty('status', 200);
  });
})