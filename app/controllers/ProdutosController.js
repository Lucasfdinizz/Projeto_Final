const Produto = require('../models/Produto');
const utils = require('../helpers/utils');

class ProdutoController {

    constructor(ProdutoDao) {
      this.ProdutosDao = ProdutoDao;
    }

    index(req, res) {
        const ProdutosView = require('../views/produtos/produtosView'); 
        const html = new ProdutosView().render();
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }

    async detalhes(req, res, id) {
      let Produto = await this.ProdutosDao.detalhes(id)
      if(!Produto)
        return utils.naoEncontrado(req, res);
      const ProdutosView = require('../views/produtos/produtosDetails'); 
      const html = new ProdutosView(Produto).render();
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(html);
      res.end();
    }

    async buscarProdutoPorId(req, res, id) {
      let Produto = await this.ProdutosDao.detalhes(id)
      return utils.renderizarJSON(res, { data: Produto})
    }

    async listar(req, res) {
      let [ url, queryString ] = req.url.split('?');
      const params = utils.decoficarUrl(queryString)
      const pagina = (!params.page)? 1 : params.page
      let Produtos = await this.ProdutosDao.listar(pagina)
      let totalProdutos = await this.ProdutosDao.pageCount()
      let totalPaginas = Math.round(totalProdutos/process.env.PAGE_SIZE)
      utils.renderizarJSON(res, { data: Produtos.reverse(), total: totalPaginas})
    }

    async inserir(req, res) {
      try {
          var body = await utils.getBody(req);
          let produto = new Produto(body.nome,body.descricao,body.preco,body.imagem)
          this.ProdutosDao.inserir(produto);
          utils.renderizarJSON(res,{
              mensagem: 'mensagem_produto_cadastrado'
          });
      } 
      catch (e) {
          utils.renderizarJSON(res, {
              mensagem: e.message
          }, 400);
      }
    }

    async alterar(req, res, id) {
      
      try {
        var body = await utils.getBody(req);
        let produto = new Produto(body.nome,body.descricao,body.preco,body.imagem)
        this.ProdutosDao.alterar(id, produto) 
        utils.renderizarJSON(res,{ 
            mensagem: 'mensagem_produto_alterado'
          });
      } 
      catch (e) {
          utils.renderizarJSON(res, {
              mensagem: e.message
          }, 400);
      }
    }

    async apagar(req, res, id){
      try {
        this.ProdutosDao.apagar(id) 
        utils.renderizarJSON(res,{
            mensagem: 'mensagem_produto_excluido'
          });
      } 
      catch (e) {
          utils.renderizarJSON(res, {
              mensagem: e.message
          }, 400);
      }
    }
}

module.exports = ProdutoController