class Formacao {
    constructor(titulo, institucao) {
        this.titulo = titulo;
        this.institucao = institucao;
    }
    toString(){
        return `
        <li>${this.titulo}</li>
        <li>Instituição: ${this.institucao}</li>
        `
    }
}

module.exports = Formacao;