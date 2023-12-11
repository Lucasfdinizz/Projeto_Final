const bcrypt = require('bcrypt');

class UsuarioDao {

    constructor() {
        this.usuarios = [];
    }

    listar() {
        return this.usuarios;
    }

    inserir(usuario) {
        this.validar(usuario);
        usuario.senha = bcrypt.hashSync(usuario.senha, 10);
        this.usuarios.push(usuario);
    }

    alterar(id, usuario) {
        if(id == null || id == undefined || this.usuarios[id] == undefined)
            throw new Error('id_usuario_invalido');
        this.validar(usuario);
        this.usuarios[id] = usuario;
    }

    apagar(id) {
        if(id == null || id == undefined || this.usuarios[id] == undefined)
            throw new Error('id_usuario_invalido');
        this.usuarios.splice(id, 1);
    }

    validar(usuario) {
        if (!usuario.nome) {
            throw new Error('mensagem_nome_invalido');
        }
        if (!usuario.senha) {
            throw new Error('mensagem_senha_invalido');
        }
    }
    autenticar(nome, senha) {
        for (let usuario of this.listar()) {
            
            if (usuario.nome?.toLowerCase() == nome?.toLowerCase() && bcrypt.compareSync(senha, usuario.senha)) {
                return usuario;
            }
        }
        return null;
    }
}

module.exports = UsuarioDao;