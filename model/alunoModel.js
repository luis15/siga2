const db = require('../util/db');

class AlunoModel{

  async getAlunos(){
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM alunos', (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    })                   
  }

  async getAluno(id){
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM alunos WHERE id = ?', id, (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    })
  }

  async createAluno(novoAluno){
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO alunos SET ?', novoAluno, (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    })
  }

  async deleteAluno(id){
    let matricula =  new Promise((resolve, reject) =>{
      db.query(`SELECT * FROM matriculas WHERE codigoDisciplina = ${id}`,(err, result) => {
      if (err) reject(err);
      resolve(result);
      })
    });

    if(JSON.stringify(await matricula)== '[]'){
      return new Promise((resolve, reject) => {
        db.query('DELETE FROM alunos WHERE id = ?', id, (error, results) => {
          if (error) reject(error);
          resolve(results);
        });
      })
    }else{
      return "ErrorMatriculas";
    }
  }

  async updateAluno(id, alunoAtualizado) {
    // Cria uma consulta SQL de atualização com os campos que serão atualizados
    const updateQuery = `UPDATE alunos SET ${Object.keys(alunoAtualizado).map(key => `${key} = ?`).join(', ')} WHERE id = ?`;

    // Cria uma lista de valores para substituir os placeholders na consulta SQL
    const updateValues = [...Object.values(alunoAtualizado), id];

    // Realiza a consulta SQL no banco de dados
    return new Promise((resolve, reject) => {
        db.query(updateQuery, updateValues, (error, results) => {
            if (error) reject(error);
            resolve(results);
        });
    });
  } 

}

module.exports = AlunoModel;