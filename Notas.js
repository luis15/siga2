const db = require('../util/db');

class NotaModel {
    async getNotas() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM notas;", (err, result) => {
                if (err) {
                    throw err;
                }
                resolve(result);
            });
        });
    }

    async getNota(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM notas WHERE id = ${id};`, (err, result) => {
                if (err) {
                    throw err;
                }
                resolve(result);
            });
        });
    }

    async createNota(codigoMatricula, descritivo, valor) {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO notas (codigoMatricula, descritivo, valor) VALUES (${codigoMatricula}, '${descritivo}', ${valor});`,
                (err, result) => {
                    if (err) {
                        throw err;
                    }
                    resolve(result);
                }
            );
        });
    }

    async updateNota(id, notaUpdate) {
        const query = `UPDATE notas SET ${Object.keys(notaUpdate)
            .map(key => `${key} = ?`)
            .join(', ')} WHERE id = ?`;

        const updateValues = [...Object.values(notaUpdate), id];

        return new Promise((resolve, reject) => {
            db.query(query, updateValues, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    async deleteNota(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM notas WHERE id = ${id};`, (err, result) => {
                if (err) {
                    throw err;
                }
                resolve(result);
            });
        });
    }
}

module.exports = NotaModel;
