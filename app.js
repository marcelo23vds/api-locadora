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
const filmesRoutes = require('./routes/filmeRoutes.js')
const atorRoutes = require('./routes/filmeRoutes.js')
const diretorRoutes = require('./routes/diretorRoutes.js')

//usando as rotas de filme
app.use('/v1/locadora/filme', cors(), bodyParserJSON, filmesRoutes)





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

//retorna a lista de todos os diretores
app.get('/v1/locadora/diretor', cors(), async (request, response) => {
    //chama a função para listar os diretores do DB
    let diretor = await controllerDiretor.listarDiretores()
    
    response.status(diretor.status_code)
    response.json(diretor)
})

//retorna o diretor filtrando pelo ID
app.get('/v1/locadora/diretor/:id_diretor', cors(), async (request, response) => {

    let idDiretor = request.params.id_diretor

    let diretor = await controllerDiretor.buscarDiretorId(idDiretor)

    response.status(diretor.status_code)
    response.json(diretor)
})

//inserir um diretor
app.post('/v1/locadora/diretor', cors(), bodyParserJSON, async (request, response) => {
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
app.put('/v1/locadora/diretor/:id_diretor', cors(), bodyParserJSON, async (request, response) => {
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
app.delete('/v1/locadora/diretor/delete/:id_diretor', cors(), bodyParserJSON, async (request, response) => {

    let idDiretor = request.params.id_diretor

    let diretor = await controllerDiretor.excluirDiretor(idDiretor)

    response.status(diretor.status_code)
    response.json(diretor)
})


//EndPoints para a rota de roteirista

//retorna a lista de todos os roteiristas
app.get('/v1/locadora/roteirista', cors(), async (request, response) => {
    //chama a função para listar os roteiristas do DB
    let roteirista = await controllerRoteirista.listarRoteiristas()
    
    response.status(roteirista.status_code)
    response.json(roteirista)
})

//retorna o roteirista filtrando pelo ID
app.get('/v1/locadora/roteirista/:id_roteirista', cors(), async (request, response) => {

    let idRoteirista = request.params.id_roteirista

    let roteirista = await controllerRoteirista.buscarRoteiristaId(idRoteirista)

    response.status(roteirista.status_code)
    response.json(roteirista)
})

//inserir um roteirista
app.post('/v1/locadora/roteirista', cors(), bodyParserJSON, async (request, response) => {
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
app.put('/v1/locadora/roteirista/:id_roteirista', cors(), bodyParserJSON, async (request, response) => {
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
app.delete('/v1/locadora/roteirista/delete/:id_roteirista', cors(), bodyParserJSON, async (request, response) => {

    let idRoteirista = request.params.id_roteirista

    let roteirista = await controllerRoteirista.excluirRoteirista(idRoteirista)

    response.status(roteirista.status_code)
    response.json(roteirista)
})

app.listen(PORT, () => {
    console.log('API aguardando requisições...')
})
