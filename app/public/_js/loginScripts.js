async function autenticar(){
    let nome = document.getElementById("nome").value.trim()
    let senha = document.getElementById("senha").value.trim()
    let divResposta = document.getElementById('resposta');
    const request =  new URLSearchParams({nome,senha});
    let resposta = await fetch('/api/autenticar', {
        method: 'post',
        body: request
    });
    let json = await resposta.json();
    if (resposta.status == 200) {
        sessionStorage.setItem('token', json.token);
        window.location = '/index';
    }
    else {
        divResposta.innerText = json.mensagem;
    }
}