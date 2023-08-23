const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const alunoController = require('./controllers/aluno');

app.use(bodyParser.json());

app.use('/alunos', alunoController);

const PORT =  3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
