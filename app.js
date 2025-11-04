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

//importando as rotas
const filmesRoutes      = require('./routes/filmeRoutes.js')
const generoRoutes      = require('./routes/generoRoutes.js')
const atorRoutes        = require('./routes/atorRoutes.js')
const diretorRoutes     = require('./routes/diretorRoutes.js')
const roteiristaRoutes  = require('./routes/roteiristaRoutes.js')

//usando as rotas de filme
app.use('/v1/locadora/filme', cors(), bodyParserJSON, filmesRoutes)
//usando as rotas de generos
app.use('/v1/locadora/genero', cors(), bodyParserJSON, generoRoutes)
//usando as rotas de atores
app.use('/v1/locadora/ator', cors(), bodyParserJSON, atorRoutes)
//usando as rotas de diretores
app.use('/v1/locadora/diretor', cors(), bodyParserJSON, diretorRoutes)
//usando as rotas de roteiristas
app.use('/v1/locadora/roteirista', cors(), bodyParserJSON, roteiristaRoutes)

app.listen(PORT, () => {
    console.log('API aguardando requisições...')
})
