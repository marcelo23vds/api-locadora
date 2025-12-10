/* *********************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a MODEL para o CRUD na relação entre filme e ator
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

const filmeAtorDAO = require('../../model/DAO/filme_ator.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const validarDadosFilmeAtor = async (filmeAtor) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    if (filmeAtor.id_filme <= 0 || isNaN(filmeAtor.id_filme) || filmeAtor.id_filme == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_filme inválido]'   
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (filmeAtor.id_ator <= 0 || isNaN(filmeAtor.id_ator) || filmeAtor.id_ator == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_ator inválido]'   
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

const listarFilmesAtores = async () => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let result = await filmeAtorDAO.getSelectAllMoviesActors()
        if(result && result.length > 0){
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
            MESSAGES.DEFAULT_HEADER.items.filmes_atores = result
            return MESSAGES.DEFAULT_HEADER
        } else {
            return MESSAGES.ERROR_NOT_FOUND
        }
    } catch (error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const inserirFilmeAtor = async (filmeAtor, contentType) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try{
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDadosFilmeAtor(filmeAtor)
            if(!validar){
                let result = await filmeAtorDAO.setInsertMoviesActors(filmeAtor)
                if (result){
                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items       = filmeAtor
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

// Função usada no UPDATE do filme para limpar atores antigos
const excluirFilmeAtor = async (id_filme) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id_filme) && id_filme > 0) {
            // Chama a DAO que deleta WHERE id_filme = ...
            let result = await filmeAtorDAO.setDeleteMoviesActors(Number(id_filme))
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

const listarAtoresIdFilme = async (id_filme) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try{
        if(!isNaN(id_filme) && id_filme > 0){
            let result = await filmeAtorDAO.getSelectActorsByIdMovie(Number(id_filme))
            if(result){
                 // Se vazio retorna array vazio, se cheio retorna dados
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes_atores = result.length > 0 ? result : []
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
    listarFilmesAtores,
    inserirFilmeAtor,
    excluirFilmeAtor,
    listarAtoresIdFilme
}