/******************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente ao relacionamento entre filme e diretor
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
******************************************************************************/

const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

//listar todos
const getSelectAllMoviesDirectors = async () => {
    try {
        let sql = `SELECT * FROM tbl_diretor_filme ORDER BY id_diretor_filme DESC`
        let result = await prisma.$queryRawUnsafe(sql) 
        if(Array.isArray(result)) return result
        else return false
    } catch (error) {
        return false
    }
}

//buscar pelo ID
const getSelectMoviesDirectorsById = async (id_diretor_filme) => {
    try {
        let sql = `SELECT * FROM tbl_diretor_filme WHERE id_diretor_filme=${id_diretor_filme}`
        let result = await prisma.$queryRawUnsafe(sql) 
        if(Array.isArray(result)) return result
        else return false
    } catch (error) {
        return false
    }
}

//retorna uma lista de diretores filtrando pelo ID do filme
const getSelectDirectorsByIdMovie = async (id_filme) => {
    try {
        let sql = `select tbl_diretor.id_diretor, tbl_diretor.nome_diretor 
                    from tbl_filme 
                        inner join tbl_diretor_filme
                            on tbl_filme.id = tbl_diretor_filme.id_filme
                        inner join tbl_diretor
                            on tbl_diretor.id_diretor = tbl_diretor_filme.id_diretor
                    where tbl_filme.id = ${id_filme}`

        let result = await prisma.$queryRawUnsafe(sql) 
        if(Array.isArray(result)) return result
        else return false
    } catch (error) {
        return false
    }
}

//retorna uma lista de filmes filtrando pelo ID do diretor
const getSelectMoviesByIdDirector = async (id_diretor) => {
    try {
        let sql = `select tbl_filme.id, tbl_filme.nome 
                    from tbl_filme 
                        inner join tbl_diretor_filme
                            on tbl_filme.id = tbl_diretor_filme.id_filme
                        inner join tbl_diretor
                            on tbl_diretor.id_diretor = tbl_diretor_filme.id_diretor
                    where tbl_diretor.id_diretor = ${id_diretor}`

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
        let sql = `select id_diretor_filme from tbl_diretor_filme order by id_diretor_filme desc limit 1;`
        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)) return Number(result[0].id_diretor_filme)
        else return false
    } catch (error) {
        return false
    }
}

//insere novo
const setInsertMoviesDirectors = async (filmeDiretor) => {
    try {
        let sql = `INSERT INTO tbl_diretor_filme (id_filme, id_diretor) 
                values( ${filmeDiretor.id_filme}, ${filmeDiretor.id_diretor})`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result) return true
        else return false
    } catch (error){
        return false
    }
}

//altera
const setUpdateMoviesDirectors = async (filmeDiretor) => {
    try {
        let sql = `UPDATE tbl_diretor_filme SET 
                id_filme = '${filmeDiretor.id_filme}',
                id_diretor = '${filmeDiretor.id_diretor}'
            WHERE id_diretor_filme = ${filmeDiretor.id_diretor_filme}`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result) return true
        else return false
    } catch (error){
        return false
    }
}

//exclui diretores pelo ID do filme (Limpeza para update)
const setDeleteMoviesDirectors = async (id_filme) => {
    try {
        let sql = `DELETE FROM tbl_diretor_filme WHERE id_filme = ${id_filme}`
        
        let result = await prisma.$executeRawUnsafe(sql)
        if(result !== null && result !== undefined) return true
        else return false
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllMoviesDirectors,
    getSelectMoviesDirectorsById,
    getSelectDirectorsByIdMovie,
    getSelectMoviesByIdDirector,
    getSelectLastId,
    setInsertMoviesDirectors,
    setUpdateMoviesDirectors,
    setDeleteMoviesDirectors
}