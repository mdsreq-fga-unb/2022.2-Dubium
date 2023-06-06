const { default: mongoose } = require("mongoose")


// const connection = mongoose.connect("mongodb+srv://arthurmelo1918:71JuBrKKWQr6kAfU@dubium0.o4ru6rq.mongodb.net/Dubium")

const connection = mongoose.connect("mongodb://0.0.0.0:27017/cadastrar-teste")
    .then(() => {
        console.log("Mongoose rodando!")
    }) 
    .catch((err) => {
        console.log(err)
    })

module.exports = connection