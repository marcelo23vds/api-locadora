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
const controllerFilme   = require('../controller/filme/controller_filme.js')

// rota para obter todos os filmes
router.get('/', async (request, response) => {
    //chama a função para listar os filmes do DB
    let filme = await controllerFilme.listarFilmes()
    
    response.status(filme.status_code)
    response.json(filme)
})

//retorna o filme filtrando pelo ID
router.get('/:id', async (request, response) => {

    let idFilme = request.params.id

    let filme = await controllerFilme.buscarFilmeId(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})

//inserir um filme
router.post('/', async (request, response) => {
    //recebe os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //recebe o tipo de dados da requisição (JSON ou XML ou ...)
    let contentType = request.headers['content-type']

    //chama a função da controller para inserir o novo filme, encaminha os dados e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)
    response.json(filme)

})

//atualizar um filme
router.put('/:id', async (request, response) => {
    //recebe o id do filme
    let idFilme = request.params.id
    //recebe os dados a serem atualizados
    let dadosBody = request.body
    //recebe content-type da requisição
    let contentType = request.headers['content-type']

    //chama a função para atualizar o filme e encaminha os dados, o id e o content-type
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code)
    response.json(filme)
})

//excluir um filme
router.delete('/delete/:id', async (request, response) => {

    let idFilme = request.params.id

    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})

module.exports = router