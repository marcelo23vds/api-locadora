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
const controllerRoteirista   = require('../controller/roteirista/controller_roteirista.js')

//retorna a lista de todos os roteiristas
router.get('/', async (request, response) => {
    //chama a função para listar os roteiristas do DB
    let roteirista = await controllerRoteirista.listarRoteiristas()
    
    response.status(roteirista.status_code)
    response.json(roteirista)
})

//retorna o roteirista filtrando pelo ID
router.get('/:id_roteirista', async (request, response) => {

    let idRoteirista = request.params.id_roteirista

    let roteirista = await controllerRoteirista.buscarRoteiristaId(idRoteirista)

    response.status(roteirista.status_code)
    response.json(roteirista)
})

//inserir um roteirista
router.post('/', async (request, response) => {
    //recebe os dados do body da requisição (se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //recebe o tipo de dados da requisição (JSON ou XML ou ...)
    let contentType = request.headers['content-type']

    //chama a função da controller para inserir o novo filme, encaminha os dados e o content-type
    let roteirista = await controllerRoteirista.inserirRoteirista(dadosBody, contentType)

    response.status(roteirista.status_code)
    response.json(roteirista)

})

//atualizar um roteirista
router.put('/:id_roteirista', async (request, response) => {
    //recebe o id do ator
    let idRoteirista = request.params.id_roteirista
    //recebe os dados a serem atualizados
    let dadosBody = request.body
    //recebe content-type da requisição
    let contentType = request.headers['content-type']

    //chama a função para atualizar o filme e encaminha os dados, o id e o content-type
    let roteirista = await controllerRoteirista.atualizarRoteirista(dadosBody, idRoteirista, contentType)

    response.status(roteirista.status_code)
    response.json(roteirista)
})

//excluir um roteirista
router.delete('/delete/:id_roteirista', async (request, response) => {

    let idRoteirista = request.params.id_roteirista

    let roteirista = await controllerRoteirista.excluirRoteirista(idRoteirista)

    response.status(roteirista.status_code)
    response.json(roteirista)
})

module.exports = router