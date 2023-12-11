const utils = {
    renderizarJSON: function (res, dados, status=200) {
        res.writeHead(status, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(dados));
        res.end();
    },
    decoficarUrl: function (url) {
      let propriedades = url.split('&');
      let query = {};
      for (let propriedade of propriedades) {
          let [ variavel, valor ] = propriedade.split('=');
          query[variavel] = valor;
      }
      return query;
    },
    getBody: function (request) {
        return new Promise((resolve) => {
          let corpoTexto = '';
          request.on('data', function (pedaco) {
              corpoTexto += pedaco;
          });
          request.on('end', () => {
            console.log(corpoTexto)
              let corpo = utils.decoficarUrl(corpoTexto);
              resolve(corpo);
          });
        });
    },    
    naoEncontrado(req, res) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>`);
        res.write('<h1>Não encontrado!</h1>');
        res.write(`</body>
        </html>`);
        res.end();
    }
}

module.exports = utils;