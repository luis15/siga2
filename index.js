const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const alunoController = require('/controllers/aluno');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/alunos', async (req, res) => {
  const Aluno = new alunoController(req, res);
  await Aluno.getAll();
});

app.get('/alunos/:id', async (req, res) => {
  const Aluno = new alunoController(req, res);
  await Aluno.getAluno(req.params.id);
});

app.post('/postAluno', async (req, res) => {
  const Aluno = new alunoController(req, res);
  await Aluno.createAluno();
});

app.delete('/deleteAluno/:id', async (req, res) => {
  const Aluno = new alunoController(req, res);
  await Aluno.deleteAluno(req.params.id);
});

app.patch('/updateAluno/:id', async (req, res) => {
  const Aluno = new alunoController(req, res);
  await Aluno.updateAluno(req.params.id);
});