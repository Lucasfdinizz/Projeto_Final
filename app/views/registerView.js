
const Template = require('./template/main');
class registerView {
    render() {
        return new Template(`
            <div class="centeredCard">
                <form method="post" class="formCard" action="api/usuarios">
                    <h2>Novo usuário</h2>
                    <div id="resposta"></div>
                    <div class="campoFormulario">
                        <label>Nome</label>
                        <input id="nome" name="nome">
                    </div>
                    <div class="campoFormulario">
                        <label>Senha</label>
                        <input id="senha" name="senha" type="password">
                    </div>
                    <div class="campoFormulario">
                    <button>Cadastrar</button>
                    </div>
                    
                </form>
            </div>
            `)
        .render();
    }
  }

module.exports = registerView

