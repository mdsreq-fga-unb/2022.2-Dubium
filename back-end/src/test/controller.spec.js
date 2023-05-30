const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index"); // Importe o arquivo index.js atualizado

chai.use(chaiHttp);
const expect = chai.expect;


describe("Testes das Rotas", () => {
  after(function() {
    // Feche o servidor após todos os testes
    app.close()
  })
  

  it("Deve retornar status 200 e definir um cookie na rota principal", (done) => {
    chai
        .request(app)
        .get("/")
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.cookie("teste");
            done();
        });
  });

  it("Deve criar um novo usuário", () =>{
    chai
      .request(app)
      .post("/cadastro")
      .send({ 
        nome_completo: "Yasmim Oliveira", 
        curso: 1,
        matricula: 1234567, 
        email: "yasmim@gmail.com", 
        celular: "619999999", 
        password: 123456 })
      .end((err, res) => {
        expect(res).to.have.status(200)
      })
  })

  it("Deve criar um novo aviso", ()=>{
    chai
      .request(app)
      .post("/aviso/criar")
      .send({
        id_usuario: {
          username: "yasmim@gmail.com",
          id: '6475f81582b2515bc01caded',
          nome: 'Yasmim',
          curso: 1
        },
        tituloAviso: "Criando um aviso",
        corpoAviso: "É um teste de aviso!",
        id_cursoAviso: 1,
        filtro: 'engenharia'      
      })
      .end((err, res) =>{
        expect(res).to.have.status(201)
      })
  })

  

});
