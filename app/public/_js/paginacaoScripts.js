let paginaAtual = 1
let paginaTotal = 0
function dadosPaginados(){
    let paginacaoDiv = document.getElementById("paginacao")
    if(paginaTotal == 0){
            paginacaoDiv.innerHTML = ""
            return
    }
        
      let links = []

      for(let i = 1; i <= paginaTotal; i++){
            links.push(`<a ${paginaAtual == i ? `class=active` : ``} href="javascript:void(0)" onclick="navegarPagina(${i});">${i}</a>`)
      }
      let anterior = `<a ${(paginaTotal > 1 && paginaAtual > 1) ? `onclick="navegarPagina(${paginaAtual - 1});"` : "class='disabled'"} href="javascript:void(0)">&laquo;</a>` 
      let proximo =  `<a ${(paginaTotal > 1 && paginaAtual < paginaTotal) ? `onclick="navegarPagina(${paginaAtual + 1});"` : "class='disabled'"} href="javascript:void(0)">&raquo;</a>` 
      links = [anterior, ...links, proximo]
      paginacaoDiv.innerHTML = `${links.join("\n")}`
}
async function navegarPagina(pagina){
    paginaAtual = pagina
    await listar()
}