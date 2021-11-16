const mongoose = require('mongoose')

const CadastroSchema = mongoose.Schema({
    nome: {type: String},
    genero: {type: String},
    cidade: {type: String},
    estado: {type: String},
    status: {type: String, enum:['ativo','inativo'], default: 'ativo'}
},{timestamps:true})

module.exports = mongoose.model('cadastro', CadastroSchema)