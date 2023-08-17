const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'siga2'
});
  
db.connect(err => {
    if (err) throw err;
    console.log('Conexão com o banco de dados estabelecida.');
});
  
module.exports = db;