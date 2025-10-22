/* *********************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a MODEL para o CRUD de atores
* Data: 22/10/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

//import da model do DAO do ator
const atorDAO = require('../../model/DAO/ator.js')
const { buscarFilmeId } = require('../filme/controller_filme.js')

//import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//FUNÇÃO DE APOIO
//validação dos dados de cadastro e atualização do ator
const validarDadosAtor = async (ator) => {

    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
            
    //validações de todas as entradas de dados    
    if (ator.nome_ator == '' || ator.nome_ator == undefined || ator.nome_ator == null || ator.nome_ator.length > 50){
                      
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome inválido]'   
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {

        return false
    }
}

//FUNÇÕES PRINCIPAIS

//retorna uma lista de todos os atores
const listarAtores = async () => {

    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
    
        //chama a função do DAO para retornar a lista de Atores do DB
        let resultAtores = await atorDAO.getSelectAllActors()

        if(resultAtores){
            if(resultAtores.length > 0){
                MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.atores   = resultAtores

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



module.exports = {
    listarAtores
}