const { Client } = require("pg");
require("dotenv").config();

const db = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida.");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

module.exports = db;
