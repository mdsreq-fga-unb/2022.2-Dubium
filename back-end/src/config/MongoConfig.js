const { default: mongoose } = require("mongoose")

const connection = mongoose.connect("mongodb://0.0.0.0:27017/cadastrar-teste")
    .then(() => {
        console.log("Mongoose rodando!")
    }) 
    .catch((err) => {
        console.log(err)
    })

module.exports = connection