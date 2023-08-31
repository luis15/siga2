const db = require('../util/db');

class mediaAgrupadaModel {
    async mediaAgrupada(id, semestre) {
      return new Promise((resolve, reject) =>{
        db.query(`SELECT a.id AS aluno_id, a.nome AS aluno_nome, AVG(n.valor) AS media FROM alunos a INNER JOIN matriculas m ON a.id = m.codigoAluno INNER JOIN notas n ON m.id = n.codigoMatricula INNER JOIN disciplinas d ON m.codigoDisciplina = d.id WHERE d.id = '${id}' AND m.semestre = '${semestre}' GROUP BY a.id, a.nome;`,(err, result) => {
        if (err) reject(err);
        resolve(result);
        })
    });
  }
}

module.exports = mediaAgrupadaModel;