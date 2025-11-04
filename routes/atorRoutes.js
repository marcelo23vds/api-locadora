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
const controllerAtor   = require('../controller/ator/controller_ator.js')

//retorna a lista de todos os atores
router.get('/', async (request, response) => {
    //chama a função para listar os generos do DB
    let ator = await controllerAtor.listarAtores()
    
    response.status(ator.status_code)
    response.json(ator)
})

//retorna o ator filtrando pelo ID
router.get('/:id_ator', async (request, response) => {

    let idAtor = request.params.id_ator

    let ator = await controllerAtor.buscarAtorId(idAtor)

    response.status(ator.status_code)
    response.json(ator)
})

//inserir um ator
router.post('/', async (request, response) => {
    //recebe os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //recebe o tipo de dados da requisição (JSON ou XML ou ...)
    let contentType = request.headers['content-type']

    //chama a função da controller para inserir o novo filme, encaminha os dados e o content-type
    let ator = await controllerAtor.inserirAtor(dadosBody, contentType)

    response.status(ator.status_code)
    response.json(ator)

})

//atualizar um ator
router.put('/:id_ator', async (request, response) => {
    //recebe o id do ator
    let idAtor = request.params.id_ator
    //recebe os dados a serem atualizados
    let dadosBody = request.body
    //recebe content-type da requisição
    let contentType = request.headers['content-type']

    //chama a função para atualizar o filme e encaminha os dados, o id e o content-type
    let ator = await controllerAtor.atualizarAtor(dadosBody, idAtor, contentType)

    response.status(ator.status_code)
    response.json(ator)
})

//excluir um ator
router.delete('/delete/:id_ator', async (request, response) => {

    let idAtor = request.params.id_ator

    let ator = await controllerAtor.excluirAtor(idAtor)

    response.status(ator.status_code)
    response.json(ator)
})

module.exports = router