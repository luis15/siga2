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
    const nome = this.req.body.data.nome;
    const ra = this.req.body.data.ra;
    const senha = this.req.body.data.senha;
    let dataMatricula = this.req.body.data.dataMatricula;
    if(dataMatricula == null || dataMatricula == undefined){
      const dataAtual = new Date();
      const ano = dataAtual.getFullYear();
      const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Lembre-se do índice 0 para os meses
      const dia = String(dataAtual.getDate()).padStart(2, '0');
      dataMatricula = `${ano}-${mes}-${dia}`
    }
    const cpf = this.req.body.data.cpf;
    const endereco = this.req.body.data.endereco;
    let result =await this.AlunoModel.createAluno({nome, ra,dataMatricula, senha, cpf, endereco});
    if(result != null){
      this.res.status(200).send({'status':'Adicionado com sucesso',
      'idAluno':result.insertId});
    }else{
      this.res.status(400).send({'status':'BAD REQUEST'});
    }
  }

  async deleteAluno(id){
    let result = await this.AlunoModel.deleteAluno(id);
    if(result.affectedRows == 0 ){
      this.res.status(400).send({"status":"ID not found"})
    }else if(result == "ErrorMatriculas"){
      this.res.status(400).send({"status":"Não foi possivel excluir o Aluno pois possui matriculas!"})
    }else{
      this.res.status(200).send({"status":"Deletado com sucesso"})
    };
  }

  async updateAluno(id) {
    const alunoAtualizado = this.req.body.data;
    let result = await this.AlunoModel.updateAluno(id, alunoAtualizado);
    if(result.affectedRows == 0 ){
      this.res.status(400).send({"status":"Bad Request"})
    }else{
      this.res.status(200).send({"status":"Alterado com sucesso"})
    };
  }



}

module.exports = Aluno;