const db = require('../util/db');

const Aluno = {};

Aluno.getAll = (callback) => {
  db.query('SELECT * FROM alunos', callback);
};

Aluno.create = (novoAluno, callback) => {
  db.query('INSERT INTO alunos SET ?', novoAluno, callback);
};

Aluno.update = (id, alunoAtualizado, callback) => {
  db.query('UPDATE alunos SET ? WHERE id = ?', [alunoAtualizado, id], callback);
};

Aluno.delete = (id, callback) => {
  db.query('DELETE FROM alunos WHERE id = ?', id, callback);
};

module.exports = Aluno;
