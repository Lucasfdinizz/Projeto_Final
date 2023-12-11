class Experiencia {
    constructor(funcao, empresa, anoInicio) {
        this.funcao = funcao;
        this.empresa = empresa;
        this.anoInicio = anoInicio
    }
    toString(){
        return `
        <li>Função: ${this.funcao}</li>
        <li>Instituição: ${this.empresa}</li>
        <li>Ano início: ${this.anoInicio}</li>
        `
    }
}

module.exports = Experiencia;