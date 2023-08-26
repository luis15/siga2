const mysql = require('mysql');
const dotenv = require('dotenv'); // Importe a biblioteca dotenv
dotenv.config(); // Carregue as variáveis de ambiente do arquivo .env

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('Conexão com o banco de dados estabelecida.');
});

module.exports = db;

