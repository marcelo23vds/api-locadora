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

module.exports = {
    getSelectAllActors
}
