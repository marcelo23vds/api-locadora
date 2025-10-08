/* *********************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a MODEL para o CRUD de filmes
* Data: 07/10/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

//import da model do DAO do filme
const filmeDAO = require('../../model/DAO/filme.js')

//import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//retorna uma lista de todos os filmes
const listarFilmes = async () => {

    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
    
        //chama a função do DAO para retornar a lista de filmes do DB
        let resultFilmes = await filmeDAO.getSelectAllMovies()

        if(resultFilmes){
            if(resultFilmes.length > 0){
                MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes    = resultFilmes

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//retorna um filme filtrando pelo ID
const buscarFilmeId = async (id) => {
    
    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))


    try{
        
        //validação da chegada do ID
        if(!isNaN(id)){
            let resultFilmes = await filmeDAO.getSelectMoviesById(Number(id))

            if(resultFilmes){
                if(resultFilmes.length > 0){

                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes = resultFilmes

                    return MESSAGES.DEFAULT_HEADER

                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    }catch(error){
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
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
    listarFilmes,
    buscarFilmeId
}
