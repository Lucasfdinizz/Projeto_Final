const http = require('http');
const { parse } = require('querystring');
const IndexController = require('./controllers/IndexController'); 
const EstaticoController = require('./controllers/EstaticoController');
const AutorController = require('./controllers/AutorController'); 
const ProdutosController = require('./controllers/ProdutosController');
const AuthController = require('./controllers/AuthController');
const UsuarioController = require('./controllers/UsuariosController');
const UsuarioMysqlDao = require('./models/UsuarioMysqlDao'); 
const ProdutosMysqlDao = require('./models/ProdutoMysqlDao'); 
const PORT = 3000;
const mysql = require('mysql');
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'bd',
    user            : process.env.MARIADB_USER,
    password        : process.env.MARIADB_PASSWORD,
    database        : process.env.MARIADB_DATABASE
});

let usuarioDao = new UsuarioMysqlDao(pool);
let produtoDao = new ProdutosMysqlDao(pool);
let produtosController = new ProdutosController(produtoDao);
let usuarioController = new UsuarioController(usuarioDao);
let authController = new AuthController(usuarioDao);
let estaticoController = new EstaticoController();

const server = http.createServer(function (req, res) {
    let [url, queryString] = req.url.split('?');
    let urlList = url.split('/');
    source = urlList[1];
    url = urlList[2];
    id = urlList[3];
    let metodo = req.method
    
    if (source == 'login') {
        authController.index(req, res);
    } 
    else if (source == 'registrar') {
        authController.register(req, res);
    } 
    else if (source == 'api' && url == 'autenticar') {
        authController.autenticar(req, res);
    } 
    else if (source == 'index' || !source) {
        const controller = new IndexController();
        controller.index(req, res);    
    } 
    else if (source == 'autor') {
        const controller = new AutorController();
        controller.autor(req, res);
    } 
    else if (source == 'pages' && url == 'produtos' && metodo == 'GET') {
        if(id){
            produtosController.detalhes(req, res, id);
        }else{
            produtosController.index(req, res);
        }
    }
    else if (source == 'pages' && url == 'usuarios' && metodo == 'GET') {
        usuarioController.index(req, res)
    }
    else if (source == 'api' && url == 'usuarios' && metodo == 'GET') {
        if(id){
            authController.autorizar(req, res, function() {
                usuarioController.buscarUsuarioPorId(req, res, id);
            },['Admin']);
        }else{
            authController.autorizar(req, res, function() {
                usuarioController.listar(req, res)
            },['Admin']);
        }
    }
    else if (source == 'api' && url == 'usuarios' && metodo == 'POST') {
            usuarioController.inserir(req, res);
    }
    else if (source == 'api' && url == 'usuarios' && metodo == 'PUT') {
        authController.autorizar(req, res, function() {
            usuarioController.alterar(req, res);
        },['Admin']);
    }
    else if (source == 'api' && url == 'usuarios' && id && metodo == 'DELETE') {
        authController.autorizar(req, res, function() {
            usuarioController.apagar(req, res, id);
       },['Admin']);
    } 
    else if (source == 'api' && url == 'produtos' && metodo == 'GET') {
        if(id){
            produtosController.buscarProdutoPorId(req, res, id);
        }else{
            produtosController.listar(req, res);
        }
    }
    else if (source == 'api' && url == 'produtos' && metodo == 'POST') {
        authController.autorizar(req, res, function() {
            produtosController.inserir(req, res);
        },['Admin']);
    }
    else if (source == 'api' && url == 'produtos' && id && metodo == 'PUT') {
        authController.autorizar(req, res, function() {
            produtosController.alterar(req, res, id);
        },['Admin']);
    }
    else if (source == 'api' && url == 'produtos' && id && metodo == 'DELETE') {
        authController.autorizar(req, res, function() {
            produtosController.apagar(req, res, id);
        },['Admin']);
    } 
    else {
        estaticoController.procurar(req, res);
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});