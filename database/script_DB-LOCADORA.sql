CREATE DATABASE db_locadora_filme_ds2m_25_2;

USE db_locadora_filme_ds2m_25_2;

-- Criação da tabela de Filmes
CREATE TABLE tbl_filme (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sinopse TEXT NOT NULL,
    data_lancamento DATE NOT NULL,
    duracao TIME NOT NULL,
    orcamento DECIMAL(11,2) NOT NULL,
    trailer VARCHAR(200) NOT NULL,
    capa VARCHAR(200) NOT NULL
);

-- Criação da tabela de Diretores
CREATE TABLE tbl_diretor (
    id_diretor INT AUTO_INCREMENT PRIMARY KEY,
    nome_diretor VARCHAR(100) NOT NULL,
    data_nascimento DATE, -- Permite NULL conforme imagem
    nacionalidade VARCHAR(30) NOT NULL,
    biografia TEXT -- Permite NULL conforme imagem
);

-- Criação da tabela de Atores
CREATE TABLE tbl_ator (
    id_ator INT AUTO_INCREMENT PRIMARY KEY,
    nome_ator VARCHAR(100) NOT NULL,
    data_nascimento DATE,
    nacionalidade VARCHAR(30) NOT NULL,
    biografia TEXT
);

-- Criação da tabela de Roteiristas
CREATE TABLE tbl_roteirista (
    id_roteirista INT AUTO_INCREMENT PRIMARY KEY,
    nome_roteirista VARCHAR(100) NOT NULL,
    data_nascimento DATE,
    nacionalidade VARCHAR(30) NOT NULL,
    biografia TEXT
);

-- Criação da tabela de Gêneros
CREATE TABLE tbl_genero (
    id_genero INT AUTO_INCREMENT PRIMARY KEY,
    nome_genero VARCHAR(50) NOT NULL
);

-- Criação da tabela de classificação
CREATE TABLE tbl_classificacao (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    faixa_etaria VARCHAR(2) NOT NULL,
    id_filme INT NOT NULL,
    CONSTRAINT fk_classificacao_filme FOREIGN KEY (id_filme) 
        REFERENCES tbl_filme(id)
);

-- Relacionamento Diretor <-> Filme
CREATE TABLE tbl_diretor_filme (
    id_diretor_filme INT AUTO_INCREMENT PRIMARY KEY,
    id_diretor INT NOT NULL,
    id_filme INT NOT NULL,
    CONSTRAINT fk_diretor_filme_diretor FOREIGN KEY (id_diretor) 
        REFERENCES tbl_diretor(id_diretor),
    CONSTRAINT fk_diretor_filme_filme FOREIGN KEY (id_filme) 
        REFERENCES tbl_filme(id)
);

-- Relacionamento Ator <-> Filme
CREATE TABLE tbl_ator_filme (
    id_ator_filme INT AUTO_INCREMENT PRIMARY KEY,
    id_ator INT NOT NULL,
    id_filme INT NOT NULL,
    CONSTRAINT fk_ator_filme_ator FOREIGN KEY (id_ator) 
        REFERENCES tbl_ator(id_ator),
    CONSTRAINT fk_ator_filme_filme FOREIGN KEY (id_filme) 
        REFERENCES tbl_filme(id)
);

-- Relacionamento Roteirista <-> Filme
CREATE TABLE tbl_roteirista_filme (
    id_roteirista_filme INT AUTO_INCREMENT PRIMARY KEY,
    id_roteirista INT NOT NULL,
    id_filme INT NOT NULL,
    CONSTRAINT fk_roteirista_filme_roteirista FOREIGN KEY (id_roteirista) 
        REFERENCES tbl_roteirista(id_roteirista),
    CONSTRAINT fk_roteirista_filme_filme FOREIGN KEY (id_filme) 
        REFERENCES tbl_filme(id)
);

-- Relacionamento Filme <-> Gênero
CREATE TABLE tbl_filme_genero (
    id_filme_genero INT AUTO_INCREMENT PRIMARY KEY,
    id_filme INT NOT NULL,
    id_genero INT NOT NULL,
    CONSTRAINT fk_filme_genero_filme FOREIGN KEY (id_filme) 
        REFERENCES tbl_filme(id),
    CONSTRAINT fk_filme_genero_genero FOREIGN KEY (id_genero) 
        REFERENCES tbl_genero(id_genero)
);



-- CRIANDO O DELETE CASCADE PARA FACILITAR O DELETE DE FILMES

-- Tabela de Relacionamento FILME <-> GÊNERO
ALTER TABLE tbl_filme_genero DROP FOREIGN KEY fk_filme_genero_filme;

ALTER TABLE tbl_filme_genero 
ADD CONSTRAINT fk_filme_genero_filme 
FOREIGN KEY (id_filme) REFERENCES tbl_filme (id) 
ON DELETE CASCADE;

-- Tabela de Relacionamento FILME <-> ATOR
ALTER TABLE tbl_ator_filme DROP FOREIGN KEY fk_ator_filme_filme;

ALTER TABLE tbl_ator_filme 
ADD CONSTRAINT fk_ator_filme_filme 
FOREIGN KEY (id_filme) REFERENCES tbl_filme(id) 
ON DELETE CASCADE;

-- Tabela de Relacionamento FILME <-> DIRETOR
ALTER TABLE tbl_diretor_filme DROP FOREIGN KEY fk_diretor_filme_filme;

ALTER TABLE tbl_diretor_filme 
ADD CONSTRAINT fk_diretor_filme_filme 
FOREIGN KEY (id_filme) REFERENCES tbl_filme(id) 
ON DELETE CASCADE;

-- Tabela de Relacionamento FILME <-> ROTEIRISTA
ALTER TABLE tbl_roteirista_filme DROP FOREIGN KEY fk_roteirista_filme_filme;

ALTER TABLE tbl_roteirista_filme 
ADD CONSTRAINT fk_roteirista_filme_filme 
FOREIGN KEY (id_filme) REFERENCES tbl_filme(id) 
ON DELETE CASCADE;

-- Tabela de Classificação (Dependente)
ALTER TABLE tbl_classificacao DROP FOREIGN KEY fk_classificacao_filme;

ALTER TABLE tbl_classificacao 
ADD CONSTRAINT fk_classificacao_filme 
FOREIGN KEY (id_filme) REFERENCES tbl_filme(id) 
ON DELETE CASCADE;
