const db = require('../util/db');

class DisciplinaModel {
    async getDisciplinas() {
        return new Promise((resolve, reject) =>{
            db.query("SELECT * FROM disciplinas",(err, result) => {
            if (err) reject(err);
            resolve(result);
            })
        });
    }

    async getDisciplina(id) {
        return new Promise((resolve, reject) =>{
            db.query("SELECT * FROM disciplinas WHERE id = ?",[id],(err, result) => {
            if (err) reject(err);
            resolve(result);
            })
        });
    }

    async postDisciplina(nome, ementa, codigoProfessor) {
        return new Promise((resolve, reject) =>{
            db.query(`INSERT INTO disciplinas (nome, ementa, codigoProfessor) values ('${nome}', '${ementa}', '${codigoProfessor}')`,(err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        });
    }

    async deleteDisciplina(id) {
        let matricula =  new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM matriculas WHERE codigoDisciplina = ${id}`,(err, result) => {
            if (err) reject(err);
            resolve(result);
            })
        });

        console.log(await matricula)

        if(JSON.stringify(await matricula)== '[]'){
            return new Promise((resolve, reject) =>{
                db.query("DELETE FROM disciplinas WHERE id = ?",[id],(err, result) => {
                    if (err) throw err;
                    resolve(result);
                })
            });
        }else{
            return "ErrorMatriculas";
        }
    }

    async updateDisciplina(id, mods) {

        return new Promise((resolve, reject) =>{
            db.query(`UPDATE disciplinas SET ${mods} WHERE id = ${id}`,(err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        });
    }
}

module.exports = DisciplinaModel;
