/* *********************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a MODEL para o CRUD de filmes
* Data: 07/10/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

//import da model do DAO do filme
const filmeDAO = require('../../model/DAO/filme.js')

//import do arquivo de mensagens
const MESSAGES = require('../modulo/config_messages.js')

//retorna uma lista de todos os filmes
const listarFilmes = async () => {
    //chama a função do DAO para retornar a lista de filmes do DB
    let resultFilmes = await filmeDAO.getSelectAllMovies()

    if(resultFilmes){
        if(resultFilmes.length > 0){
            MESSAGES.MESSAGE_HEADER.status      = MESSAGES.MESSAGE_REQUEST_SUCCESS.status
            MESSAGES.MESSAGE_HEADER.status_code = MESSAGES.MESSAGE_REQUEST_SUCCESS.status_code
            MESSAGES.MESSAGE_HEADER.items.filmes = resultFilmes

            return MESSAGES.MESSAGE_HEADER
        }
    }
}

//retorna um filme filtrando pelo ID
const buscarFilmeId = async () => {

}

//insere um filme
const inserirFilme = async () => {

}

//atualiza  um filme buscando pelo id
const atualizarFilme = async (filme, id) => {

}

//exclui um filme buscando pelo id
const excluirFilme = async (id) => {

}

module.exports = {
    listarFilmes
}
