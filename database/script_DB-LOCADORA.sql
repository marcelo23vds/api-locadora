--criar o banco de dados
CREATE DATABASE db_locadora_filme_ds2m_25_2;

--acessar o banco de dados
USE db_locadora_filme_ds2m_25_2;

--criar uma tabela no banco de dados
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

--inserir dados na tabela
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

INSERT INTO tbl_filme ( nome,
						sinopse,
                        data_lancamento,
                        duracao,
                        orcamento,
                        trailer,
                        capa)
					values( 'Rambo - Programado para Matar',
							'Rambo: Programado Para Matar é um intenso drama de ação que segue John Rambo (Sylvester Stallone), um veterano da Guerra do Vietnã que, após ser injustamente preso pelo xerife Will Teasle (Brian Dennehy) em uma pequena cidade, foge e inicia uma luta sangrenta contra a autoridade local. No processo, Rambo, habilidoso e implacável, não apenas confronta Teasle, mas enfrenta toda a cidade, provocando pânico e destruição enquanto tenta escapar de uma armadilha mortal. O filme é um retrato de um homem em guerra com seus próprios demônios, enquanto lida com a brutalidade de um sistema que não o compreende. A história de Rambo se tornou um clássico do cinema, explorando temas de sobrevivência, trauma de guerra e a resistência contra a opressão.',
                            '1982-11-06',
                            '01:37:00',
                            15000000,
                            'https://www.youtube.com/watch?v=Rl_4vPKDijQ',
                            'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/97/40/18/20527154.jpg');                           

--verificar os dados da tabela
select * from tbl_filme;