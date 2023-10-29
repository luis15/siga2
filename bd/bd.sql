

set transaction read write; 
-- Criação da tabela "alunos"
CREATE TABLE alunos (
  id serial PRIMARY KEY,
  ra varchar(20) NOT NULL,
  senha varchar(255) NOT NULL,
  nome varchar(80) NOT NULL,
  dataMatricula date NOT NULL,
  cpf varchar(20) NOT NULL,
  endereco varchar(255) NOT NULL
);

-- Inserção de dados na tabela "alunos"
INSERT INTO alunos (ra, senha, nome, dataMatricula, cpf, endereco)
VALUES
  ('2023001', 'senha123', 'João da Silva', '2023-08-05', '123.456.789-00', 'Rua A, 123'),
  ('2023002', 'abcd987', 'Maria Souza', '2023-08-05', '987.654.321-00', 'Avenida B, 456');

-- Consulta na tabela "alunos"
SELECT * FROM alunos;
SELECT * FROM alunos WHERE id = 1;

-- Atualização de um registro na tabela "alunos"
UPDATE alunos SET endereco = 'Rua B, 456' WHERE id = 1;

-- Criação da tabela "funcionários"
CREATE TABLE funcionarios (
  id serial PRIMARY KEY,
  email varchar(80) NOT NULL,
  senha varchar(255) NOT NULL,
  nome varchar(80) NOT NULL,
  cpf varchar(20) NOT NULL,
  endereco varchar(255) NOT NULL,
  tipo char(1) NOT NULL
);

-- Inserção de dados na tabela "funcionários"
INSERT INTO funcionarios (email, senha, nome, cpf, endereco, tipo)
VALUES
  ('joao@example.com', 'func123', 'João Professor', '111.222.333-00', 'Rua X, 789', 'P'),
  ('maria@example.com', 'abc123', 'Maria Secretária', '444.555.666-00', 'Avenida Y, 012', 'S'),
  ('jose@example.com', 'xyz987', 'José Administrador', '777.888.999-00', 'Estrada Z, 345', 'A');

-- Consulta na tabela "funcionários"
SELECT * FROM funcionarios;
SELECT * FROM funcionarios WHERE tipo = 'P';
SELECT * FROM funcionarios WHERE id = 2;

-- Atualização de um registro na tabela "funcionários"
UPDATE funcionarios SET endereco = 'Avenida F, 789' WHERE id = 3;

-- Criação da tabela "disciplinas"
CREATE TABLE disciplinas (
  id serial PRIMARY KEY,
  nome varchar(80) NOT NULL,
  ementa varchar(255) NOT NULL,
  codigoProfessor int REFERENCES funcionarios(id)
);

-- Inserção de dados na tabela "disciplinas"
INSERT INTO disciplinas (nome, ementa, codigoProfessor)
VALUES
  ('Lab. de Banco de Dados', 'Banco de Dados', 2),
  ('Tec. Avanç. de Programação', 'Java', 2),
  ('Tec. Avanç. de Programação Web e Mobile', 'NodeJS, React-Native', 2);

-- Consulta na tabela "disciplinas"
SELECT * FROM disciplinas;
SELECT * FROM disciplinas WHERE codigoProfessor = 2;
SELECT * FROM disciplinas WHERE id = 3;

-- Atualização de um registro na tabela "disciplinas"
UPDATE disciplinas SET ementa = 'Lógica, Conjuntos e Funções' WHERE id = 1;

-- Criação da tabela "matrículas"
CREATE TABLE matriculas (
  id serial PRIMARY KEY,
  codigoAluno int REFERENCES alunos(id),
  codigoDisciplina int REFERENCES disciplinas(id),
  semestre varchar(10)
);

-- Inserção de dados na tabela "matrículas"
INSERT INTO matriculas (codigoAluno, codigoDisciplina, semestre)
VALUES
  (1, 1, '2023.1'),
  (1, 2, '2023.2'),
  (2, 1, '2023.1');

-- Consulta na tabela "matrículas"
SELECT * FROM matriculas;
SELECT * FROM matriculas WHERE codigoAluno = 1;

-- Atualização de um registro na tabela "matrículas"
UPDATE matriculas SET semestre = '2024.1' WHERE id = 2;

-- Criação da tabela "notas"
CREATE TABLE notas (
  id serial PRIMARY KEY,
  codigoMatricula int REFERENCES matriculas(id),
  descritivo varchar(50) NOT NULL,
  valor double precision NOT NULL
);

-- Inserção de dados na tabela "notas"
INSERT INTO notas (codigoMatricula, descritivo, valor)
VALUES
  (1, 'Prova 1', 8.5),
  (1, 'Prova 2', 7.8),
  (2, 'Prova 1', 9.2);

-- Consulta na tabela "notas"
SELECT * FROM notas;
SELECT * FROM notas WHERE codigoMatricula = 1;

-- Atualização de um registro na tabela "notas"
UPDATE notas SET descritivo = 'Trabalho Final' WHERE id = 3;

-- Obter médias de um aluno
SELECT m.id AS matricula_id, m.semestre, d.nome AS disciplina, AVG(n.valor) AS media
FROM matriculas m
INNER JOIN notas n ON m.id = n.codigoMatricula
INNER JOIN disciplinas d ON m.codigoDisciplina = d.id
WHERE m.codigoAluno = 1
GROUP BY m.id, m.semestre, d.nome;

-- Obter médias da turma
SELECT a.id AS aluno_id, a.nome AS aluno_nome, AVG(n.valor) AS media
FROM alunos a
INNER JOIN matriculas m ON a.id = m.codigoAluno
INNER JOIN notas n ON m.id = n.codigoMatricula
INNER JOIN disciplinas d ON m.codigoDisciplina = d.id
WHERE d.id = 1 AND m.semestre = '2023.1'
GROUP BY a.id, a.nome;

-- Para excluir registros, utilize os comandos DELETE. Certifique-se de ter um backup dos dados antes de executá-los.
-- DELETE FROM alunos WHERE id = 1;
-- DELETE FROM funcionarios WHERE id = 1;
-- DELETE FROM disciplinas WHERE id = 1;
-- DELETE FROM matriculas WHERE id = 1;
-- DELETE FROM notas WHERE id = 1;
