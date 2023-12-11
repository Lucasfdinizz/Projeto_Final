const Template = require('../template/main');
class ProdutosView {
    constructor(produto){
        this.produto = produto
    }
    render() {
      return new Template(`
      <div class="centeredCard">
        <div class="formCard">
          <h2>${this.produto.nome}</h2>
          <p> <img style="width: 100%" src="/images/${this.produto.imagem}"></td></p>
          <div class="campoFormulario">
            <label>Descrição do produto: </label>
            <p>${this.produto.descricao}</p>
          </div>
          <div class="campoFormulario">
            <Label>Preço</label>
            <p>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.produto.preco)}</p>
          </div>
          <div class="campoFormulario">
             <a href="/index"> Voltar </a>  
          </div>   
        </div> 
      </div>   
      `)
      .render();
    }
  }
  
  module.exports = ProdutosView;