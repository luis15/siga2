const mysql = require('mysql');

const connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "siga2"

});

connection.connect((error) => {
  if (error) throw error;
  console.log('Conectado ao banco de dados MySQL');
});

module.exports = connection;
