/********************************************************************
 * Objetivo: As rotas conectam as URLs aos controladores.
 * Autor: Marcelo Vieira
 * Data: 04/11/2025
 * Versão: 1.0
********************************************************************/

//import das dependencias da API
const express       = require('express') 
const router        = express.Router()

//import da controller
const controllerDiretor   = require('../controller/diretor/controller_diretor.js')

//retorna a lista de todos os diretores
router.get('/', async (request, response) => {
    //chama a função para listar os diretores do DB
    let diretor = await controllerDiretor.listarDiretores()
    
    response.status(diretor.status_code)
    response.json(diretor)
})

//retorna o diretor filtrando pelo ID
router.get('/:id_diretor', async (request, response) => {

    let idDiretor = request.params.id_diretor

    let diretor = await controllerDiretor.buscarDiretorId(idDiretor)

    response.status(diretor.status_code)
    response.json(diretor)
})

//inserir um diretor
router.post('/', async (request, response) => {
    //recebe os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //recebe o tipo de dados da requisição (JSON ou XML ou ...)
    let contentType = request.headers['content-type']

    //chama a função da controller para inserir o novo filme, encaminha os dados e o content-type
    let diretor = await controllerDiretor.inserirDiretor(dadosBody, contentType)

    response.status(diretor.status_code)
    response.json(diretor)

})

//atualizar um diretor
router.put('/:id_diretor', async (request, response) => {
    //recebe o id do ator
    let idDiretor = request.params.id_diretor
    //recebe os dados a serem atualizados
    let dadosBody = request.body
    //recebe content-type da requisição
    let contentType = request.headers['content-type']

    //chama a função para atualizar o filme e encaminha os dados, o id e o content-type
    let diretor = await controllerDiretor.atualizarDiretor(dadosBody, idDiretor, contentType)

    response.status(diretor.status_code)
    response.json(diretor)
})

//excluir um diretor
router.delete('/delete/:id_diretor', async (request, response) => {

    let idDiretor = request.params.id_diretor

    let diretor = await controllerDiretor.excluirDiretor(idDiretor)

    response.status(diretor.status_code)
    response.json(diretor)
})


module.exports = router