let logedUser = {
    email:'',
    pass:'',
    username:'',
    perfil:''
}

if (localStorage.getItem('user')){
    logedUser = localStorage.getItem('user');
    location.href = 'main.html';
}

let login;

firebase.database().ref('login').once('value',(snap)=>{
  login = snap.val();
  console.log(login);
});

function doLogin(){
    var username = document.querySelector('#email').value;
    var usernameSplited = username.split('@');
    var pass = document.querySelector('#pwd').value;
    var register = login[usernameSplited[0]];
    if(register && register['host']==[usernameSplited[1]] && register['pass']==pass){
      console.log('user exist');
      console.log(register);
      logedUser.email = username;
      logedUser.pass = register['perfil'];
      logedUser.username = register['username'];
      logedUser.perfil = register['perfil'];
      localStorage.setItem('user', logedUser);
      location.href = 'main.html';
    }else{
      console.log('user not exist');}
  }