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
            db.query('INSERT INTO matriculas (codigoAluno, codigoDisciplina, semestre) VALUES (?,?,?)', [codAluno, codDisciplina, semestre], (err, result) => {
                if(err) throw err;
                resolve(result);
            })
        })
    }

    async updateMatricula(id, modification) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE matriculas SET ${modification} WHERE id = ${id}`, (err, result) => {
                if(err) throw err;
                resolve(result);
            })
        })
    }

    async deleteMatricula(id) {
        const notas = new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM notas WHERE codigoMatricula = ${id}`,(err, result) => {
            if (err) reject(err);
            resolve(result);
            })
        });
        
        if(JSON.stringify(await notas)== '[]'){
            return new Promise((resolve, reject) => {
                db.query('DELETE FROM matriculas WHERE id =?', [id], (err, result) => {
                    if(err) throw err;
                    resolve(result);
                })
            })
        }else{
            return "ErrorNotas";
        }
    }
}

module.exports = MatriculaModel;
