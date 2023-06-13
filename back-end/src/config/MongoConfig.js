const { default: mongoose } = require("mongoose")
require('dotenv').config();


const connection = mongoose.connect(process.env.DB_HOST)
    .then(() => {
        console.log("Mongoose rodando!")
    }) 
    .catch((err) => {
        console.log(err)
    })

module.exports = connection