const AlunoModel = require('../model/alunoModel');

class Aluno{
  constructor(req,res){
    this.req = req;
    this.res = res;
    this.AlunoModel = new AlunoModel();
  }

  async getAll(){
    this.res.json(await this.AlunoModel.getAlunos());
  }

  async getAluno(id){
    this.res.json(await this.AlunoModel.getAluno(id));
  }

  async createAluno(){
    const nome = this.req.body.nome;
    const ra = this.req.body.ra;
    const senha = this.req.body.senha;
    const cpf = this.req.body.cpf;
    const endereco = this.req.body.endereco;
    this.res.json(await this.AlunoModel.createAluno({nome, ra, senha, cpf, endereco}));
  }

  async deleteAluno(id){
    this.res.json(await this.AlunoModel.deleteAluno(id));
  }

  async updateAluno(id) {
    const alunoAtualizado = this.req.body;
    this.res.json(await this.AlunoModel.updateAluno(id, alunoAtualizado));
  }



}

module.exports = Aluno;