/******************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente ao genero
* Data: 22/10/2025
* Autor: Marcelo Vieira
* Versão: 1.0
******************************************************************************/

//import da dependencia do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

//cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//listar todos os generos de filme
const getSelectAllGenres = async () => {
    try {
        //script SQL
        let sql = `SELECT * FROM tbl_genero ORDER BY id_genero DESC`

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

//buscar os generos de filme pelo ID
const getSelectGenresById = async (id_genero) => {
    try {
        //script SQL
        let sql = `SELECT * FROM tbl_genero WHERE id_genero=${id_genero}`

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

//retornar o ultimo genero adicionado
//sera utilizado para aparecer quando um genero for adicionado
const getSelectLastId = async () => {
    try {
        //script sql para retornar apenas o ultimo ID do DB
        let sql = `select id_genero from tbl_genero order by id_genero desc limit 1;`

        //encaminha para o DB o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id_genero)
        else
            return false

    } catch (error) {
        return false
    }
}

//insere um genero novo no banco de dados
const setInsertGenres = async (genero) => {
    try {
        
        let sql = `INSERT INTO tbl_genero (nome_genero) values( '${genero.nome_genero}')`

        //executeRawUnsafe() -> executa o script SQL que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error){
        return false
    }
}

//altera um genero pelo ID no banco de dados
const setUpdateGenres = async (genero) => {
    try {
        
        let sql = `UPDATE tbl_genero SET nome_genero = '${genero.nome_genero}' WHERE id_genero = ${genero.id_genero}`

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

//exclui um genero pelo ID no banco de dados
const setDeleteGenres = async (id_genero) => {
    try {
        //Script SQL
        let sql = `DELETE FROM tbl_genero WHERE id_genero=${id_genero}`
        
        //Encaminha para o BD o srcipt SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllGenres,
    getSelectGenresById,
    getSelectLastId,
    setInsertGenres,
    setUpdateGenres,
    setDeleteGenres
}