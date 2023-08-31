const db = require('../util/db');

class FuncionarioModel {
    async getFuncionarios() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM funcionarios;", (err, result) => {
                if (err) {
                    throw(err);
                }
                resolve(result);
            })
        })
    }

    async getFuncionario(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM funcionarios WHERE id = ${id};`, (err, result) => {
                if(err) {
                    throw(err);
                }
                resolve(result);
            })
        })
    }

    async createFuncionario(email, senha, nome, cpf, endereco, tipo) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO funcionarios VALUES (null, '${email}','${senha}','${nome}','${cpf}','${endereco}','${tipo}');`, (err, result) => {
                if(err) {
                    throw(err);
                }
                resolve(result);
            });

        })
    }

    async updateFuncionario(id, funcionarioUpdate) {
        const query = `UPDATE funcionarios SET ${
            Object.keys(funcionarioUpdate)
            .map(key => `${key} = ?`)
            .join(', ')
        } WHERE id = ?`;

        const valoresNovos = [...Object.values(funcionarioUpdate), id];

        return new Promise((resolve, reject) => {
            db.query(query, valoresNovos, (error, results) => {
                if (error) reject(error);
                resolve(results);
            });
        });
    }

    async deleteFuncionario(id) {

        const diciplinas = new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM disciplinas WHERE codigoProfessor = ${id}`,(err, result) => {
            if (err) reject(err);
            resolve(result);
            })
        });

        if(JSON.stringify(await diciplinas) == '[]') {
            return new Promise((resolve, reject) => {
                db.query(`DELETE FROM funcionarios WHERE id = ${id};`, (err, result) => {
                    if(err) {
                        throw(err);
                    }
                    resolve(result);
                })
            })
        }else{
            return "ErrorDisciplinas"
        }

        

    }

}

module.exports = FuncionarioModel;