const express = require('express');
const DisciplinaController = require('./controller/disciplina');
const MatriculaController = require('./controller/matriculaController');
const db = require('./util/db');

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Disciplinas

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

//    Matriculas
app.get('/matriculas', async (req, res) =>{
    const Matricula = new MatriculaController(req, res);
    await Matricula.getAll();
});

app.get('/matricula/:id', async (req, res) =>{
    const Matricula = new MatriculaController(req, res);
    await Matricula.get();
});

app.post('/matricula', async (req, res) =>{
    const Matricula = new MatriculaController(req, res);
    await Matricula.post();
});

app.patch('/matricula/:id', async (req,res) => {
    const Matricula = new MatriculaController(req,res);
    await Matricula.patch();
});

app.delete('/matricula/:id', async (req, res) =>{
    const Matricula = new MatriculaController(req, res);
    await Matricula.delete();
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});