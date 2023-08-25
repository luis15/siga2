const db = require('../util/db');

class MatriculaModel {
    async getMatriculas(){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM matriculas', (err, result) => {
                if(err) throw err;
                resolve(result);
            })
        })
    }

    async getMatricula(id){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM matriculas WHERE id =?', [id], (err, result) => {
                if(err) throw err;
                resolve(result);
            })
        })
    }

    async postMatricula(codAluno, codDisciplina, semestre) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO matriculas (codAluno, codDisciplina, semestre, notas) VALUES (?,?,?)', [codAluno, codDisciplina, semestre, notas], (err, result) => {
                if(err) throw err;
                resolve(result);
            })
        })
    }

    async updateMatricula(id, modification) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE matriculas SET ? WHERE id =?', [modification, id], (err, result) => {
                if(err) throw err;
                resolve(result);
            })
        })
    }

    async deleteMatricula(id) {
        console.log('passei aqui')
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM matriculas WHERE id =?', [id], (err, result) => {
                if(err) throw err;
                resolve(result);
            })
        })
    }
}

module.exports = MatriculaModel;
