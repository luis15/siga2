const bd = require('../util/db');

class MatriculaModel {
    async getMatriculas(){
        return new Promise((resolve, reject) => {
            bd.query('SELECT * FROM matriculas', (err, result) => {
                if(err) throw err;
                resolve(result);
            })
        })
    }

    async getMatricula(id){
        return new Promise((resolve, reject) => {
            bd.query('SELECT * FROM matriculas WHERE id =?', [id], (err, result) => {
                if(err) throw err;
                resolve(result);
            })
        })
    }

    async postMatricula(codAluno, codDisciplina,semestre) {
        return new Promise((resolve, reject) => {
            bd.query('INSERT INTO matriculas (codAluno, codDisciplina, semestre) VALUES (?,?,?)', [codAluno, codDisciplina, semestre], (err, result) => {
                if(err) throw err;
                resolve(result);
            })
        })
    }

    async deleteMatricula(id) {
        return new Promise((resolve, reject) => {
            bd.query('DELETE FROM matriculas WHERE id =?', [id], (err, result) => {
                if(err) throw err;
                resolve(result);
            })
        })
    }
}

module.exports = new MatriculaModel();