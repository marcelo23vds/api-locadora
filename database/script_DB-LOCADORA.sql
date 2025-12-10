CREATE DATABASE db_locadora_filme_ds2m_25_2;

USE db_locadora_filme_ds2m_25_2;

-- Criação da tabela de Classificação (É A PRIMEIRA, POIS É INDEPENDENTE)
CREATE TABLE tbl_classificacao (
    id_classificacao INT AUTO_INCREMENT PRIMARY KEY,
    faixa_etaria VARCHAR(2) NOT NULL,
    descricao VARCHAR(50) NOT NULL
);

-- Inserção dos dados padrão de classificação
INSERT INTO tbl_classificacao (faixa_etaria, descricao) VALUES 
('L', 'Livre para todos os públicos'),
('10', 'Não recomendado para menores de 10 anos'),
('12', 'Não recomendado para menores de 12 anos'),
('14', 'Não recomendado para menores de 14 anos'),
('16', 'Não recomendado para menores de 16 anos'),
('18', 'Não recomendado para menores de 18 anos');

-- Criação da tabela de Filmes (COM A FK DE CLASSIFICAÇÃO)
CREATE TABLE tbl_filme (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sinopse TEXT NOT NULL,
    data_lancamento DATE NOT NULL,
    duracao TIME NOT NULL,
    orcamento DECIMAL(11,2) NOT NULL,
    trailer VARCHAR(200) NOT NULL,
    capa VARCHAR(200) NOT NULL,
    id_classificacao INT NOT NULL, -- Nova coluna FK
    CONSTRAINT fk_filme_classificacao FOREIGN KEY (id_classificacao)
        REFERENCES tbl_classificacao(id_classificacao)
);

-- Tabelas Independentes (Atores, Diretores, Roteiristas, Gêneros)
CREATE TABLE tbl_diretor (
    id_diretor INT AUTO_INCREMENT PRIMARY KEY,
    nome_diretor VARCHAR(100) NOT NULL,
    data_nascimento DATE,
    nacionalidade VARCHAR(30) NOT NULL,
    biografia TEXT
);

CREATE TABLE tbl_ator (
    id_ator INT AUTO_INCREMENT PRIMARY KEY,
    nome_ator VARCHAR(100) NOT NULL,
    data_nascimento DATE,
    nacionalidade VARCHAR(30) NOT NULL,
    biografia TEXT
);

CREATE TABLE tbl_roteirista (
    id_roteirista INT AUTO_INCREMENT PRIMARY KEY,
    nome_roteirista VARCHAR(100) NOT NULL,
    data_nascimento DATE,
    nacionalidade VARCHAR(30) NOT NULL,
    biografia TEXT
);

CREATE TABLE tbl_genero (
    id_genero INT AUTO_INCREMENT PRIMARY KEY,
    nome_genero VARCHAR(50) NOT NULL
);

-- Tabelas de Relacionamento (JÁ COM ON DELETE CASCADE)

-- Relacionamento Diretor <-> Filme
CREATE TABLE tbl_diretor_filme (
    id_diretor_filme INT AUTO_INCREMENT PRIMARY KEY,
    id_diretor INT NOT NULL,
    id_filme INT NOT NULL,
    CONSTRAINT fk_diretor_filme_diretor FOREIGN KEY (id_diretor) 
        REFERENCES tbl_diretor(id_diretor),
    CONSTRAINT fk_diretor_filme_filme FOREIGN KEY (id_filme) 
        REFERENCES tbl_filme(id)
        ON DELETE CASCADE -- Se apagar o filme, apaga aqui automático
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
        ON DELETE CASCADE -- Se apagar o filme, apaga aqui automático
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
        ON DELETE CASCADE -- Se apagar o filme, apaga aqui automático
);

-- Relacionamento Filme <-> Gênero
CREATE TABLE tbl_filme_genero (
    id_filme_genero INT AUTO_INCREMENT PRIMARY KEY,
    id_filme INT NOT NULL,
    id_genero INT NOT NULL,
    CONSTRAINT fk_filme_genero_filme FOREIGN KEY (id_filme) 
        REFERENCES tbl_filme(id)
        ON DELETE CASCADE, -- Se apagar o filme, apaga aqui automático
    CONSTRAINT fk_filme_genero_genero FOREIGN KEY (id_genero) 
        REFERENCES tbl_genero(id_genero)
);