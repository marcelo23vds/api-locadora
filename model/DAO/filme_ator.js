/******************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente ao relacionamento entre filme e ator
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
******************************************************************************/

const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

//listar todos os filmes_atores
const getSelectAllMoviesActors = async () => {
    try {
        let sql = `SELECT * FROM tbl_ator_filme ORDER BY id_ator_filme DESC`
        let result = await prisma.$queryRawUnsafe(sql) 
        if(Array.isArray(result)) return result
        else return false
    } catch (error) {
        return false
    }
}

//buscar os filmes_atores pelo ID
const getSelectMoviesActorsById = async (id_ator_filme) => {
    try {
        let sql = `SELECT * FROM tbl_ator_filme WHERE id_ator_filme=${id_ator_filme}`
        let result = await prisma.$queryRawUnsafe(sql) 
        if(Array.isArray(result)) return result
        else return false
    } catch (error) {
        return false
    }
}

//retorna uma lista de atores filtrando pelo ID do filme
const getSelectActorsByIdMovie = async (id_filme) => {
    try {
        let sql = `select tbl_ator.id_ator, tbl_ator.nome_ator 
                    from tbl_filme 
                        inner join tbl_ator_filme
                            on tbl_filme.id = tbl_ator_filme.id_filme
                        inner join tbl_ator
                            on tbl_ator.id_ator = tbl_ator_filme.id_ator
                    where tbl_filme.id = ${id_filme}`

        let result = await prisma.$queryRawUnsafe(sql) 
        if(Array.isArray(result)) return result
        else return false
    } catch (error) {
        return false
    }
}

//retorna uma lista de filmes filtrando pelo ID do ator
const getSelectMoviesByIdActor = async (id_ator) => {
    try {
        let sql = `select tbl_filme.id, tbl_filme.nome 
                    from tbl_filme 
                        inner join tbl_ator_filme
                            on tbl_filme.id = tbl_ator_filme.id_filme
                        inner join tbl_ator
                            on tbl_ator.id_ator = tbl_ator_filme.id_ator
                    where tbl_ator.id_ator = ${id_ator}`

        let result = await prisma.$queryRawUnsafe(sql) 
        if(Array.isArray(result)) return result
        else return false
    } catch (error) {
        return false
    }
}

//retornar o ultimo id
const getSelectLastId = async () => {
    try {
        let sql = `select id_ator_filme from tbl_ator_filme order by id_ator_filme desc limit 1;`
        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)) return Number(result[0].id_ator_filme)
        else return false
    } catch (error) {
        return false
    }
}

//insere novo
const setInsertMoviesActors = async (filmeAtor) => {
    try {
        let sql = `INSERT INTO tbl_ator_filme (id_filme, id_ator) 
                values( ${filmeAtor.id_filme}, ${filmeAtor.id_ator})`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result) return true
        else return false
    } catch (error){
        return false
    }
}

//altera
const setUpdateMoviesActors = async (filmeAtor) => {
    try {
        let sql = `UPDATE tbl_ator_filme SET 
                id_filme = '${filmeAtor.id_filme}',
                id_ator = '${filmeAtor.id_ator}'
            WHERE id_ator_filme = ${filmeAtor.id_ator_filme}`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result) return true
        else return false
    } catch (error){
        return false
    }
}

//exclui atores pelo ID do filme (Limpeza para update)
const setDeleteMoviesActors = async (id_filme) => {
    try {
        let sql = `DELETE FROM tbl_ator_filme WHERE id_filme = ${id_filme}`
        
        // ExecuteRawUnsafe retorna numero de linhas, nao array
        let result = await prisma.$executeRawUnsafe(sql)
        if(result !== null && result !== undefined) return true
        else return false
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllMoviesActors,
    getSelectMoviesActorsById,
    getSelectActorsByIdMovie,
    getSelectMoviesByIdActor,
    getSelectLastId,
    setInsertMoviesActors,
    setUpdateMoviesActors,
    setDeleteMoviesActors
}