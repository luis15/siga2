const express = require('express');
const authController = require('./controller/authController');
const alunoController = require('./controller/aluno');
const DisciplinaController = require('./controller/disciplina');
const MatriculaController = require('./controller/matriculaController');
const MediaController = require('./controller/mediaController');
const db = require('./util/db');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/disciplinas', authController.authUser, async (req, res) => {
  const Disciplina = new DisciplinaController(req, res);
  await Disciplina.getAll();
});

app.get('/disciplina/:id', authController.authUser, async (req, res) => {
    const Disciplina = new DisciplinaController(req, res);
    await Disciplina.get();
});

app.post('/disciplina', authController.authUser, async (req, res) => {
    const Disciplina = new DisciplinaController(req, res);
    await Disciplina.post();
});

app.patch('/disciplina/:id', authController.authUser, async (req, res) => {
  const Disciplina = new DisciplinaController(req, res);
  await Disciplina.update();
});

app.delete('/disciplina/:id', authController.authUser, async (req, res) => {
    const Disciplina = new DisciplinaController(req, res);
    await Disciplina.delete();
});

//    Matriculas
app.get('/matriculas', authController.authUser, async (req, res) => {
    const Matricula = new MatriculaController(req, res);
    await Matricula.getAll();
});

app.get('/matricula/:id', authController.authUser, async (req, res) =>{
    const Matricula = new MatriculaController(req, res);
    await Matricula.getMatricula();
});

app.post('/matricula', authController.authUser, async (req, res) =>{
    const Matricula = new MatriculaController(req, res);
    await Matricula.postMatricula();
});

app.patch('/matricula/:id', authController.authUser, async (req,res) => {
    const Matricula = new MatriculaController(req,res);
    await Matricula.updateMatricula();
});

app.delete('/matricula/:id', authController.authUser, async (req, res) =>{
    const Matricula = new MatriculaController(req, res);
    await Matricula.deleteMatricula();
});

// Este é o endpoint raiz da API e deve retornar todos os alunos
app.get('/alunos', authController.authUser, async (req, res) => {
  const Aluno = new alunoController(req, res);
  await Aluno.getAll();
});

// Este é o endpoint que deve retornar apenas um aluno, de acordo com o id passado na URL
app.get('/alunos/:id', authController.authUser, async (req, res) => {
  const Aluno = new alunoController(req, res);
  await Aluno.getAluno(req.params.id);
});

// Este é o endpoint que deve criar um novo aluno
app.post('/postAluno', authController.authUser, async (req, res) => {
  const Aluno = new alunoController(req, res);
  await Aluno.createAluno();
});

// Este é o endpoint que deve deletar um aluno, de acordo com o id passado na URL
app.delete('/deleteAluno/:id', authController.authUser, async (req, res) => {
  const Aluno = new alunoController(req, res);
  await Aluno.deleteAluno(req.params.id);
});

// Este é o endpoint que deve atualizar um aluno, de acordo com o id passado na URL
app.patch('/updateAluno/:id', authController.authUser, async (req, res) => {
  const Aluno = new alunoController(req, res);
  await Aluno.updateAluno(req.params.id);
});

app.get('/notas', authController.authUser, async (req, res) => {
  const MediaAluno = new MediaController();
  await Aluno.getNotas();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

