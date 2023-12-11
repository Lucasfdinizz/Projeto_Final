let fs = require('fs');
let path = require('path')
let utils = require('../helpers/utils')

class EstaticoController {
    async procurar(req, res) {
        try {
            const caminho = path.normalize('./public' + req.url).replace(/^(\.\.[\/\\])+/, '');
            let dados = fs.readFileSync(caminho);
            res.writeHead(200);
            res.write(dados);
            res.end();
        } catch (e) {
            utils.naoEncontrado(req, res);
        }
    }
}

module.exports = EstaticoController;