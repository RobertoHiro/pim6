function listarProdutos(){
    let listAcessorios=[];
    let listGeek=[];
    let listJogos=[];

    listAcessorios = firebaseList('produtos/acessorio');
    listGeek = firebaseList('produtos/geek');
    listJogos = firebaseList('produtos/jogos');


}

function createListItens(){
    
}

function hideAll(){
    document.querySelectorAll('#content .areaDeTrabalho').forEach(element => {
        // element.style.display = 'none';
        element.classList.add('visually-hidden');
    });
}

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
        categoria : document.querySelector('#categoria').value,
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
        DataCadastro: Date.now(),
    }
    console.log(novoCliente);
    firebaseSave("cliente/"+novoCliente.Nome+"_"+novoCliente.Cod, novoCliente);
}

function salvarVenda(){
    let novaVenda = {
        Cod : document.querySelector('#vendaCod').value,
        Valor : document.querySelector('#vendaValor').value,
        SelectPayment : document.querySelector('#vendaSelectPayment').value,
        PaymentStatus : document.querySelector('#vendaPaymentStatus').value,
        BuyStatus : document.querySelector('#vendaBuyStatus').value,
        DataVenda: Date.now(),
    }
    console.log(novaVenda);
    firebaseSave("venda/"+ novaVenda.Cod, novaVenda);
}

function firebaseSave(ref, objToSave){
    firebase.database().ref(ref).set(objToSave);
}

function firebaseList(ref){
    let toReturn = [];
    firebase.database().ref(ref).once('value',(snap)=>{
        snapshot.forEach(function(childSnapshot) {
            toReturn.push(childSnapshot);
        });
    });
}