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

//FUNÇÃO DE APOIO
//validação dos dados de cadastro e atualização do filme
const validarDadosFilme = async (filme) => {

    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
            
    //validações de todas as entradas de dados    
    if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100){
                      
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome inválido]'   
        return MESSAGES.ERROR_REQUIRED_FIELDS
            
    } else if (filme.sinopse == undefined){
        
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Sinopse inválida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
                            
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Data de lançamento inválida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length > 8){

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Duração inválida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.orcamento == '' || filme.orcamento == undefined || filme.orcamento == null || filme.duracao.length > 12 || typeof(filme.orcamento) != 'number'){

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Orçamento inválido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.trailer == undefined || filme.trailer > 200){

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Trailer inválido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.capa == '' || filme.capa == undefined || filme.capa == null || filme.capa.length > 200){

        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Capa inválida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {

        return false

    }
}


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
        if(!isNaN(id) && id != '' && id != null && id > 0){
            let resultFilmes = await filmeDAO.getSelectMoviesById(Number(id))

            if(resultFilmes){
                if(resultFilmes.length > 0){

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
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
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    }catch(error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//insere um filme
const inserirFilme = async (filme, contentType) => {

    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{

        //validação do tipo de conteudo da requisição (obrigatorio ser um json)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //chama funcao de validar todos os filmes
            let validar = await validarDadosFilme(filme)

            if(!validar){

                //processamento
                //chama a função para inserir um novo filme no DB
                let resultFilmes = await filmeDAO.setInsertMovies(filme)

                if (resultFilmes){
                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_CREATED_ITEM.message

                    return MESSAGES.DEFAULT_HEADER //201
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

//atualiza  um filme buscando pelo id
const atualizarFilme = async (filme, id, contentType) => {
  //criando um objeto novo para as mensagens
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{

        //validação do tipo de conteudo da requisição (obrigatorio ser um json)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){

                //chama funcao de validar todos os filmes
                let validar = await validarDadosFilme(filme)

                if(!validar){
   
                    //validação de ID válido, chama a função da controller que verifica no DB se o ID existe e valida o ID
                    let validarID = await buscarFilmeId(id)

                    if(validarID.status_code == 200){
                    
                        //adiciona o id do filme no json de dados para ser encaminhado ao DAO
                        filme.id = Number(id)

                        //chama a função para inserir um novo filme no DB
                        let resultFilmes = await filmeDAO.setUpdateMovies(filme)

                        if (resultFilmes){
                            MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATED_ITEM.status
                            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                            MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATED_ITEM.message
                            MESSAGES.DEFAULT_HEADER.items.filme = filme

                            return MESSAGES.DEFAULT_HEADER //200
                        } else {
                            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                        }

                    } else {
                        return validarID //a função buscarFilmeID poderá retornar -> 400, 404 ou 500
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

//exclui um filme buscando pelo id
const excluirFilme = async (id) => {

}

module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme,
    atualizarFilme
}
