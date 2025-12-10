/* *********************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a MODEL para o CRUD na relação entre filme e diretor
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

const filmeDiretorDAO = require('../../model/DAO/filme_diretor.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const validarDadosFilmeDiretor = async (filmeDiretor) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    if (filmeDiretor.id_filme <= 0 || isNaN(filmeDiretor.id_filme) || filmeDiretor.id_filme == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_filme inválido]'   
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (filmeDiretor.id_diretor <= 0 || isNaN(filmeDiretor.id_diretor) || filmeDiretor.id_diretor == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_diretor inválido]'   
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

const listarFilmesDiretores = async () => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let result = await filmeDiretorDAO.getSelectAllMoviesDirectors()
        if(result && result.length > 0){
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
            MESSAGES.DEFAULT_HEADER.items.filmes_diretores = result
            return MESSAGES.DEFAULT_HEADER
        } else {
            return MESSAGES.ERROR_NOT_FOUND
        }
    } catch (error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const inserirFilmeDiretor = async (filmeDiretor, contentType) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try{
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDadosFilmeDiretor(filmeDiretor)
            if(!validar){
                let result = await filmeDiretorDAO.setInsertMoviesDirectors(filmeDiretor)
                if (result){
                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items       = filmeDiretor
                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validar
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função usada no UPDATE do filme para limpar diretores antigos
const excluirFilmeDiretor = async (id_filme) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id_filme) && id_filme > 0) {
            let result = await filmeDiretorDAO.setDeleteMoviesDirectors(Number(id_filme))
            if (result) {
                MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                delete MESSAGES.DEFAULT_HEADER.items
                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL 
            }
        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS 
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarDiretoresIdFilme = async (id_filme) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try{
        if(!isNaN(id_filme) && id_filme > 0){
            let result = await filmeDiretorDAO.getSelectDirectorsByIdMovie(Number(id_filme))
            if(result){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes_diretores = result.length > 0 ? result : []
                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    }catch(error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    listarFilmesDiretores,
    inserirFilmeDiretor,
    excluirFilmeDiretor,
    listarDiretoresIdFilme
}