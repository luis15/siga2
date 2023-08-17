const express = require('express');
const DisciplinaController = require('./controller/disciplina');
const db = require('./util/db');

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  db.query("SELECT * FROM `disciplinas`",(err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});