CREATE DATABASE db_locadora_filme_ds2m_25_2;

CREATE TABLE  tbl_filme (
    id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	sinopse TEXT NOT NULL,
	data_lancamento DATE NOT NULL,
	duracao TIME NOT NULL,
	orcamento DECIMAL NOT NULL,
	trailer VARCHAR(200) NOT NULL,
	capa VARCHAR(200) NOT NULL
);