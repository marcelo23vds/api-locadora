/******************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente ao filme
* Data: 01/10/2025
* Autor: Marcelo Vieira
* Versão: 1.0
******************************************************************************/

/*
    Exemplos de dependencias para conexão com o BD

    Banco de Dados relacionais:

        Sequelize -> foi utilizado em muitos projetos desde o inicio do node
        Prisma    -> é uma dependencia atual que trabalha com BD (MySQL, PostgreSQL, SQL Server) (SQL ou ORM)
        Knex      -> é uma dependencia atual que trabalha com MySQL

    Banco de Dados não relacional:

        Mongoose  -> é uma dependencia para o Mongo DB (Não relacional)

*/

//import da dependencia do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('@prisma/client')

//cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//$queryRawUnsafe() -> permite executar um script SQL de uma variavel e que retorna valores do banco (SELECT)
//$executeRawUnsafe() -> permite executar um script SQL de uma variavel e que NÃO retorna valores do banco (INSERT, UPDATE e DELETE)
//$queryRaw() -> permite executar um script SQL SEM estar em uma variavel e que retorna valores do banco (SELECT) e faz tratamentos de segurança contra SQL Injection
//$executeRaw() -> permite executar um script SQL SEM estar em uma variavel e que NÃO retorna valores do banco (INSERT, UPDATE e DELETE) e faz tratamentos de segurança contra SQL Injection

//retorna uma lista de todos os filmes do banco de dados
const getSelectAllMovies = async () => {

    try {
        //script SQL
        let sql = `select * from tbl_filme order by id desc`

        //encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql) 

        if(result.length > 0)
            return result
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }

}

//retorna uma lista de todos os filmes do banco de dados
const getSelectMoviesById = async (id) => {

}

//insere um filme novo no banco de dados
const setInsertMovies = async () => {

}

//altera um filme pelo ID no banco de dados
const setUpdateMovies = async (id) => {

}

//exclui um filme pelo ID no banco de dados
const setDeleteMovies = async (id) => {

}

module.exports = {
    getSelectAllMovies
}