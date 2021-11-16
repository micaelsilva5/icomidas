const express = require('express')
const cors=require('cors')
require('dotenv').config() //Carregar as variávies de ambiente
const InicializaMongoServer = require('./config/db')
const rotasCadastros = require('./routes/Cadastro')

InicializaMongoServer() // Inicializamos o MongoBD

const app = express()
app.use(cors())
const PORT = process.env.PORT
app.use(express.json()) // Definimos que o backende fará o parse do JSON

//Definindo a primeira rota
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API 100% Funcionando',
        versao: '1.0.0'
    })
})
//Rotas do nosso APP
app.use('/cadastros',rotasCadastros)

//Rotas para tratar erros 404(deve ser sempre a ultima rota)
app.use(function(req,res){
    res.status(404).json({
        mensagem: `A rota ${req.originalURL} não existe!`,
       
   })
})

//Carregado o servidor WEB
app.listen(PORT, (req, res)=> {
    console.log(` Servidor web rodando na porta ${PORT}`)
})