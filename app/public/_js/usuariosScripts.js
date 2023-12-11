document.addEventListener("DOMContentLoaded", async function(e) {
    await listar()
});



async function listar(){
    let historicoDiv = document.getElementById("historico")
    historicoDiv.innerHTML = `
        <tr>
            <td colspan=2>Carregando...</td>
        </tr>
        `
    var resposta = await fetch(`/api/usuarios?page=${paginaAtual}`, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    })
    let usuarios = await resposta.json();
    paginaTotal = usuarios.total
    dadosPaginados()
    if(usuarios.total == 0){
    historicoDiv.innerHTML = `
            <tr>
                <td colspan=2>Não há registros</td>
            </tr>
        `
        return
    }
    historicoDiv.innerHTML = '';
    for (let usuario of usuarios.data) {
        textoUsuario(usuario)
    }
    
}

function textoUsuario(usuario){
    let text = `<tr>
                    <td>${usuario.nome}</td>
                    <td>
                        <button onclick="editar(${usuario.id});">Editar</button>
                        <button onclick="apagar(${usuario.id});">Apagar</button>
                    </td>
                </tr>`
    let historico = document.getElementById("historico")
    historico.innerHTML = text + historico.innerHTML 
}

document.addEventListener("DOMContentLoaded", async function(e) {
    if(!sessionStorage.getItem('token'))
        window.location = '/login';
});


async function novoUsuario(){
    let nome = document.getElementById("nome").value.trim()
    let senha = document.getElementById("senha").value.trim()
    let usuarioId = document.getElementById("usuarioId").value.trim()
    let feedback = document.getElementById("feedback")
    if(nome.length == 0){
        alert("Insira um nome válido")
        return
    }
    if(senha.length == 0){
        alert("Insira uma senha válida")
        return
    }
    if(!usuarioId){
        await incluir({senha,nome}, feedback)
    }else{
        await atualizar({id: usuarioId,senha,nome}, feedback)
    }
    clearForm()
    await listar()
}

async function incluir(usuario, feedbackDiv){
    const request =  new URLSearchParams(usuario);
    let resposta = await fetch('/api/usuarios', {
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
        feedbackDiv.innerText = "Usuário cadastrado com sucesso!"
    }
    else {
        feedbackDiv.classList.add('falha');
        feedbackDiv.classList.remove('sucesso');
        feedbackDiv.innerText = "Erro ao cadastrar usuário!"
    }
    
}
async function atualizar(usuario, feedbackDiv){
    const request =  new URLSearchParams(usuario);
    let resposta = await fetch('/api/usuarios/'+usuario.id, {
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
        feedbackDiv.innerText = "usuario atualizado com sucesso!"
    }
    else {
        feedbackDiv.classList.add('falha');
        feedbackDiv.classList.remove('sucesso');
        feedbackDiv.innerText = "Erro ao atualizado usuario!"
    }
    
}

async function apagar(id) {
    let feedback = document.getElementById("feedback");
    if (confirm('Quer apagar o registro de número ' + id + '?')) {
        let resposta = await fetch('/api/usuarios/' + id, {
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
    var resposta = await fetch(`/api/usuarios/${id}`, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    })
    let usuarios = await resposta.json();
    usuario = usuarios.data
    document.getElementById("btnSubmit").innerText = "Atualizar"
    document.getElementById("nome").value = usuario.nome
    document.getElementById("senha").value = null
    document.getElementById("usuarioId").value = usuario.id
}

function clearForm(){
    document.getElementById("nome").value = null
    document.getElementById("senha").value = null
    document.getElementById("usuarioId").value = null
    document.getElementById("btnSubmit").innerText = "Criar"
}