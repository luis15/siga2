const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const alunoController = require('./controller/aluno');
const db = require('./util/db');
const PORT = 3000;

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

app.patch('/disciplina/:id',async (req, res) => {
  const Disciplina = new DisciplinaController(req, res);
  await Disciplina.update();
});

app.delete('/disciplina/:id',async (req, res) => {
    const Disciplina = new DisciplinaController(req, res);
    await Disciplina.delete();
});

//    Matriculas
app.get('/matriculas', async (req, res) => {
    const Matricula = new MatriculaController(req, res);
    await Matricula.getAll();
});

app.get('/matricula/:id', async (req, res) =>{
    const Matricula = new MatriculaController(req, res);
    await Matricula.getMatricula();
});

app.post('/matricula', async (req, res) =>{
    const Matricula = new MatriculaController(req, res);
    await Matricula.postMatricula();
});

app.patch('/matricula/:id', async (req,res) => {
    const Matricula = new MatriculaController(req,res);
    await Matricula.updateMatricula();
});

app.delete('/matricula/:id', async (req, res) =>{
    const Matricula = new MatriculaController(req, res);
    await Matricula.deleteMatricula();
});

// Este é o endpoint raiz da API e deve retornar todos os alunos
app.get('/alunos', async (req, res) => {
  const Aluno = new alunoController(req, res);
  await Aluno.getAll();
});

// Este é o endpoint que deve retornar apenas um aluno, de acordo com o id passado na URL
app.get('/alunos/:id', async (req, res) => {
  const Aluno = new alunoController(req, res);
  await Aluno.getAluno(req.params.id);
});

// Este é o endpoint que deve criar um novo aluno
app.post('/postAluno', async (req, res) => {
  const Aluno = new alunoController(req, res);
  await Aluno.createAluno();
});

// Este é o endpoint que deve deletar um aluno, de acordo com o id passado na URL
app.delete('/deleteAluno/:id', async (req, res) => {
  const Aluno = new alunoController(req, res);
  await Aluno.deleteAluno(req.params.id);
});

// Este é o endpoint que deve atualizar um aluno, de acordo com o id passado na URL
app.patch('/updateAluno/:id', async (req, res) => {
  const Aluno = new alunoController(req, res);
  await Aluno.updateAluno(req.params.id);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

