const Cabecalho = require('../cabecalho');
class MainTemplate {
    constructor(innerHtml, customHeaders) {
        this.innerHtml = innerHtml;
        this.customHeaders = customHeaders != undefined ? customHeaders.join("\n") : "";
    }
    render() {
      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="/styles/main.css">
            <link rel="stylesheet" href="/styles/cabecalho.css">
            <link rel="stylesheet" href="/styles/admin.css">
           
            <link rel="stylesheet" href="/styles/admin.css">
            <script src="/_js/mainScripts.js"></script>
            ${this.customHeaders}
            <script src="/_js/paginacaoScripts.js"></script>
      </head>
        <header class="header">
          <span class="headerTitle">
              VILUCK
          </span>
          <article>
              <img style="width: 150px; height: 150px;" src="/images/1.1.png" id="logo">
          </article>
        </header>
        <body>     
        ${Cabecalho.render()} 
            <div class="container">    
                
                ${this.innerHtml}
            </div>
        </body>
      </html>
      `;
    }
  }
  
  module.exports = MainTemplate;