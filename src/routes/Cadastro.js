const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Cadastro = require('../model/Cadastro')
const validaCadastro = [
    check("nome","Nome da Cadastro é obrigatório!").not().isEmpty(),
    check("genero","Informe i genero valido!").not().isEmpty(),
    check("cidade","Informe um cidade valido!").not().isEmpty(),
    check("estado","Informe um estado valido!").not().isEmpty(),
    check("status","Informe o status do cliente").isIn(['ativo','inativo'])
]

/****************** 
* Rota - Lista de Cadastros 
* GET na URL /cadastros
********************/
router.get('/', async(req, res) => {
    try{
        const cadastros = await Cadastro.find()
        res.json(cadastros)
    } catch (err){
      res.status(500).send({
          errors:[{message: 'Não foi possivel encontrar as cadastros'}]
      }) 
    }
})

/****************** 
* Lista uma de Cadastro por ID
* GET na URL /cadastros/:id
********************/
router.get('/:id', async(req, res) => {
    try {
        const cadastro = await Cadastro.find({"_id": req.params.id})
        res.json(cadastro)
    }catch (err){
        res.status(400).send({
            errors: [{message: `Não foi possivel encontrar a cadastro ${req.params.id}`}]
        })
    }
})

/****************** 
* Inclui uma nova cadastro 
* POST /cadastros 
********************/
router.post('/', validaCadastro, async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try{
        let cadastro = new Cadastro(req.body)
        await cadastro.save()
        res.send(cadastro)
    }catch (err){
        return res.status(400).json({
            errors: [{message: `Erro ao salvar a cadastro: ${err.message}`}]
        })
    }    
})

/****************** 
* Apaga uma nova cadastro pelo ID
* DELETE /cadastros 
********************/
router.delete('/:id', async(req, res) => {
    await Cadastro.findByIdAndRemove(req.params.id)
    .then(cadastro => {
        res.send({message: `Cadastro ${cadastro.nome} removida com sucesso`})
    }).catch(err => {
        return res.status(400).send({
            errors: [{mensagem: 'Não foi possivel excluir '}]
        })
    })
})

/****************** 
* Altera uma Cadastro existente
* PUT /Cadastros 
********************/
router.put('/', validaCadastro, async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    let dados = req.body
    await Cadastro.findByIdAndUpdate(req.body._id, {$set: dados})
    .then(cadastro => {
        res.send({message: `Cadastro ${cadastro.nome} alterada com sucesso!`})
    }).catch(err => {
        return res.status(400).send({
            errors: [{mensage: 'Não foi possível alterar a cadastro informado'}]
            
        })
    })
})

module.exports = router