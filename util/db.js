const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: `${process.env.HOST}`,
    user: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`
});
  
db.connect(err => {
    if (err) throw err;
    console.log('Conexão com o banco de dados estabelecida.');
});
  
module.exports = db;
