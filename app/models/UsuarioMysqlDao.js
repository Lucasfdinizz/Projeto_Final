const Usuario = require('./Usuario');
const bcrypt = require('bcrypt');

class UsuarioMysqlDao {

    constructor(pool) {
        this.pool = pool;
        this.pageSize = process.env.PAGE_SIZE;
    }
    async listarTodos(){
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM Usuarios`;
            this.pool.query(sql, function (error, linhas, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                resolve(linhas);
            });
        });
    }
    async checarUsuario(nome) {
        const query = await this.listarTodos();
        return query.find(p => p.nome == nome)
    }
    async detalhes(id) {
        const query = await this.listarTodos();
        return query.find(p => p.id == id)
    }

    async listar(page) {
        let inicio = (page - 1) * this.pageSize
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM Usuarios ORDER BY id DESC LIMIT ${this.pageSize} OFFSET ${inicio}`;
            this.pool.query(sql, function (error, linhas, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                resolve(linhas);
            });
        });
    }

    async pageCount() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT count(id) as total FROM Usuarios';
            this.pool.query(sql, function (error, linhas, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                resolve(linhas[0].total);
            });
        });
    }

    async getPapel(id) {
        return new Promise((resolve, reject) => {
            let sql = `select nome from Papeis where id = ?;
            `;
            this.pool.query(sql,[id], function (error, linhas, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                resolve(linhas);
            });
        });
    }

    async inserir(usuario) {
        this.validar(usuario);
        usuario.senha = bcrypt.hashSync(usuario.senha, 10);
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO Usuarios (nome, senha, id_papel) VALUES (?, ?, ?);
            `;
            this.pool.query(sql, [usuario.nome, usuario.senha, 1], function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado.insertId);
            });
        });
    }

    async alterar(id, usuario) {
        if(id == null || id == undefined)
            throw new Error('id_usuario_invalido');
        this.validar(usuario);
        usuario.senha = bcrypt.hashSync(usuario.senha, 10);
        return new Promise((resolve, reject) => {
            let sql = ` UPDATE Usuarios SET nome = ?, senha = ? where id = ?;`;
            this.pool.query(sql, [usuario.nome, usuario.senha, id], function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado);
            });
        });

    }

    async apagar(id) {
        if(id == null || id == undefined)
            throw new Error('id_usuario_invalido');
        return new Promise((resolve, reject) => {
            let sql = ` Delete from Usuarios where id = ?;`;
            this.pool.query(sql, [id], function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado);
            });
        });
    }

    validar(usuario) {
        if (!usuario.nome) {
            throw new Error('mensagem_nome_invalido');
        }
        if (!usuario.senha) {
            throw new Error('mensagem_senha_invalido');
        }
    }
    async autenticar(nome, senha) {
        let usuarios = await this.listarTodos();
        return usuarios.find(usuario => usuario.nome?.toLowerCase() == nome?.toLowerCase() && bcrypt.compareSync(senha, usuario.senha))        
    }
}

module.exports = UsuarioMysqlDao;