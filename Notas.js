const db = require('../util/db');

class Nota {
    constructor(codigoMatricula, descritivo, valor) {
        this.codigoMatricula = codigoMatricula;
        this.descritivo = descritivo;
        this.valor = valor;
        this.codigo = this.gerarCodigoUnico();
    }

    gerarCodigoUnico() {
        return "N" + Math.floor(Math.random() * 100000);
    }
}

class GerenciadorNotas {
    constructor() {
        this.notas = [];
    }

    cadastrarNota(codigoMatricula, descritivo, valor) {
        // verificar matrícula e valor, criar nova nota e adicioná-la à lista
    }

    consultarListaNotas() {
        return this.notas;
    }

    consultarNotaEspecifica(codigoNota) {
        return this.notas.find(nota => nota.codigo === codigoNota);
    }

    excluirNota(codigoNota) {
        // excluir a nota
    }
}

const gerenciadorNotas = new GerenciadorNotas();

const codigoNotaCadastrada = gerenciadorNotas.cadastrarNota(codigoMatricula, "Prova 1", 8.5);
console.log("Código da nota cadastrada:", codigoNotaCadastrada);

const listaNotas = gerenciadorNotas.consultarListaNotas();
console.log("Lista de notas:", listaNotas);

const notaEspecifica = gerenciadorNotas.consultarNotaEspecifica(codigoNotaCadastrada);
console.log("Nota específica:", notaEspecifica);

const notaExcluida = gerenciadorNotas.excluirNota(codigoNotaCadastrada);
console.log("Nota excluída:", notaExcluida);
