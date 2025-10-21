-- criar o banco de dados
CREATE DATABASE db_locadora_filme_ds2m_25_2;

-- acessar o banco de dados
USE db_locadora_filme_ds2m_25_2;

-- criar uma tabela no banco de dados
CREATE TABLE  tbl_filme (
    id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	sinopse TEXT,
	data_lancamento DATE,
	duracao TIME NOT NULL,
	orcamento DECIMAL(11,2) NOT NULL,
	trailer VARCHAR(200),
	capa VARCHAR(200) NOT NULL
);

-- inserir dados na tabela
INSERT INTO tbl_filme ( nome,
						sinopse,
                        data_lancamento,
                        duracao,
                        orcamento,
                        trailer,
                        capa)
					values( 'Bastardos Inglórios',
							'Em Bastardos Inglórios, na Segunda Guerra Mundial, a França está ocupada pelos nazistas. O tenente Aldo Raine (Brad Pitt) é o encarregado de reunir um pelotão de soldados de origem judaica, com o objetivo de realizar uma missão suicida contra os alemães. O objetivo é matar o maior número possível de nazistas, da forma mais cruel possível. Paralelamente Shosanna Dreyfuss (Mélanie Laurent) assiste a execução de sua família pelas mãos do coronel Hans Landa (Christoph Waltz), o que faz com que fuja para Paris. Lá ela se disfarça como operadora e dona de um cinema local, enquanto planeja um meio de se vingar.',
                            '2009-10-09',
                            '02:33:00',
                            70000000,
                            'https://economia.uol.com.br/videos/?id=trailer-do-filme-bastardos-inglorios-04023060DCB15346',
                            'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/43/36/20096333.jpg');                        

-- verificar os dados da tabela
select * from tbl_filme;

-- verificar apenas o ultimo filme adicionado na tabela
select id from tbl_filme order by id desc limit 1;
