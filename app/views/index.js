const Template = require('./template/main');
const Paginacao = require('./paginacao');
class Index {
    render() {
        return new Template(`
            <h2>Produtos Cadastrados</h2>
            <p>Listagem pública para consulta de produtos cadastrados</p>
                
                <div class="card">
                    <table id="historicoTable">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Descricao</th>
                                <th>Preço</th>
                                <th>Imagem</th>
                            </tr>
                        </thead>
                        <tbody id="historico">
                        </tbody>
                    </table>
                </div>
                ${Paginacao.render()}
            `,[
            '<script src="/_js/indexScripts.js"></script>'
            ])
        .render();
    }
  }
  
  module.exports = Index;