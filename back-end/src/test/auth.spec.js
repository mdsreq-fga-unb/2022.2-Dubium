const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

chai.use(chaiHttp)

const app = require('../index')