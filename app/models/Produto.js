class Produto {
    constructor(nome,descricao,preco,imagem) {
        this.validar(nome,descricao,preco)
        this.nome = nome
        this.descricao = descricao.replaceAll("+"," ").replaceAll("%0A","\n")
        this.preco = preco
        this.imagem = imagem
    }
    
    validar(nome,descricao,preco) {
        if (nome == undefined || nome == "") {
            throw new Error('mensagem_nome_invalida');
        }
        if (descricao == undefined || descricao == "") {
            throw new Error('mensagem_descricao_invalida');
        }
        if (preco < 0 || preco == undefined || nome == "") {
            throw new Error('mensagem_preco_invalida');
        }
    }
}

module.exports = Produto;