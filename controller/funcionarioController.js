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
        let email = this.req.body.email;
        let senha = this.req.body.senha;
        let nome = this.req.body.nome;
        let cpf = this.req.body.cpf;
        let endereco = this.req.body.endereco;
        let tipo = this.req.body.tipo;

        if(tipo != "P" & tipo != "S" & tipo != "A") {
            this.res.status(400).send({'status': 'Tipo de funcionario inválido!'})
        }

        try {
            let retorno = await this.funcionarioModel.createFuncionario(email, senha, nome, cpf, endereco, tipo);
            this.res.json({ "id": `${await retorno.insertId}` });
        } catch (error) {
            this.res.status(400).send(error);
        }
    }

    async update() {
        this.res.json(await this.funcionarioModel.updateFuncionario(this.req.params.id, this.req.body))
    }

    async delete() {
        this.res.json(await this.funcionarioModel.deleteFuncionario(this.req.params.id))
    }

}

module.exports = FuncionarioController;