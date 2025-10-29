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

//retorna um ator filtrando pelo ID
const buscarAtorId = async (id_ator) => {
    
    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))


    try{
        
        //validação da chegada do ID
        if(!isNaN(id_ator) && id_ator != '' && id_ator != null && id_ator > 0){
            let resultAtores = await atorDAO.getSelectActorsById(Number(id_ator))

            if(resultAtores){
                if(resultAtores.length > 0){

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.atores = resultAtores

                    return MESSAGES.DEFAULT_HEADER

                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    }catch(error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//insere um ator
const inserirAtor = async (ator, contentType) => {

    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{

        //validação do tipo de conteudo da requisição (obrigatorio ser um json)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //chama funcao de validar todos os filmes
            let validar = await validarDadosAtor(ator)

            if(!validar){

                //processamento
                //chama a função para inserir um novo ator no DB
                let resultAtores = await atorDAO.setInsertActors(ator)

                if (resultAtores){
                    //chama a função para receber o ID gerado no DB
                    let lastID = await atorDAO.getSelectLastId()
                    if(lastID){
                        //adiciona o ID no JSON com os dados do genero
                        ator.id_ator = lastID
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items       = ator

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                    
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return validar //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//atualiza um ator buscando pelo id
const atualizarAtor = async (ator, id_ator, contentType) => {
  //criando um objeto novo para as mensagens
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{

        //validação do tipo de conteudo da requisição (obrigatorio ser um json)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){

                //chama funcao de validar todos os filmes
                let validar = await validarDadosAtor(ator)

                if(!validar){
   
                    //validação de ID válido, chama a função da controller que verifica no DB se o ID existe e valida o ID
                    let validarID = await buscarAtorId(id_ator)

                    if(validarID.status_code == 200){
                    
                        //adiciona o id do filme no json de dados para ser encaminhado ao DAO
                        ator.id_ator = Number(id_ator)

                        //chama a função para inserir um novo ator no DB
                        let resultAtores = await atorDAO.setUpdateActors(ator)

                        if (resultAtores){
                            MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_UPDATED_ITEM.status
                            MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                            MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_UPDATED_ITEM.message
                            MESSAGES.DEFAULT_HEADER.items.ator      = ator

                            return MESSAGES.DEFAULT_HEADER //200
                        } else {
                            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                        }

                    } else {
                        return validarID //a função buscarGeneroId poderá retornar -> 400, 404 ou 500
                    }

                } else {
                    return validar //400 referente a validação dos dados
                }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//exclui um ator buscando pelo id
const excluirAtor = async (id_ator) => {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação da chegada do ID
        if(!isNaN(id_ator) && id_ator != '' && id_ator != null && id_ator > 0){

            //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
            let validarID = await buscarAtorId(id_ator)

            if(validarID.status_code == 200){

                let resultAtores = await atorDAO.setDeleteActors(Number(id_ator))

                if(resultAtores){
                    
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.ator = resultAtores
                        delete MESSAGES.DEFAULT_HEADER.items
                        return MESSAGES.DEFAULT_HEADER //200
            
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else{
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

module.exports = {
    listarAtores,
    buscarAtorId,
    inserirAtor,
    atualizarAtor,
    excluirAtor
}