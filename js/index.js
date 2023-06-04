let logedUser = {
  email: '',
  pass: '',
  username: '',
  perfil: ''
}

if (localStorage.getItem('user')) {
  logedUser = localStorage.getItem('user');
  location.href = 'main.html';
}

let login;

firebase.database().ref('login').once('value', (snap) => {
  login = snap.val();
  console.log(login);
});

function doLogin(event) {
  event.preventDefault();
  var username = document.querySelector('#email').value;
  var usernameSplited = username.split('@');
  var pass = document.querySelector('#password').value;
  var register = login[usernameSplited[0]];
  if (register && register['host'] == [usernameSplited[1]] && register['pass'] == pass) {
    console.log('user exist');
    console.log(register);
    logedUser.email = username;
    logedUser.pass = register['perfil'];
    logedUser.username = register['username'];
    logedUser.perfil = register['perfil'];
    localStorage.setItem('user', logedUser);
    location.href = 'main.html';
  } else {
    console.log('user not exist');
  }
}

/*Light/darkmode */

const mode = document.getElementById('mode_icon');

mode.addEventListener('click', () => {
  const form = document.getElementById('login_form');

  if (mode.classList.contains('fa-moon')) {
    mode.classList.remove('fa-moon');
    mode.classList.add('fa-sun');

    form.classList.add('dark');
    return;
  }

  mode.classList.remove('fa-sun');
  mode.classList.add('fa-moon');

  form.classList.remove('dark');
});