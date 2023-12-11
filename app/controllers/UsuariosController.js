const Usuario = require('../models/Usuario');
const utils = require('../helpers/utils')

class UsuariosController {

    constructor(usuarioDao) {
      this.usuariosDao = usuarioDao;
    }

    index(req, res) {
      const UsuariosView = require('../views/usuariosView'); 
      const html = new UsuariosView().render();
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(html);
      res.end();
  }

    async buscarUsuarioPorId(req, res, id) {
      let usuario = await this.usuariosDao.detalhes(id)
      return utils.renderizarJSON(res, { data: usuario})
    }

    async listar(req, res) {
      let [ url, queryString ] = req.url.split('?');
      const params = utils.decoficarUrl(queryString)
      const pagina = (!params.page)? 1 : params.page
      let usuarios = await this.usuariosDao.listar(pagina)
      let totalUsuarios = await this.usuariosDao.pageCount()
      let totalPaginas = Math.round(totalUsuarios/process.env.PAGE_SIZE)
      utils.renderizarJSON(res, { data: usuarios.reverse(), total: totalPaginas})
    }

    async inserir(req, res) {
      try {
          var body = await utils.getBody(req); 
          let usuarioCad = await this.usuariosDao.checarUsuario(body.nome);
          if(usuarioCad)
              return utils.renderizarJSON(res, {
                mensagem: "mensagem_usuario_ja_cadastrado"
              }, 400);
          let usuario = new Usuario(body.nome, body.senha)
          await this.usuariosDao.inserir(usuario);
          res.setHeader('location', '/login');
          res.statusCode = 302;
          res.end();
          return;
      } 
      catch (e) {
          utils.renderizarJSON(res, {
              mensagem: e.message
          }, 400);
      }
    }

    async alterar(req, res) {
      
      try {
        var body = await utils.getBody(req);
        let usuario = new Usuario(body.nome, body.senha)
        await this.usuariosDao.alterar(body.id, usuario) 
        utils.renderizarJSON(res, { 
            mensagem: 'mensagem_usuario_alterado'
          });
      } 
      catch (e) {
          utils.renderizarJSON(res, {
              mensagem: e.message
          }, 400);
      }
    }

    async apagar(req, res,id){
      try {
        var body = await utils.getBody(req);
        await this.usuariosDao.apagar(id) 
        utils.renderizarJSON(res,{ 
            mensagem: 'mensagem_usuario_excluido'
          });
      } 
      catch (e) {
          utils.renderizarJSON(res, {
              mensagem: e.message
          }, 400);
      }
    }
}

module.exports = UsuariosController