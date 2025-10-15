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
const controllerFilme = require('./controller/filme/controller_filme.js')

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

app.listen(PORT, () => {
    console.log('API aguardando requisições...')
})
