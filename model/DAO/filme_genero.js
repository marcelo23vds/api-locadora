/******************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente ao relacionamento entre filme e genero
* Data: 05/11/2025
* Autor: Marcelo Vieira
* Versão: 1.0
******************************************************************************/

//import da dependencia do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

//cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//listar todos os filmes_generos
const getSelectAllMoviesGenres = async () => {
    try {
        //script SQL
        let sql = `SELECT * FROM tbl_filme_genero ORDER BY id_filme_genero DESC`

        //encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql) 

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }

}

//buscar os filmes_generos pelo ID
const getSelectMoviesGenresById = async (id_filme_genero) => {
    try {
        //script SQL
        let sql = `SELECT * FROM tbl_filme_genero WHERE id_filme_genero=${id_filme_genero}`

        //encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql) 

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//retorna uma lista de generos filtrando pelo ID do filme(fk)
const getSelectGenresByIdMovies = async (id_filme) => {
    try {
        //script SQL
        let sql = `select tbl_genero.id_genero, tbl_genero.nome_genero 
                    from tbl_filme 
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id_genero = tbl_filme_genero.id_genero
                    where tbl_filme.id = ${id_filme}`

        //encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql) 

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//retorna uma lista de filmes filtrando pelo ID do genero(fk)
const getSelectMoviesByIdGenres = async (id_genero) => {
    try {
        //script SQL
        let sql = `select tbl_filme.id, tbl_filme.nome 
                    from tbl_filme 
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id_genero = tbl_filme_genero.id_genero
                    where tbl_genero.id_genero = ${id_genero}`

        //encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql) 

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//retornar o ultimo filmes_generos adicionado
//sera utilizado para aparecer quando um genero for adicionado
const getSelectLastId = async () => {
    try {
        //script sql para retornar apenas o ultimo ID do DB
        let sql = `select id_filme_genero from tbl_filme_genero order by id_filme_genero desc limit 1;`

        //encaminha para o DB o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id_filme_genero)
        else
            return false

    } catch (error) {
        return false
    }
}

//insere um filmes_generos novo no banco de dados
const setInsertMoviesGenres = async (filmeGenero) => {
    try {
        
        let sql = `INSERT INTO tbl_filme_genero (id_filme, id_genero) 
                values( ${filmeGenero.id_filme}, ${filmeGenero.id_genero})`

        //executeRawUnsafe() -> executa o script SQL que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error){
        console.log(error)
        return false
    }
}

//altera um filmes_generos pelo ID no banco de dados
const setUpdateMoviesGenres = async (filmeGenero) => {
    try {
        
        let sql = `UPDATE tbl_filme_genero SET 
                id_filme = '${filmeGenero.id_filme}',
                id_genero = '${filmeGenero.id_genero}'
            WHERE id_filme_genero = ${filmeGenero.id_filme_genero}`

        //executeRawUnsafe() -> executa o script SQL que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error){
        console.log(error)
        return false
    }
}

//exclui um filmes_generos pelo ID no banco de dados
const setDeleteMoviesGenres = async (id_filme) => {
    try {
        //Script SQL
        let sql = `DELETE FROM tbl_filme_genero WHERE id_filme = ${id_filme}`
        
        //Encaminha para o BD o srcipt SQL
        let result = await prisma.$executeRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllMoviesGenres,
    getSelectMoviesGenresById,
    getSelectGenresByIdMovies,
    getSelectMoviesByIdGenres,
    getSelectLastId,
    setInsertMoviesGenres,
    setUpdateMoviesGenres,
    setDeleteMoviesGenres
}