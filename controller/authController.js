const basicAuth = require('basic-auth');
const db = require('../util/db');
const logger = require('../util/logger');

async function authUser(req, res, next) {
    const user = req.query.username;
    const pass = req.query.password;

    if (!user || !pass) {
        res.status(401).send('Autenticação necessária.');
        return;
    }

    try {
        const queryString = 'SELECT * FROM funcionarios WHERE email = ? AND senha = ?';
        db.query(queryString, [user, pass], (err, results) => {
            if (err) {
                console.error('Erro ao verificar as credenciais:', err);
                res.status(500).send('Erro ao verificar as credenciais.');
                return;
            }

            if (results.length === 1) {
                next();
            } else {
                res.status(401).send('Credenciais inválidas.');
            }
        });
    } catch (error) {
        console.error('Erro ao verificar as credenciais:', error);
        res.status(500).send('Erro ao verificar as credenciais.');
    }
}

module.exports = {
    authUser
};