const Produto = require('./Produto');

class ProdutoMysqlDao {

    constructor(pool) {
        this.pool = pool;
        this.pageSize = process.env.PAGE_SIZE
    }
    async detalhes(id) {
        const query = new Promise((resolve, reject) => {
            let sql = `SELECT * FROM Produtos where id = ${id}`;
            this.pool.query(sql, function (error, linhas, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                resolve(linhas);
            });
        });
        return query.then(rows => rows.find(p => p.id == id))
    }

    async listar(page) {
        let inicio = (page - 1) * this.pageSize
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM Produtos ORDER BY id DESC LIMIT ${this.pageSize} OFFSET ${inicio}`;
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
            let sql = 'SELECT count(id) as total FROM Produtos';
            this.pool.query(sql, function (error, linhas, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                resolve(linhas[0].total);
            });
        });
    }

    async inserir(produto) {
        this.validar(produto);
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO Produtos (nome,descricao,preco,imagem) VALUES (?, ?, ?, ?);
            `;
            this.pool.query(sql, [produto.nome, produto.descricao, produto.preco, produto.imagem], function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado.insertId);
            });
        });
    }

    async alterar(id, produto) {
        if(id == null || id == undefined)
            throw new Error('id_Produto_invalido');
        this.validar(produto);
        return new Promise((resolve, reject) => {
            let sql = ` UPDATE Produtos SET nome = ?, descricao = ?, preco = ?, imagem = ? where id = ?;`;
            this.pool.query(sql, [produto.nome, produto.descricao, produto.preco, produto.imagem, id], function (error, resultado, fields) {
                if (error) {
                    console.log( error.message)
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado);
            });
        });

    }

    async apagar(id) {
        if(id == null || id == undefined)
            throw new Error('id_Produto_invalido');
        return new Promise((resolve, reject) => {
            let sql = ` Delete from Produtos where id = ?;`;
            this.pool.query(sql, [id], function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado);
            });
        });
    }

    validar(Produto) {
        if (Produto.nome == undefined || Produto.nome == "") {
            throw new Error('mensagem_nome_invalida');
        }
        if (Produto.descricao == undefined || Produto.descricao == "") {
            throw new Error('mensagem_descricao_invalida');
        }
        if (Produto.preco < 0 || Produto.preco == undefined || Produto.nome == "") {
            throw new Error('mensagem_preco_invalida');
        }
    }
}

module.exports = ProdutoMysqlDao;