/* *********************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a MODEL para o CRUD na relação entre filme e genero
* Data: 05/11/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

//import da model do DAO do filme
const filmeGeneroDAO = require('../../model/DAO/filme_genero.js')

//import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//FUNÇÃO DE APOIO
//validação dos dados de cadastro e atualização do filme
const validarDadosFilmeGenero = async (filmeGenero) => {

    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
            
    //validações de todas as entradas de dados    
    if (filmeGenero.id_filme <= 0 || isNaN(filmeGenero.id_filme) ||filmeGenero.id_filme == '' || filmeGenero.id_filme == undefined || filmeGenero.id_filme == null || filmeGenero.id_filme.length > 100){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_filme inválido]'   
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filmeGenero.id_genero <= 0 || isNaN(filmeGenero.id_genero) ||filmeGenero.id_genero == '' || filmeGenero.id_genero == undefined || filmeGenero.id_genero == null || filmeGenero.id_genero.length > 100){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_genero inválido]'   
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}


//retorna uma lista de todos os filmes
const listarFilmesGeneros = async () => {

    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
    
        //chama a função do DAO para retornar a lista de filmes do DB
        let resultFilmesGeneros = await filmeGeneroDAO.getSelectAllMoviesGenres()

        if(resultFilmesGeneros){
            if(resultFilmesGeneros.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes_generos = resultFilmesGeneros

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
const buscarFilmeGeneroId = async (id_filme_genero) => {
    
    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))


    try{
        
        //validação da chegada do ID
        if(!isNaN(id_filme_genero) && id_filme_genero != '' && id_filme_genero != null && id_filme_genero > 0){
            let resultFilmesGeneros = await filmeGeneroDAO.getSelectMoviesGenresById(Number(id_filme_genero))

            if(resultFilmesGeneros){
                if(resultFilmesGeneros.length > 0){

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_generos = resultFilmesGeneros

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
const inserirFilmeGenero = async (filmeGenero, contentType) => {

    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{

        //validação do tipo de conteudo da requisição (obrigatorio ser um json)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //chama funcao de validar todos os filmes
            let validar = await validarDadosFilmeGenero(filmeGenero)

            if(!validar){

                //processamento
                //chama a função para inserir um novo filme no DB
                let resultFilmesGeneros = await filmeGeneroDAO.setInsertMoviesGenres(filmeGenero)

                if (resultFilmesGeneros){
                    //chama a função para receber o ID gerado no DB
                    let lastID = await filmeGeneroDAO.getSelectLastId()
                    if(lastID){
                        //adiciona o ID no JSON com os dados do filme
                        filmeGenero.id = lastID
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items       = filmeGenero

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

//atualiza  um filme buscando pelo id
const atualizarFilmeGenero = async (filmeGenero, id_filme_genero, contentType) => {
  //criando um objeto novo para as mensagens
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{

        //validação do tipo de conteudo da requisição (obrigatorio ser um json)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){

                //chama funcao de validar todos os filmes
                let validar = await validarDadosFilmeGenero(filmeGenero)

                if(!validar){
   
                    //validação de ID válido, chama a função da controller que verifica no DB se o ID existe e valida o ID
                    let validarID = await buscarFilmeGeneroId(id_filme_genero)

                    if(validarID.status_code == 200){
                    
                        //adiciona o id do filme no json de dados para ser encaminhado ao DAO
                        filmeGenero.id_filme_genero = Number(id_filme_genero)

                        //chama a função para inserir um novo filme no DB
                        let resultFilmesGeneros = await filmeGeneroDAO.setUpdateMoviesGenres(filmeGenero)

                        if (resultFilmesGeneros){
                            MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATED_ITEM.status
                            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                            MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATED_ITEM.message
                            MESSAGES.DEFAULT_HEADER.items.filmeGenero = filmeGenero

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
// Função para excluir os gêneros de um filme (USADA NO UPDATE DO FILME)
const excluirFilmeGenero = async (id_filme_genero) => {
    
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        // Validação básica do ID
        if (!isNaN(id_filme_genero) && id_filme_genero != '' && id_filme_genero != null && id_filme_genero > 0) {

            let resultFilmesGeneros = await filmeGeneroDAO.setDeleteMoviesGenres(Number(id_filme_genero))

            if (resultFilmesGeneros) {
                MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                delete MESSAGES.DEFAULT_HEADER.items
                
                return MESSAGES.DEFAULT_HEADER // Sucesso
            } else {
                // Se a DAO retornar false (erro no banco)
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL 
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS 
        }

    } catch (error) {
        console.log("Erro na controller excluirFilmeGenero:", error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


//retornar generos filtrando pelo filme
const listarGenerosIdFilme = async (id_filme) => {
    
    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))


    try{
        
        //validação da chegada do ID
        if(!isNaN(id_filme) && id_filme != '' && id_filme != null && id_filme > 0){
            let resultFilmesGeneros = await filmeGeneroDAO.getSelectGenresByIdMovies(Number(id_filme))
            //console.log(resultFilmesGeneros)
            if(resultFilmesGeneros){
                if(resultFilmesGeneros.length > 0){

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_generos = resultFilmesGeneros

                    return MESSAGES.DEFAULT_HEADER

                } else {
                    //console.log(MESSAGES.ERROR_NOT_FOUND)
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

//retornar filmes filtrando pelo genero
const listarFilmesIdGenero = async (id_genero) => {
    
    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))


    try{
        
        //validação da chegada do ID
        if(!isNaN(id_genero) && id_genero != '' && id_genero != null && id_genero > 0){
            let resultFilmesGeneros = await filmeGeneroDAO.getSelectMoviesByIdGenres(Number(id_genero))

            if(resultFilmesGeneros){
                if(resultFilmesGeneros.length > 0){

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_generos = resultFilmesGeneros

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

module.exports = {
    listarFilmesGeneros,
    buscarFilmeGeneroId,
    inserirFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero,
    listarGenerosIdFilme,
    listarFilmesIdGenero
}
