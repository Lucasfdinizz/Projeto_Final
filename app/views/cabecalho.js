class Cabecalho {
  static render() {
    return `
      <div class="topnav">
        <a href="/index">Início</a>
        <div id="AuthMenu">     
        </div>       
        <a href="/autor">Autor</a>
        <div id="AuthHeader" style="float: right">     
        </div>
      </div>
    `;
  }
}

module.exports = Cabecalho;