const express = require('express');
const router = express.Router();
const Aluno = require('../models/alunoModel');

router.get('/', (req, res) => {
  Aluno.getAll((error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

router.post('/', (req, res) => {
  const novoAluno = req.body;
  Aluno.create(novoAluno, (error, result) => {
    if (error) throw error;
    res.status(201).json({ message: 'Aluno criado com sucesso', alunoId: result.insertId });
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const alunoAtualizado = req.body;
  Aluno.update(id, alunoAtualizado, (error, result) => {
    if (error) throw error;
    res.json({ message: 'Aluno atualizado com sucesso', alunoId: id });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Aluno.delete(id, (error, result) => {
    if (error) throw error;
    res.json({ message: 'Aluno excluído com sucesso', alunoId: id });
  });
});

module.exports = router;
