const Template = require('./template/main');
class LoginView {
    render() {
        return new Template(`
            <div class="centeredCard">
                <form method="post" class="formCard" onSubmit="event.preventDefault(); autenticar();">
                    <h2>Login</h2>
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
                    <button>Login</button>
                    </div>
                    
                </form>
            </div>
            `,[
                '<script src="/_js/loginScripts.js"></script>'
            ])
        .render();
    }
  }

module.exports = LoginView

