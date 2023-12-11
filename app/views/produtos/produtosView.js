const Template = require('../template/main');
const Paginacao = require('../paginacao');
class ProdutosView {
    render() {
      return new Template(`
        <div class="card">
            <h2>Novo Produto</h2>        
            
            <form method="post" class="formCard" onSubmit="event.preventDefault(); cadastrar();">
                <input id="produtoId" name="id" type="hidden">
                <div class="campoFormulario">
                    <label>Nome</label>
                    <input id="nome" name="nome" required>
                </div>
                <div class="campoFormulario">
                    <label>Descrição</label>
                    <input  id="descricao" name="descricao" required>
                </div>
                <div class="campoFormulario">
                    <label>Preço</label>
                    <input type="number" name="preco" id="preco" required>   
                </div>
                <div class="campoFormulario">
                    <label>Imagem</label>
                    <select id="imagem" required>
                        <option value="">Selecione uma imagem</option>
                        <option value="teste.png">Imagem 1</option>
                        <option value="teste2.png">Imagem 2</option>
                        <option value="teste3.png">Imagem 3</option>
                        <option value="teste4.png">Imagem 4</option>
                        <option value="teste5.png">Imagem 5</option>
                    </select>
                </div>         
                <div class="campoFormulario">       
                    <button id="btnSubmit">Gravar</button>
                </div>
            </form>
            <div id="feedback">
            </div>
        </div>
        <div class="card">
            <h2>Produtos</h2>
            <table id="historicoTable">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Imagem</th>
                    </tr>
                </thead>
                <tbody id="historico">
                </tbody>
            </table>
        </div>
            ${Paginacao.render()}
      `,
      ['<script src="/_js/produtosScripts.js"></script>'])
      .render();
    }
  }
  
  module.exports = ProdutosView;