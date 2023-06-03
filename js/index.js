logedUser = {
    username:'',
    perfil:''
}

var logedUser = localStorage.getItem('user');
if (localStorage.getItem('user')){
    location.href = 'main.html';
}