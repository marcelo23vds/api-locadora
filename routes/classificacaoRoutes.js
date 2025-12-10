/********************************************************************
 * Objetivo: As rotas conectam as URLs aos controladores.
 * Autor: Marcelo Vieira
 * Data: 08/12/2025
 * Versão: 1.0
********************************************************************/

//import das dependencias da API
const express       = require('express') 
const router        = express.Router()

//import da controller
const controllerClassificacao = require('../controller/classificacao/controller_classificacao.js')

//retorna a lista de todas as classificacoes
router.get('/', async (request, response) => {
    //chama a função para listar
    let classificacao = await controllerClassificacao.listarClassificacoes()
    
    response.status(classificacao.status_code)
    response.json(classificacao)
})

//retorna a classificacao filtrando pelo ID
router.get('/:id_classificacao', async (request, response) => { // Parametro alterado

    let idClassificacao = request.params.id_classificacao

    let classificacao = await controllerClassificacao.buscarClassificacaoId(idClassificacao)

    response.status(classificacao.status_code)
    response.json(classificacao)
})

//inserir uma classificacao
router.post('/', async (request, response) => {
    //recebe os dados do body da requisição
    let dadosBody = request.body

    //recebe o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //chama a função da controller para inserir
    let classificacao = await controllerClassificacao.inserirClassificacao(dadosBody, contentType)

    response.status(classificacao.status_code)
    response.json(classificacao)

})

//atualizar uma classificacao
router.put('/:id_classificacao', async (request, response) => { // Parametro alterado
    //recebe o id
    let idClassificacao = request.params.id_classificacao
    //recebe os dados a serem atualizados
    let dadosBody = request.body
    //recebe content-type da requisição
    let contentType = request.headers['content-type']

    //chama a função para atualizar
    let classificacao = await controllerClassificacao.atualizarClassificacao(dadosBody, idClassificacao, contentType)

    response.status(classificacao.status_code)
    response.json(classificacao)
})

//excluir uma classificacao
router.delete('/delete/:id_classificacao', async (request, response) => { // Parametro alterado

    let idClassificacao = request.params.id_classificacao

    let classificacao = await controllerClassificacao.excluirClassificacao(idClassificacao)

    response.status(classificacao.status_code)
    response.json(classificacao)
})

module.exports = router