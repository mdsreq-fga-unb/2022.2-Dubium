const chai = require("chai");
const chaiHttp = require("chai-http")
const server = require("../index")
const expect = chai.expect;

chai.use(chaiHttp);

let globalToken;

describe("Testes das Rotas", () => {
    before((done) => {
        chai
          .request(server)
          .post("/login")
          .send({ username: "sabrina_mattos@gmail.com", password: '123456' })
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res).to.have.cookie('jwt')
            
            globalToken = res.header['set-cookie'][0].split('=')[1].split(';')[0]
            done();
          });
      });
    
      after(function () {
        // Feche o servidor após todos os testes
        server.close()
      });

    // it("Deve criar um novo usuário", () =>{
    //     chai
    //     .request(server)
    //     .post("/cadastro")
    //     .send({ 
    //       nome_completo: "Sabrina Mattos", 
    //       curso: 1,
    //       matricula: 1234567, 
    //       email: "sabrina_mattos@gmail.com", 
    //       celular: "619999699", 
    //       password: 123456 })
    //     .end((err, res) => {
    //       expect(res).to.have.status(200)
    //     })
    // })

    // it('Deve criar uma pergunta', (done) => {
    //     chai
    //         .request(server)
    //         .post('/pergunta')
    //         .send({
    //             titulo: "Rei e Rainha da Derivada",
    //             curso: 1,
    //             conteudo: "É obrigatório participar do evento?",
    //             filtro: "C1"
    //         })
    //         .set('Cookie', `jwt=${globalToken}`)
    //         .end((err, res) => {
    //             expect(res).to.have.status(201)
    //             done()
    //         })
    // })

    // it("Deve criar um aviso", (done) =>{
    //     chai   
    //         .request(server)
    //         .post('/aviso/criar')
    //         .send({
    //             id_usuario: {
    //               username: 'sabrina_mattos@gmail.com',
    //               id: '6484d5f01035ba31b9d493d8',
    //               nome: 'Sabrina Mattos',
    //               curso: 1
    //             },
    //             tituloAviso: 'Monitoria de APC',
    //             corpoAviso: 'A monitoria será na S10',
    //             id_cursoAviso: 1,
    //             filtro: 'APC'
    //           })
    //         .set("Authorization", `Bearer ${globalToken}`)
    //         .end((err, res) => {
    //             expect(res).to.have.status(201)
    //             done()
    //         })
    // })

    // it("Deve retornar um aviso existente", (done) => {
    //     chai
    //         .request(server)
    //         .get("/aviso/6484d6820f85baedbbd2a2ae")
    //         .set("Authorization", ` Bearer ${globalToken}`)
    //         .end((err, res) => {
    //             expect(res).to.have.status(201);
    //             expect(res.body).to.be.an("object");
    //             done();
    //         });
    // });


    it("Deve permitir a edição de um aviso pelo proprietário", (done) => {
        chai
          .request(server)
          .put(`/aviso/editar/6484d6820f85baedbbd2a2ae`)
          .send({
            titulo: "Editando",
            conteudo: "Editado",
            materia: "MDS"
          })
          .set("Authorization", `Bearer ${globalToken}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

    // it("Deve responder a uma pergunta", (done)=>{
    //     chai
    //         .request(server)
    //         .post('/resposta')
    // }) incompleto



})