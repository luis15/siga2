const express = require('express');
const bodyParser = require('body-parser');
const MediaController = require('./controllers/mediaController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/notas', MediaController.getAllMedia);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
