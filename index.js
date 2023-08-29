const express = require('express');
const alunoController = require('./controller/aluno');
const DisciplinaController = require('./controller/disciplina');
const MatriculaController = require('./controller/matriculaController');
const MediaController = require('./controllers/mediaController');
const FuncionarioController = require('./controller/funcionarioController');
const AccessController = require('./controller/accessController');
const db = require('./util/db');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Access = new AccessController();

//Testes
app.post('/', async (req, res) => {
  if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "PATCH", "rota": "/funcionarios", "data": {...req.body.data}})){
    console.log('OK')
    res.status(200).send({'status':'OK'});
  }else{
    res.status(401).send({'status':'Não Autorizado'});
  }
});

app.get('/disciplinas', async (req, res) => {
    if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "GET", "rota": "/disciplinas", "data": {...req.body.data}})){
      const Disciplina = new DisciplinaController(req, res);
      await Disciplina.getAll();
    }
});

app.get('/disciplina/:id', async (req, res) => {
  if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "GET", "rota": "/disciplinas", "data": {...req.body.data}})){
    const Disciplina = new DisciplinaController(req, res);
    await Disciplina.get();
  }else{
    res.status(401).send({'status':'Não Autorizado'});
  }
});

app.post('/disciplina',async (req, res) => {
  if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "POST", "rota": "/disciplinas", "data": {...req.body.data}})){
    const Disciplina = new DisciplinaController(req, res);
    await Disciplina.post();
  }else{
    res.status(401).send({'status':'Não Autorizado'});
  }
});

app.patch('/disciplina/:id',async (req, res) => {
  if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "PATCH", "rota": "/disciplinas", "data": {...req.body.data}})){
    const Disciplina = new DisciplinaController(req, res);
    await Disciplina.update();
  }else{
    res.status(401).send({'status':'Não Autorizado'});
  }
});

app.delete('/disciplina/:id',async (req, res) => {
  if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "DELETE", "rota": "/disciplinas", "data": {...req.body.data}})){
    const Disciplina = new DisciplinaController(req, res);
    await Disciplina.delete();
  }else{
    res.status(401).send({'status':'Não Autorizado'});
  }
});

//    Matriculas
app.get('/matriculas', async (req, res) => {
  if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "GET", "rota": "/matriculas", "data": {...req.body.data}})){
    const Matricula = new MatriculaController(req, res);
    await Matricula.getAll();
  }else{
    res.status(401).send({'status':'Não Autorizado'});
  }
});

app.get('/matricula/:id', async (req, res) =>{
  if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "GET", "rota": "/matriculas", "data": {...req.body.data}})){
    const Matricula = new MatriculaController(req, res);
    await Matricula.getMatricula();
  }else{
    res.status(401).send({'status':'Não Autorizado'});
  }
});

app.post('/matricula', async (req, res) =>{
  if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "POST", "rota": "/matriculas", "data": {...req.body.data}})){
    const Matricula = new MatriculaController(req, res);
    await Matricula.postMatricula();
  }else{
    res.status(401).send({'status':'Não Autorizado'});
  }
});

app.patch('/matricula/:id', async (req,res) => {
  if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "PATCH", "rota": "/matriculas", "data": {...req.body.data}})){
    const Matricula = new MatriculaController(req,res);
    await Matricula.updateMatricula();
  }else{
    res.status(401).send({'status':'Não Autorizado'});
  }
});

app.delete('/matricula/:id', async (req, res) =>{
  if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "DELETE", "rota": "/matriculas", "data": {...req.body.data}})){
    const Matricula = new MatriculaController(req, res);
    await Matricula.deleteMatricula();
  }else{
    res.status(401).send({'status':'Não Autorizado'});
  }
});

// Este é o endpoint raiz da API e deve retornar todos os alunos
app.get('/alunos', async (req, res) => {
  if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "GET", "rota": "/alunos", "data": {...req.body.data}})){
    const Aluno = new alunoController(req, res);
    await Aluno.getAll();
  }else{
    res.status(401).send({'status':'Não Autorizado'});
  }
});

// Este é o endpoint que deve retornar apenas um aluno, de acordo com o id passado na URL
app.get('/alunos/:id', async (req, res) => {
  if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "GET", "rota": "/alunos", "data": {...req.body.data}})){
    const Aluno = new alunoController(req, res);
    await Aluno.getAluno(req.params.id);
  }else{
    res.status(401).send({'status':'Não Autorizado'});
  }
});

// Este é o endpoint que deve criar um novo aluno
app.post('/postAluno', async (req, res) => {
  if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "POST", "rota": "/alunos", "data": {...req.body.data}})){
    const Aluno = new alunoController(req, res);
    await Aluno.createAluno();
  }else{
    res.status(401).send({'status':'Não Autorizado'});
  }
});

// Este é o endpoint que deve deletar um aluno, de acordo com o id passado na URL
app.delete('/deleteAluno/:id', async (req, res) => {
  if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "PATCH", "rota": "/alunos", "data": {...req.body.data}})){
    const Aluno = new alunoController(req, res);
    await Aluno.deleteAluno(req.params.id);
  }else{
    res.status(401).send({'status':'Não Autorizado'});
  }
});

// Este é o endpoint que deve atualizar um aluno, de acordo com o id passado na URL
app.patch('/updateAluno/:id', async (req, res) => {
  if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "DELETE", "rota": "/alunos", "data": {...req.body.data}})){
    const Aluno = new alunoController(req, res);
    await Aluno.updateAluno(req.params.id);
  }else{
    res.status(401).send({'status':'Não Autorizado'});
  }
});

app.get('/mediaAluno/:id', async (req, res) => {
  if(await Access.verifyAccess({"info":{...req.body.infos}, "metodo": "GET", "rota": "/mediaAluno", "data": {...req.body.data}})){
    const MediaAluno = new MediaController(req,res);
    await MediaAluno.getAllMedia();
  }else{
    res.status(401).send({'status':'Não Autorizado'});
  }
});

app.get('/funcionarios', async (req, res) => {
  const Funcionario = new FuncionarioController(req, res);
  await Funcionario.getAll();
})

app.get('/funcionarios/:id', async (req, res) => {
  const Funcionario = new FuncionarioController(req, res);
  await Funcionario.getOne(req.params.id);
})

app.post('/funcionario', async (req, res) => {
  const Funcionario = new FuncionarioController(req, res);
  await Funcionario.create();
})

app.patch('/funcionario/:id', async (req, res) => {
  const Funcionario = new FuncionarioController(req, res);
  await Funcionario.update()
})

app.delete('/funcionario/:id', async (req, res) => {
  const Funcionario = new FuncionarioController(req, res);
  await Funcionario.delete()
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

