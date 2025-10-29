/* *********************************************************************
* Objetivo: Arquivo responsavel pelas requisições da API da locadora de filmes
* Data: 07/10/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

//import das dependencias da API
const express       = require('express') 
const cors          = require('cors') 
const bodyParser    = require('body-parser')

//cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

//criando uma instancia de uma classe do express
const app = express()

//retorna a porta do servidor atual ou colocamos uma porta local
const PORT = process.PORT || 8080

//configuração de permissões do CORS
app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*') 
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') 

    app.use(cors())
    next()
})


//import das controllers
const controllerFilme   = require('./controller/filme/controller_filme.js')
const controllerGenero  = require('./controller/genero/controller_genero.js')
const controllerAtor    = require('./controller/ator/controller_ator.js')


//EndPoints para a rota de filme

//retorna a lista de todos os filmes
app.get('/v1/locadora/filme', cors(), async (request, response) => {
    //chama a função para listar os filmes do DB
    let filme = await controllerFilme.listarFilmes()
    
    response.status(filme.status_code)
    response.json(filme)
})

//retorna o filme filtrando pelo ID
app.get('/v1/locadora/filme/:id', cors(), async (request, response) => {

    let idFilme = request.params.id

    let filme = await controllerFilme.buscarFilmeId(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})

//inserir um filme
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async (request, response) => {
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
app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async (request, response) => {
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
app.delete('/v1/locadora/filme/delete/:id', cors(), bodyParserJSON, async (request, response) => {

    let idFilme = request.params.id

    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})


//EndPoints para a rota de genero

//retorna a lista de todos os generos
app.get('/v1/locadora/genero', cors(), async (request, response) => {
    //chama a função para listar os generos do DB
    let genero = await controllerGenero.listarGeneros()
    
    response.status(genero.status_code)
    response.json(genero)
})

//retorna o genero filtrando pelo ID
app.get('/v1/locadora/genero/:id_genero', cors(), async (request, response) => {

    let idGenero = request.params.id_genero

    let genero = await controllerGenero.buscarGeneroId(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})

//inserir um genero
app.post('/v1/locadora/genero', cors(), bodyParserJSON, async (request, response) => {
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
app.put('/v1/locadora/genero/:id_genero', cors(), bodyParserJSON, async (request, response) => {
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
app.delete('/v1/locadora/genero/delete/:id_genero', cors(), bodyParserJSON, async (request, response) => {

    let idGenero = request.params.id_genero

    let genero = await controllerGenero.excluirGenero(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})


//EndPoints para a rota de ator

//retorna a lista de todos os atores
app.get('/v1/locadora/ator', cors(), async (request, response) => {
    //chama a função para listar os generos do DB
    let ator = await controllerAtor.listarAtores()
    
    response.status(ator.status_code)
    response.json(ator)
})

//retorna o ator filtrando pelo ID
app.get('/v1/locadora/ator/:id_ator', cors(), async (request, response) => {

    let idAtor = request.params.id_ator

    let ator = await controllerAtor.buscarAtorId(idAtor)

    response.status(ator.status_code)
    response.json(ator)
})

//inserir um ator
app.post('/v1/locadora/ator', cors(), bodyParserJSON, async (request, response) => {
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
app.put('/v1/locadora/ator/:id_ator', cors(), bodyParserJSON, async (request, response) => {
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
app.delete('/v1/locadora/ator/delete/:id_ator', cors(), bodyParserJSON, async (request, response) => {

    let idAtor = request.params.id_ator

    let ator = await controllerAtor.excluirAtor(idAtor)

    response.status(ator.status_code)
    response.json(ator)
})


//EndPoints para a rota de diretor



//EndPoints para a rota de roteirista



app.listen(PORT, () => {
    console.log('API aguardando requisições...')
})
