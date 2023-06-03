function initFirebase(){
  // TODO: Replace the following with your app's Firebase project configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAwlOne4lbJFR5fet4Qts6mM5AOQ27-3-k",
    authDomain: "pim-vi-b77e1.firebaseapp.com",
    databaseURL: "https://pim-vi-b77e1-default-rtdb.firebaseio.com",
    projectId: "pim-vi-b77e1",
    storageBucket: "pim-vi-b77e1.appspot.com",
    messagingSenderId: "134368485278",
    appId: "1:134368485278:web:1ea0c61d6872f239e9808f"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

function doLogin(){
  let login;
  firebase.database().ref('login').once('value',(snap)=>{
    login = snap.val();
    console.log(login);
  });
  var username = document.querySelector('#email').value;
  var usernameSplited = username.split('@');
  var pass = document.querySelector('#pwd').value;
  var register = login[usernameSplited[0]];
  if(register && register['host']==[usernameSplited[1]] && register['pass']==pass){
    console.log('user exist');
    logedUser.username = register['username'];
    logedUser.perfil = register['perfil'];
    localStorage.setItem('user', logedUser);
    location.href = 'main.html';
  }else{
    console.log('user not exist');}
}