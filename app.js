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
app.get('/v1/locadora/filme', cors(), async (request, response) => {
    //chama a função para listar os filmes do DB
    let filme = await controllerFilme.listarFilmes()
    response.status(filme.status_code)
    response.json(filme)
})

app.get('/v1/locadora/filme/:id', cors(), async (request, response) => {

    let idFilme = request.params.id

    let filme = await controllerFilme.buscarFilmeId(idFilme)
    response.status(filme.status_code)
    response.json(filme)
})

app.listen(PORT, () => {
    console.log('API aguardando requisições...')
})
