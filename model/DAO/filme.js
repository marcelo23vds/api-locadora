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

                npm install prisma --save           -> instalar o prisma (conexão com o DataBase)
                npm install @prisma/client --save   -> instalar o cliente do prisma (executar scripts SQL no DB)
                npx prisma init                     -> prompt de comando para inicializar o prisma
                npx prisma migrate dev              -> realiza o sincronismo entre o prisma e o DB (CUIDADO,
                                                    nesse processo você poderá perder dados reais do DB, pois
                                                    ele pega e cria as tabelas programadas no ORM schema.prisma)
                npx prisma generate                 -> apenas realiza o sincronismo entre o prisma e o DB, geralmente
                                                    usamos para rodar o projeto em um PC novo

        Knex      -> é uma dependencia atual que trabalha com MySQL

    Banco de Dados não relacional:

        Mongoose  -> é uma dependencia para o Mongo DB (Não relacional)

*/

//import da dependencia do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

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

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        //console.log(error)
        return false
    }

}

//retorna uma lista de todos os filmes do banco de dados
const getSelectMoviesById = async (id) => {

    try {
        //script SQL
        let sql = `select * from tbl_filme where id=${id}`

        //encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql) 

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        //console.log(error)
        return false
    }

}

//insere um filme novo no banco de dados
const setInsertMovies = async (filme) => {
    try {
        
        let sql = `INSERT INTO tbl_filme ( nome,
						sinopse,
                        data_lancamento,
                        duracao,
                        orcamento,
                        trailer,
                        capa)
					values( '${filme.nome}',
							'${filme.sinopse}',
                            '${filme.data_lancamento}',
                            '${filme.duracao}',
                            '${filme.orcamento}',
                            '${filme.trailer}',
                            '${filme.capa}')`

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

//altera um filme pelo ID no banco de dados
const setUpdateMovies = async (filme) => {
    try {
        
        let sql = `UPDATE tbl_filme SET
                        nome            = '${filme.nome}',
						sinopse         = '${filme.sinopse}',
                        data_lancamento = '${filme.data_lancamento}',
                        duracao         = '${filme.duracao}',
                        orcamento       = '${filme.orcamento}',
                        trailer         = '${filme.trailer}',
                        capa            = '${filme.capa}'
                        
                    WHERE id = ${filme.id}`

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

//exclui um filme pelo ID no banco de dados
const setDeleteMovies = async (id) => {

    try {
        //script SQL
        let sql = `DELETE from tbl_filme where id=${id}`

        //encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql) 

        return result

    } catch (error) {
        //console.log(error)
        return false
    }

}

module.exports = {
    getSelectAllMovies,
    getSelectMoviesById,
    setInsertMovies,
    setUpdateMovies,
    setDeleteMovies
}