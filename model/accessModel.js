const db = require('../util/db');

class accessModel{
    async verifyUser(user){
        if(user.hasOwnProperty('email')){
            return new Promise((resolve, reject) =>{
                db.query(`SELECT * FROM funcionarios WHERE email = '${user.email}' AND senha = '${user.senha}'`,(err, result) => {
                    if (err) reject(err);
                    resolve(result[0]);
                })
            });
        }
        if(user.hasOwnProperty('ra')){
            return new Promise((resolve, reject) =>{
                db.query(`SELECT * FROM alunos WHERE ra = '${user.ra}' AND senha = '${user.senha}'`,(err, result) => {
                    if (err) reject(err);
                    resolve(result[0]);
                })
            });
        }
    }

    async verifyDestiny(id){
        return new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM funcionarios WHERE id = ${id}`,(err, result) => {
                if (err) reject(err);
                resolve(result[0]);
            })
        });
    }

    async verifyDisciplina(id){
        return new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM disciplinas WHERE id = ${id}`,(err, result) => {
                if (err) reject(err);
                resolve(result[0]);
            })
        });
    }

    async verifyAccess(info){
        let checkAccess = info.info
        if((!checkAccess.hasOwnProperty('email') ||!checkAccess.hasOwnProperty('senha')) && (!checkAccess.hasOwnProperty('ra') ||!checkAccess.hasOwnProperty('senha')) ){
            return false;
        }
        let perm = await this.verifyUser(info.info);
        if(!perm){
            return false;
        }
        if(perm.hasOwnProperty('tipo')){
            switch(perm.tipo){
            case 'A':
                if(info.metodo == "GET" || info.metodo == "POST" || info.metodo == "PATCH" || info.metodo == "DELETE"){
                    if(info.rota == "/funcionario" || info.rota == "/matricula" || info.rota == "/aluno" || info.rota == "/disciplinas" || info.rota == "/notas"){
                        return true;
                    }
                }
                break;
            case 'S':
                if(info.rota == "/matricula" ||  info.rota == "/disciplinas" ||  info.rota == "/alunos" || info.rota == "/notas"){
                    if(info.metodo == "GET" || info.metodo == "POST" || info.metodo == "PATCH"){
                        return true;
                    }
                }else if(info.rota == "/funcionarios"){
                    if(info.metodo == "GET"){
                        let result = await this.verifyDestiny(info.id);
                        if(result == "S"){
                            return true;
                        }else if(result == "P"){
                            return true;
                        }
                        else if(result == "A"){
                            return false;
                        }
                    }else if(info.metodo == "POST"){
                        if(info.data.tipo == "P" || info.data.tipo == "S"){
                            return true;
                        }else{
                            return false;
                        }
                    } 
                    else if(info.metodo == "PATCH"){
                        //PAREI AQUI
                        let result = await this.verifyDestiny(info.data.id);
                        if(result.tipo == "S"){
                            if(result.email == info.info.email){
                                console.log("Aqui?")
                                return true;
                            }else{
                                return false;
                            }
                        }else if(result.tipo == "P"){
                            return true;
                        }
                        else if(result.tipo == "A"){
                            return false;
                        }
                    }else{
                        return false;
                    }
                }
                break;
            case 'P':
                if(info.metodo == "GET" || info.metodo == "POST"){
                    if(info.rota == "/notas"){ //Verificar com Luiz, pois não existe relacionamento entre notas e professor
                        let result = await this.verifyDisciplina(perm.id);
                        console.log("Perm " + perm)
                        console.log("Result " + result)
                        if(perm.id == result.id){
                            return true;
                        }else{
                            return false;
                        }
                    }
                }
                break;
            default:
                return false;
            }
        }else{
            if(perm.hasOwnProperty('ra')){
                if(info.metodo == "GET"){
                    if(info.rota == "/mediaAluno"){
                        return true;
                    }
                }
            }
        }
    }
}

module.exports = accessModel;