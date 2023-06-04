let login;

firebase.database().ref('login').once('value',(snap)=>{
  login = snap.val();
  console.log(login);
});

function hideAll(){
    document.querySelectorAll('#content .areaDeTrabalho').forEach(element => {
        // element.style.display = 'none';
        element.classList.add('visually-hidden');
    });
}

hideAll();

function showSelected(target){
    hideAll();
    document.querySelector('#'+target).classList.remove("visually-hidden");
}

function Sair(){
    localStorage.removeItem('user');
    location.href = 'index.html';
}

function salvarProdutos(){
    let novoProduto = {
        codBarra : document.querySelector('#codBarra').value,
        nomeProduto : document.querySelector('#nomeProduto').value,
        categoria : setProdutoCategoria(document.querySelector('#categoria').value),
        fabricante : document.querySelector('#fabricante').value,
        quantidade : document.querySelector('#quantidade').value,
        valor : document.querySelector('#valor').value,
    }
    console.log(novoProduto);
    firebaseSave("produtos/"+ novoProduto.categoria, novoProduto);
}

function salvarCliente(){
    let novoCliente = {
        Cod : document.querySelector('#clienteCod').value,
        RG : document.querySelector('#clienteRG').value,
        CPF : document.querySelector('#clienteCPF').value,
        Nome : document.querySelector('#clienteNome').value,
        Endereco : document.querySelector('#clienteEndereco').value,
        Telefone : document.querySelector('#clienteTelefone').value,
        Email : document.querySelector('#clienteEmail').value,
    }
    console.log(novoCliente);
    firebaseSave("cliente/"+novoCliente.Nome+"_"+novoCliente.Cod, novoCliente);
}

function salvarVenda(){
    let novoProduto = {
        codBarra : document.querySelector('#codBarra').value,
        nomeProduto : document.querySelector('#nomeProduto').value,
        categoria : setProdutoCategoria(document.querySelector('#categoria').value),
        fabricante : document.querySelector('#fabricante').value,
        quantidade : document.querySelector('#quantidade').value,
        valor : document.querySelector('#valor').value,
    }
    console.log(novoProduto);
    firebaseSave("produtos", novoProduto.categoria, novoProduto);
}

function setProdutoCategoria(indexSelected){
    let toReturn = null;
    if (indexSelected == 1) 
        toReturn = "jogos";

    else if (indexSelected == 2)
        toReturn = "acessorio";

    else if (indexSelected == 3)
        toReturn = "geek";

    return toReturn;
}

function firebaseSave(ref, objToSave){
    firebase.database().ref(ref).set(objToSave);
}