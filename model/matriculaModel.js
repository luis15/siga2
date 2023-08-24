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

    async postMatricula(codAluno, codDisciplina, semestre, notas) {
        return new Promise((resolve, reject) => {
            bd.query('INSERT INTO matriculas (codAluno, codDisciplina, semestre, notas) VALUES (?,?,?)', [codAluno, codDisciplina, semestre, notas], (err, result) => {
                if(err) throw err;
                resolve(result);
            })
        })
    }

    async updateMatricula(id, codAluno, codDisciplina, semestre, notas) {
        return new Promise((resolve, reject) => {
            bd.query('UPDATE matriculas SET codAluno =?, codDisciplina =?, semestre =?, notas =? WHERE id =?', [codAluno, codDisciplina, semestre, notas, id], (err, result) => {
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