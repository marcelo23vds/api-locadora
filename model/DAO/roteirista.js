/******************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente ao roteirista
* Data: 03/11/2025
* Autor: Marcelo Vieira
* Versão: 1.0
******************************************************************************/

//import da dependencia do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

//cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()


//listar todos os roteiristas de filme
const getSelectAllScreenwriters = async () => {
    try {
        //script SQL
        let sql = `SELECT * FROM tbl_roteirista ORDER BY id_roteirista DESC`

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

//buscar os roteiristas pelo ID
const getSelectScreenwritersById = async (id_roteirista) => {
    try {
        //script SQL
        let sql = `SELECT * FROM tbl_roteirista WHERE id_roteirista=${id_roteirista}`

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

//retornar o ultimo roteirista adicionado
//sera utilizado para aparecer quando um roteirista for adicionado
const getSelectLastId = async () => {
    try {
        //script sql para retornar apenas o ultimo ID do DB
        let sql = `select id_roteirista from tbl_roteirista order by id_roteirista desc limit 1;`

        //encaminha para o DB o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id_roteirista)
        else
            return false

    } catch (error) {
        return false
    }
}

//insere um roteirista novo no banco de dados
const setInsertScreenwriters = async (roteirista) => {
    try {
        
        let sql = `INSERT INTO tbl_roteirista ( nome_roteirista,
                        data_nascimento,
                        nacionalidade,
                        biografia)
                    values( '${roteirista.nome_roteirista}',
                            '${roteirista.data_nascimento}',
                            '${roteirista.nacionalidade}',
                            '${roteirista.biografia}')`

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

//altera um roteirista pelo ID no banco de dados
const setUpdateScreenwriters = async (roteirista) => {
    try {
        
        let sql = `UPDATE tbl_roteirista SET
                        nome_roteirista    = '${roteirista.nome_roteirista}',
                        data_nascimento = '${roteirista.data_nascimento}',
                        nacionalidade   = '${roteirista.nacionalidade}',
                        biografia       = '${roteirista.biografia}'
                    WHERE id_roteirista = ${roteirista.id_roteirista}`

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

//exclui um roteirista pelo ID no banco de dados
const setDeleteScreenwriters = async (id_roteirista) => {
    try {
        //Script SQL
        let sql = `DELETE FROM tbl_roteirista WHERE id_roteirista=${id_roteirista}`
        
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
    getSelectAllScreenwriters,
    getSelectScreenwritersById,
    getSelectLastId,
    setInsertScreenwriters,
    setUpdateScreenwriters,
    setDeleteScreenwriters
}
