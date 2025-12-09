/* *********************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente a classificacao
* Data: 08/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

//listar todas as classificações
const getSelectAllClassificacao = async () => { // Nome da função alterado
    try {
        // Tabela alterada para tbl_classificacao e ordenação por id_avaliacao
        let sql = `SELECT * FROM tbl_classificacao ORDER BY id_avaliacao DESC`

        let result = await prisma.$queryRawUnsafe(sql) 

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }

}

//buscar a classificacao pelo ID
const getSelectClassificacaoById = async (id_avaliacao) => { // Parâmetro alterado para id_avaliacao
    try {
        // Tabela e ID alterados
        let sql = `SELECT * FROM tbl_classificacao WHERE id_avaliacao=${id_avaliacao}`

        let result = await prisma.$queryRawUnsafe(sql) 

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//retornar o ultimo ID adicionado
const getSelectLastId = async () => {
    try {
        // Tabela e ID alterados
        let sql = `select id_avaliacao from tbl_classificacao order by id_avaliacao desc limit 1;`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id_avaliacao) // Campo alterado
        else
            return false

    } catch (error) {
        return false
    }
}

//insere uma classificacao nova
const setInsertClassificacao = async (classificacao) => { // Parâmetro alterado
    try {
        // Adicionado o campo id_filme e faixa_etaria no Insert
        let sql = `INSERT INTO tbl_classificacao (faixa_etaria, id_filme) values('${classificacao.faixa_etaria}', ${classificacao.id_filme})`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error){
        return false
    }
}

//altera uma classificacao pelo ID
const setUpdateClassificacao = async (classificacao) => { // Parâmetro alterado
    try {
        // Update alterado para faixa_etaria e WHERE id_avaliacao
        let sql = `UPDATE tbl_classificacao SET faixa_etaria = '${classificacao.faixa_etaria}' WHERE id_avaliacao = ${classificacao.id_avaliacao}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error){
        return false
    }
}

//exclui uma classificacao pelo ID
const setDeleteClassificacao = async (id_avaliacao) => { // Parâmetro alterado
    try {
        // Tabela e ID alterados
        let sql = `DELETE FROM tbl_classificacao WHERE id_avaliacao=${id_avaliacao}`
        
        // Alterado para executeRawUnsafe para corrigir o erro de retorno do Delete
        let result = await prisma.$executeRawUnsafe(sql)

        // Validação ajustada para executeRawUnsafe
        if(result !== null && result !== undefined)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllClassificacao,
    getSelectClassificacaoById,
    getSelectLastId,
    setInsertClassificacao,
    setUpdateClassificacao,
    setDeleteClassificacao
}