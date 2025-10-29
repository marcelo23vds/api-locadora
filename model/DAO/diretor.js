/******************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente ao diretor
* Data: 29/10/2025
* Autor: Marcelo Vieira
* Versão: 1.0
******************************************************************************/

//import da dependencia do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

//cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()


//listar todos os diretores de filme
const getSelectAllDirectors = async () => {
    try {
        //script SQL
        let sql = `SELECT * FROM tbl_diretor ORDER BY id_diretor DESC`

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

//buscar os diretores pelo ID
const getSelectDirectorsById = async (id_diretor) => {
    try {
        //script SQL
        let sql = `SELECT * FROM tbl_diretor WHERE id_diretor=${id_diretor}`

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

//retornar o ultimo diretor adicionado
//sera utilizado para aparecer quando um diretor for adicionado
const getSelectLastId = async () => {
    try {
        //script sql para retornar apenas o ultimo ID do DB
        let sql = `select id_diretor from tbl_diretor order by id_diretor desc limit 1;`

        //encaminha para o DB o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id_diretor)
        else
            return false

    } catch (error) {
        return false
    }
}

//insere um diretor novo no banco de dados
const setInsertDirectors = async (diretor) => {
    try {
        
        let sql = `INSERT INTO tbl_diretor ( nome_diretor,
                        data_nascimento,
                        nacionalidade,
                        biografia)
                    values( '${diretor.nome_diretor}',
                            '${diretor.data_nascimento}',
                            '${diretor.nacionalidade}',
                            '${diretor.biografia}')`

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

//altera um diretor pelo ID no banco de dados
const setUpdateDirectors = async (diretor) => {
    try {
        
        let sql = `UPDATE tbl_diretor SET
                        nome_diretor    = '${diretor.nome_diretor}',
                        data_nascimento = '${diretor.data_nascimento}',
                        nacionalidade   = '${diretor.nacionalidade}',
                        biografia       = '${diretor.biografia}'
                    WHERE id_diretor = ${diretor.id_diretor}`

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

//exclui um diretor pelo ID no banco de dados
const setDeleteDirectors = async (id_diretor) => {
    try {
        //Script SQL
        let sql = `DELETE FROM tbl_diretor WHERE id_diretor=${id_diretor}`
        
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
    getSelectAllDirectors,
    getSelectDirectorsById,
    getSelectLastId,
    setInsertDirectors,
    setUpdateDirectors,
    setDeleteDirectors
}
