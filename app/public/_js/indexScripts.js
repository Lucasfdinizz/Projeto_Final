document.addEventListener("DOMContentLoaded", async function(e) {
    await listar()
});



async function listar(){
    let historicoDiv = document.getElementById("historico")
    historicoDiv.innerHTML = `
        <tr>
            <td colspan=4>Carregando...</td>
        </tr>
        `
    var resposta = await fetch(`/api/produtos?page=${paginaAtual}`)
    let produtos = await resposta.json();
    paginaTotal = produtos.total
    dadosPaginados()
    if(produtos.total == 0){
    historicoDiv.innerHTML = `
            <tr>
                <td colspan=4>Não há registros</td>
            </tr>
        `
        return
    }
    historicoDiv.innerHTML = '';
    for (let produto of produtos.data) {
        textoProduto(produto)
    }
    
}

function textoProduto(produto){
    let text = `<tr>
                    <td>${produto.nome}</td>
                    <td>${produto.descricao}</td>
                    <td>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                        produto.preco
                      )}</td>
                    <td><img style="width: 150px; height: 150px;" src="/images/${produto.imagem}"></td>
                    <td>
                        <a href="/pages/produtos/${produto.id}">Detalhes</a>
                    </td>
                </tr>`
    let historico = document.getElementById("historico")
    historico.innerHTML = text + historico.innerHTML 
}
