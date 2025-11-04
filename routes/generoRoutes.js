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
const controllerGenero   = require('../controller/genero/controller_genero.js')

//retorna a lista de todos os generos
router.get('/', async (request, response) => {
    //chama a função para listar os generos do DB
    let genero = await controllerGenero.listarGeneros()
    
    response.status(genero.status_code)
    response.json(genero)
})

//retorna o genero filtrando pelo ID
router.get('/:id_genero', async (request, response) => {

    let idGenero = request.params.id_genero

    let genero = await controllerGenero.buscarGeneroId(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})

//inserir um genero
router.post('/', async (request, response) => {
    //recebe os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //recebe o tipo de dados da requisição (JSON ou XML ou ...)
    let contentType = request.headers['content-type']

    //chama a função da controller para inserir o novo filme, encaminha os dados e o content-type
    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(genero.status_code)
    response.json(genero)

})

//atualizar um genero
router.put('/:id_genero', async (request, response) => {
    //recebe o id do genero
    let idGenero = request.params.id_genero
    //recebe os dados a serem atualizados
    let dadosBody = request.body
    //recebe content-type da requisição
    let contentType = request.headers['content-type']

    //chama a função para atualizar o filme e encaminha os dados, o id e o content-type
    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(genero.status_code)
    response.json(genero)
})

//excluir um genero
router.delete('/delete/:id_genero', async (request, response) => {

    let idGenero = request.params.id_genero

    let genero = await controllerGenero.excluirGenero(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})

module.exports = router