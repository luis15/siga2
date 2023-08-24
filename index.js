const express = require('express');
const alunoController = require('./controllers/aluno');
const DisciplinaController = require('./controller/disciplina');
const db = require('./util/db');

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/disciplinas', async (req, res) => {
  const Disciplina = new DisciplinaController(req, res);
  await Disciplina.getAll();  
});

app.get('/disciplina/:id', async (req, res) => {
  const Disciplina = new DisciplinaController(req, res);
  await Disciplina.get();  
});

app.post('/disciplina',async (req, res) => {
    const Disciplina = new DisciplinaController(req, res);
    await Disciplina.post();
});

app.patch('/disciplinas', (req, res) => {
    res.send('Hello World');
});

app.delete('/disciplina/:id',async (req, res) => {
    const Disciplina = new DisciplinaController(req, res);
    await Disciplina.delete();
});

app.patch('/disciplina/:id',async (req, res) => {
  const Disciplina = new DisciplinaController(req, res);
  await Disciplina.update();
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});