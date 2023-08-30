const db = require('../util/db');

class mediaAgrupadaModel {
    async getMediaTurma(codigoDisciplina, semestre) {
      try {
        const sql = "SELECT a.id AS aluno_id, a.nome AS aluno_nome, AVG(n.valor) AS media FROM alunos a INNER JOIN matriculas m ON a.id = m.codigoAluno INNER JOIN notas n ON m.id = n.codigoMatricula INNER JOIN disciplinas d ON m.codigoDisciplina = d.id WHERE d.id = ? AND m.semestre = ? GROUP BY a.id, a.nome;";
        const [rows, fields] = db.query(sql, [codigoDisciplina, semestre]);
        return rows;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }

module.exports = mediaAgrupadaModel;