const FuncionarioModel = require('../model/funcionarioModel')

class FuncionarioController {

    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.funcionarioModel = new FuncionarioModel();
    }

    async getAll() {
        this.res.json(await this.funcionarioModel.getFuncionarios());
    }

    async getOne() {
        this.res.json(await this.funcionarioModel.getFuncionario(this.req.params.id));
    }

    async create() {
        let email = this.req.body.data.email;
        let senha = this.req.body.data.senha;
        let nome = this.req.body.data.nome;
        let cpf = this.req.body.data.cpf;
        let endereco = this.req.body.data.endereco;
        let tipo = this.req.body.data.tipo;

        if(tipo != "P" & tipo != "S" & tipo != "A") {
            this.res.status(400).send({'status': 'Tipo de funcionario inválido!'})
        }

        try {
            let retorno = await this.funcionarioModel.createFuncionario(email, senha, nome, cpf, endereco, tipo);
            this.res.json({ "status": "Adicionado com sucesso","id": `${await retorno.insertId}` });
        } catch (error) {
            this.res.status(400).send(error);
        }
    }

    async update() {
        let result = await this.funcionarioModel.updateFuncionario(this.req.params.id, this.req.body.data);
        if (result.affectedRows == 0) {
            this.res.status(400).send({ "status": "Bad Request" })
        } else {
            this.res.status(200).send({ "status": "Alterado com sucesso" })
        };
    }

    async delete() {
        let result = await this.funcionarioModel.deleteFuncionario(this.req.params.id);
        if (result.affectedRows == 0) {
            this.res.status(400).send({ "status": "Bad Request" })
        }else if(result == "ErrorDisciplinas" ){
            this.res.status(400).send({ "status": "Existem disciplinas vinculadas a esse professor" })
        } else {
            this.res.status(200).send({ "status": "Deletado com sucesso" })
        };
    }

}

module.exports = FuncionarioController;