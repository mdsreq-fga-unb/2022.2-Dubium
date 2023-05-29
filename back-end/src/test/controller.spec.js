const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index"); // Importe o arquivo index.js atualizado

chai.use(chaiHttp);
const expect = chai.expect;

describe("Testes das rotas", () => {
  afterEach(() => {
    // Feche o servidor após cada teste
    app.close();
  });

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

  it("Deve criar um aviso e retornar status 201", (done) => {
    chai
        .request(app)
        .post("/aviso")
        .send({
            id_usuario: "123456",
            tituloAviso: "aviso!",
            corpoAviso: "É um aviso",
            id_cursoAviso: "12345",
            filtro: "filtro"
        })
        .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.text).to.equal('Aviso criado com sucesso!')
            done()
        })
  })


});
