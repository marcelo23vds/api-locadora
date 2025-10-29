/******************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente ao ator
* Data: 22/10/2025
* Autor: Marcelo Vieira
* Versão: 1.0
******************************************************************************/

//import da dependencia do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

//cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//listar todos os generos de filme
const getSelectAllActors = async () => {
    try {
        //script SQL
        let sql = `SELECT * FROM tbl_ator ORDER BY id_ator DESC`

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

//buscar os atores pelo ID
const getSelectActorsById = async (id_ator) => {
    try {
        //script SQL
        let sql = `SELECT * FROM tbl_ator WHERE id_ator=${id_ator}`

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

//retornar o ultimo ator adicionado
//sera utilizado para aparecer quando um ator for adicionado
const getSelectLastId = async () => {
    try {
        //script sql para retornar apenas o ultimo ID do DB
        let sql = `select id_ator from tbl_ator order by id_ator desc limit 1;`

        //encaminha para o DB o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id_ator)
        else
            return false

    } catch (error) {
        return false
    }
}

//insere um ator novo no banco de dados
const setInsertActors = async (ator) => {
    try {
        
        let sql = `INSERT INTO tbl_ator ( nome_ator,
						data_nascimento,
                        nacionalidade,
                        biografia)
					values( '${ator.nome_ator}',
							'${ator.data_nascimento}',
                            '${ator.nacionalidade}',
                            '${ator.biografia}')`

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

//altera um ator pelo ID no banco de dados
const setUpdateActors = async (ator) => {
    try {
        
        let sql = `UPDATE tbl_ator SET
                        nome_ator       = '${ator.nome_ator}',
						data_nascimento = '${ator.data_nascimento}',
                        nacionalidade   = '${ator.nacionalidade}',
                        biografia       = '${ator.biografia}'
                    WHERE id_ator = ${ator.id_ator}`

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

//exclui um ator pelo ID no banco de dados
const setDeleteActors = async (id_ator) => {
    try {
        //Script SQL
        let sql = `DELETE FROM tbl_ator WHERE id_ator=${id_ator}`
        
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
    getSelectAllActors,
    getSelectActorsById,
    getSelectLastId,
    setInsertActors,
    setUpdateActors,
    setDeleteActors
}
