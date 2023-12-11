class Usuario {
    constructor(nome, senha, papel = "admin") {
        this.nome = nome;
        this.papel = papel;
        this.senha = senha;
    }
}

module.exports = Usuario;