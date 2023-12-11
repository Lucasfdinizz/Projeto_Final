
const isAuth = sessionStorage.getItem('token');
document.addEventListener("DOMContentLoaded", async function(e) {
    const authDiv = document.getElementById("AuthHeader")
    const authMenuDiv = document.getElementById("AuthMenu")
    authDiv.innerHTML = (!isAuth) ? `<a href="/login">Login</a>` : `<a onclick="Logout()" href="/login">Logout</a>`
    authMenuDiv.innerHTML = (!isAuth) ? '':
    `<a href="/pages/produtos">Produtos</a>
     <a href="/pages/usuarios">Usuários</a>`;
})

function Logout(){
    sessionStorage.removeItem('token')
}