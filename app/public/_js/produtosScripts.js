document.addEventListener("DOMContentLoaded", async function(e) {
    if(!sessionStorage.getItem('token'))
        window.location = '/login';
});

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
                        <button onclick="editar(${produto.id});">Editar</button>
                        <button onclick="apagar(${produto.id});">Apagar</button>
                    </td>
                </tr>`
    let historico = document.getElementById("historico")
    historico.innerHTML = text + historico.innerHTML 
}

async function cadastrar(){
    let nome = document.getElementById("nome").value.trim()
    let descricao = document.getElementById("descricao").value.trim()
    let preco = document.getElementById("preco").value.trim()
    let imagem = document.getElementById("imagem").value.trim()
    let produtoId = document.getElementById("produtoId").value.trim()
    let feedback = document.getElementById("feedback")
    if(nome.length == 0){
        alert("Insira um nome válido")
        return
    }
    if(descricao.length == 0){
        alert("Insira uma descrição valida")
        return
    }
    if(preco.length == 0 || preco < 0){
        alert("Insira um preço válido")
        return
    }
    if(!produtoId){
        await incluir({nome,descricao,preco,imagem}, feedback)
    }else{
        await atualizar({id: produtoId,nome,descricao,preco,imagem}, feedback)
    }
    clearForm()
    await listar()
}

async function incluir(produto, feedbackDiv){
    const request =  new URLSearchParams(produto);
    let resposta = await fetch('/api/produtos', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },   
        body: request
    });
    if (resposta.status == 200) {
        feedbackDiv.classList.add('sucesso');
        feedbackDiv.classList.remove('falha');
        feedbackDiv.innerText = "produto cadastrado com sucesso!"
    }
    else {
        feedbackDiv.classList.add('falha');
        feedbackDiv.classList.remove('sucesso');
        feedbackDiv.innerText = "Erro ao cadastrar produto!"
    }
    
}
async function atualizar(produto, feedbackDiv){
        const request =  new URLSearchParams(produto);
    let resposta = await fetch('/api/produtos/'+produto.id, {
        method: 'put',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },   
        body: request
    });
    if (resposta.status == 200) {
        feedbackDiv.classList.add('sucesso');
        feedbackDiv.classList.remove('falha');
        feedbackDiv.innerText = "produto atualizado com sucesso!"
    }
    else {
        feedbackDiv.classList.add('falha');
        feedbackDiv.classList.remove('sucesso');
        feedbackDiv.innerText = "Erro ao atualizado produto!"
    }
    
}
function calcularArea(lado) {
    let valor = (17 / 4) * lado * lado * (1 / Math.tan(Math.PI / 17))
    return valor.toFixed(2);
}
function isMedio(area) {
    return area >= 60 && area <= 80;
}

async function apagar(id) {
    let feedback = document.getElementById("feedback");
    if (confirm('Quer apagar o registro de número ' + id + '?')) {
        let resposta = await fetch('/api/produtos/' + id, {
            method: 'delete',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        });
        if (resposta.status == 200) {
            feedback.classList.add('sucesso');
            feedback.classList.remove('falha');
            feedback.innerText = `Registro ${id} excluido com sucesso!`
            paginaAtual = 1
        }
        else {
            feedback.classList.add('falha');
            feedback.classList.remove('sucesso');
            feedback.innerText = `Erro ao excluir o registro ${id}`
        }
        await listar();
    }
}

async function editar(id) {
    let feedback = document.getElementById("feedback");
    var resposta = await fetch(`/api/produtos/${id}`, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    })
    let produtos = await resposta.json();
    produto = produtos.data
    document.getElementById("btnSubmit").innerText = "Atualizar"
    document.getElementById("nome").value = produto.nome
    document.getElementById("preco").value = produto.preco
    document.getElementById("descricao").value = produto.descricao
    document.getElementById("imagem").value = produto.imagem
    document.getElementById("produtoId").value = produto.id
}

function clearForm(){
    document.getElementById("nome").value = null
    document.getElementById("preco").value = null
    document.getElementById("descricao").value = null
    document.getElementById("imagem").value = ""
    document.getElementById("produtoId").value = null
    document.getElementById("btnSubmit").innerText = "Gravar"
}