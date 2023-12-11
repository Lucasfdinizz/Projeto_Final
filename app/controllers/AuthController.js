const jwt = require('jsonwebtoken');
const utils = require('../helpers/utils');
const loginView = require('../views/loginView');
const registerView = require('../views/registerView');
class AuthController {
    constructor(usuarioDao){
        this.view = new loginView();
        this.usuarioDao = usuarioDao;
        this.SEGREDO_JWT = process.env.SEGREDO_JWT;
    }
    index(req, res) {
        const html = this.view.render();
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }
    register(req, res){
        const view = new registerView();
        const html = view.render();
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }

    async autenticar(req, res){
        let body = await utils.getBody(req);
        let user = await this.usuarioDao.autenticar(body.nome, body.senha);
        if(user){
            let token = jwt.sign({
                ...user
            }, this.SEGREDO_JWT);
            utils.renderizarJSON(res, {
                token,
                mensagem: 'Usuário logado com sucesso!'
            });
        }else {
            utils.renderizarJSON(res, {
                mensagem: 'Usuário ou senha inválidos!'
            }, 401);
        }
    }

    async autorizar(req, res, proximoControlador, papeisPermitidos) {
        let token = req.headers.authorization?.split(' ')[1];
        if(!token){
            res.setHeader('location', '/login');
            res.statusCode = 302;
            res.end();
            return;
        }
        try {
            let usuario = jwt.verify(token, this.SEGREDO_JWT);
            req.usuario = usuario;
            let papel = await this.usuarioDao.getPapel(usuario.id_papel)
            if(papel.length > 0)
                usuario.papel = papel[0].nome
            if (papeisPermitidos.includes(usuario.papel) || papeisPermitidos.length == 0) {
                proximoControlador();
            }
            else {
                utils.renderizarJSON(res, {
                    mensagem: 'Não autorizado!'
                }, 403);
            }

        } catch (e) {
            utils.renderizarJSON(res, {
                mensagem: 'Não autenticado!'
            }, 401);
        }

    }
}

module.exports = AuthController;
