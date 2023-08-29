const db = require('../util/db');

class MediaModel {
  async getAllMedia(id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT m.id AS matricula_id, m.semestre, d.nome AS disciplina, AVG(n.valor) AS media FROM matriculas m INNER JOIN notas n ON m.id = n.codigoMatricula INNER JOIN disciplinas d ON m.codigoDisciplina = d.id WHERE m.codigoAluno = ${id} GROUP BY m.id, m.semestre, d.nome;`, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = MediaModel;
