/* *********************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a MODEL para o CRUD de classificacao
* Data: 08/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

//import da model do DAO da classificacao
const classificacaoDAO = require('../../model/DAO/classificacao.js') // Arquivo alterado

//import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//FUNÇÃO DE APOIO
//validação dos dados de cadastro e atualização da classificacao
const validarDadosClassificacao = async (classificacao) => {

    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
            
    //validações de todas as entradas de dados    
    //validação de faixa_etaria  e obrigatoriedade do descricao
    if (classificacao.faixa_etaria == '' || classificacao.faixa_etaria == undefined || classificacao.faixa_etaria == null || classificacao.faixa_etaria.length > 2){
                      
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Faixa etária inválida]'   
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (classificacao.descricao == '' || classificacao.descricao == undefined || classificacao.descricao == null || classificacao.descricao.length > 50){
        
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Descrição inválida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {

        return false
    }
}

//FUNÇÕES PRINCIPAIS

//retorna uma lista de todas as classificacoes
const listarClassificacoes = async () => { // Nome alterado

    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
    
        //chama a função do DAO para retornar a lista do DB
        let resultClassificacoes = await classificacaoDAO.getSelectAllClassificacao() // Função DAO alterada

        if(resultClassificacoes){
            if(resultClassificacoes.length > 0){
                MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.classificacao = resultClassificacoes // Chave do JSON alterada

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

//retorna uma classificacao filtrando pelo ID
const buscarClassificacaoId = async (id_classificacao) => { // Parametro alterado
    
    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))


    try{
        
        //validação da chegada do ID
        if(!isNaN(id_classificacao) && id_classificacao != '' && id_classificacao != null && id_classificacao > 0){
            let resultClassificacao = await classificacaoDAO.getSelectClassificacaoById(Number(id_classificacao)) // Função DAO alterada

            if(resultClassificacao){
                if(resultClassificacao.length > 0){

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.classificacao = resultClassificacao // Chave do JSON alterada

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

//insere uma classificacao
const inserirClassificacao = async (classificacao, contentType) => {

    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{

        //validação do tipo de conteudo da requisição (obrigatorio ser um json)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //chama funcao de validar
            let validar = await validarDadosClassificacao(classificacao)

            if(!validar){

                //processamento
                //chama a função para inserir no DB
                let resultClassificacao = await classificacaoDAO.setInsertClassificacao(classificacao) // Função DAO alterada

                if (resultClassificacao){
                    //chama a função para receber o ID gerado no DB
                    let lastID = await classificacaoDAO.getSelectLastId()
                    if(lastID){
                        //adiciona o ID no JSON com os dados
                        classificacao.id_classificacao = lastID // ID alterado
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items       = classificacao

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

//atualiza uma classificacao buscando pelo id
const atualizarClassificacao = async (classificacao, id_classificacao, contentType) => { // Parametro alterado
  //criando um objeto novo para as mensagens
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{

        //validação do tipo de conteudo da requisição (obrigatorio ser um json)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){

                //chama funcao de validar
                let validar = await validarDadosClassificacao(classificacao)

                if(!validar){
   
                    //validação de ID válido, chama a função da controller que verifica no BD se o ID existe
                    let validarID = await buscarClassificacaoId(id_classificacao)

                    if(validarID.status_code == 200){
                    
                        //adiciona o id no json de dados para ser encaminhado ao DAO
                        classificacao.id_classificacao = Number(id_classificacao)

                        //chama a função para atualizar no DB
                        let resultClassificacao = await classificacaoDAO.setUpdateClassificacao(classificacao) // Função DAO alterada

                        if (resultClassificacao){
                            MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_UPDATED_ITEM.status
                            MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                            MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_UPDATED_ITEM.message
                            MESSAGES.DEFAULT_HEADER.items.classificacao    = classificacao

                            return MESSAGES.DEFAULT_HEADER //200
                        } else {
                            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                        }

                    } else {
                        return validarID //a função buscarClassificacaoId poderá retornar -> 400, 404 ou 500
                    }

                } else {
                    return validar //400 referente a validação dos dados
                }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//exclui uma classificacao buscando pelo id
const excluirClassificacao = async (id_classificacao) => { // Parametro alterado

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação da chegada do ID
        if(!isNaN(id_classificacao) && id_classificacao != '' && id_classificacao != null && id_classificacao > 0){

            //Validação de ID válido
            let validarID = await buscarClassificacaoId(id_classificacao)

            if(validarID.status_code == 200){

                let resultClassificacao = await classificacaoDAO.setDeleteClassificacao(Number(id_classificacao)) // Função DAO alterada

                if(resultClassificacao){
                    
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.classificacao = resultClassificacao
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
    listarClassificacoes,
    buscarClassificacaoId,
    inserirClassificacao,
    atualizarClassificacao,
    excluirClassificacao
}