const Template = require('./template/main');
const Paginacao = require('./paginacao');
class UsuariosView {
    render() {
      return new Template(`      
            <h1>Novo usuário</h1>
            <div id="feedback">
            </div>
            <form method="post" class="formCard" onSubmit="event.preventDefault(); novoUsuario();">
                <input id="usuarioId" name="id" type="hidden">
                <div class="campoFormulario">
                    <label>Nome</label>
                    <input id="nome" name="nome">
                </div>
                <div class="campoFormulario">
                    <label>Senha</label>
                    <input id="senha" name="senha" type="password">
                </div>
                <div class="campoFormulario">
                    <button id="btnSubmit">Criar</button>
                </div>
            </form>
            
            <div class="card">
                <h2>Usuários</h2>
                <table id="historicoTable">
                    <thead>
                        <tr>
                            <th>Usuário</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="historico">
                    </tbody>
                </table>
            </div>
            ${Paginacao.render()}
      `,
      ['<script src="/_js/usuariosScripts.js"></script>'])
      .render();
    }
  }
  
  module.exports = UsuariosView;