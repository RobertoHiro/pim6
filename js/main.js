
let listToShow = [];
let vendaLength = 0;
let vendaList = [];
let listProductsInListaVenda = [];

function listarProdutos(needToCreateHtml){

    listToShow = [];
    let listAcessorios=[];
    let listGeek=[];
    let listJogos=[];

    listAcessorios = firebaseListProdutos('produtos/acessorio', needToCreateHtml);
    listGeek = firebaseListProdutos('produtos/geek', needToCreateHtml);
    listJogos = firebaseListProdutos('produtos/jogos', needToCreateHtml);

}

function filtrarLista(event){
    event.preventDefault();
    let arrayFiltered = [];
    let filterValue = document.querySelector('#filterBar').value.trim();
    console.log("filter", filterValue);
    listToShow.filter((e)=>{
        if(e['nomeProduto'].includes(filterValue) 
        || e['codBarra'].includes(filterValue)
        || e['categoria'].includes(filterValue)
        || e['fabricante'].includes(filterValue)
        || e['fabricante'].includes(filterValue)
        ){
            arrayFiltered.push(e);
        }
    });
    
    createProductListItens(arrayFiltered);
}

function createProductListItens(arrayList){
    let divListProduto = document.querySelector('#listItensOfProductis');
    divListProduto.innerHTML = "";
    arrayList.forEach(item=>{
        const htmlListItem = `                
        <div class="row align-items-center border rounded border-solid p-2 m-0">
            <div class="col-12 col-md-4">
            <h4 class="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                `+item['nomeProduto']+`
            </h4>
    
            <div class="text-secondary-d1 text-120">
                Categoria: `+item['categoria']+`
            </div>
            </div>
    
            <ul class="list-unstyled mb-0 col-12 col-md-4 text-dark-l1 text-90 text-left my-4 my-md-0">
                <li>
                    Fabricante: `+item['fabricante']+`
                </li>
    
                <li class="mt-25">
                    Código de Barra: `+item['codBarra']+`
                </li>
            </ul>
    
            <ul class="list-unstyled mb-0 col-12 col-md-4 text-dark-l1 text-90 text-left my-4 my-md-0">
                <li>
                    Valor: `+item['valor']+`
                </li>
    
                <li class="mt-25">
                    Quantidade: `+item['quantidade']+`
                </li>
            </ul>
    
        </div>`;
        divListProduto.innerHTML+=htmlListItem;
    });
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
    firebaseSave("produtos/"+ novoProduto.categoria+"/"+novoProduto.nomeProduto, novoProduto);
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
        Cod : vendaLength,
        Valor : parseFloat(document.querySelector('#vendaValorTotal').innerHTML),
        SelectPayment : document.querySelector('#vendaSelectPayment').value,
        PaymentStatus : document.querySelector('#vendaPaymentStatus').value,
        BuyStatus : document.querySelector('#vendaBuyStatus').value,
        DataVenda: Date.now(),
        ListProdutos: listProductsInListaVenda
    }
    console.log(novaVenda);
    firebaseSave("venda/"+ novaVenda.Cod, novaVenda);
}

function firebaseSave(ref, objToSave){
    firebase.database().ref(ref).set(objToSave);
}

function firebaseListProdutos(ref, needToCreateHtml){
    firebase.database().ref(ref).once('value',(snapshot)=>{
        snapshot.forEach(function(childSnapshot) {
            listToShow.push(childSnapshot.val());
        });
        if(needToCreateHtml)
            createProductListItens(listToShow);
    });
}

function firebaseListVendas(){
    listarProdutos(false);
    firebase.database().ref('venda').once('value',(snapshot)=>{
        // vendaLength = snapshot.length;
        snapshot.forEach(function(childSnapshot) {
            vendaLength++;
            vendaList.push(childSnapshot.val());
        });
        console.log(vendaList);
    });
}

function clearVendaListItens(){
    var htmlToClear = document.querySelector('#listaDeProdutosNaVenda');
    htmlToClear.innerHTML = "";
    listProductsInListaVenda = []
}

function addItemProdutctOnVenda(){
    var codigo = document.querySelector("#valueCod").value;
    var nomeProduto = document.querySelector("#valueNome").value;
    var quantidade = document.querySelector("#valueQunatidade").value;
    console.log('listToShow',listToShow);
    for(let i = 0; i < listToShow.length; i++){
        if(listToShow[i]['codBarra'] == codigo || listToShow[i]['nomeProduto'] == nomeProduto){
            let item = {
                categoria:listToShow[i]['categoria'],
                codBarra:listToShow[i]['codBarra'],
                fabricante:listToShow[i]['fabricante'],
                nomeProduto:listToShow[i]['nomeProduto'],
                quantidade:quantidade,
                valor:listToShow[i]['valor']
            }
            listProductsInListaVenda.push(item);
            console.log(listProductsInListaVenda);
            addHtmlItemProdutctOnVenda(item, quantidade);
            break;
        }
    }
}

function addHtmlItemProdutctOnVenda(item, quantidade){
    var htmlToPopulate = document.querySelector('#listaDeProdutosNaVenda');
    var htmlItemProductOnVenda = `
    <div class="row">
        <div class="col-3">
            <label>`+item['nomeProduto']+`</label>
        </div>
        <div class="col-3">
            <label>`+item['valor']+`</label>
        </div>
        <div class="col-2">
            <label>`+quantidade+`</label>
        </div>
        <div class="col-3">
            <label class="valorTotalItem">`+(item['valor'] * quantidade)+`</label>
        </div>
        <div class="col-1">
            <buttom class="col-1 rounded border border-solid" 
            onclick="deleteThisProduct(`+(listProductsInListaVenda.length-1)+`)">
            -</buttom>
        </div>

    </div>
        `;

    htmlToPopulate.innerHTML+=htmlItemProductOnVenda;

    var vendaValorTotal = document.querySelector('#vendaValorTotal');
    let valorTotalCalculado = 0.0;
    var allValorTotalItem = document.querySelectorAll('.valorTotalItem');
    allValorTotalItem.forEach(valorParaSomar => {
        // console.log(valorParaSomar.innerHTML);
        valorTotalCalculado += parseFloat(valorParaSomar.innerHTML);
    })
    // console.log(valorTotalCalculado);
    vendaValorTotal.innerHTML = valorTotalCalculado;
}

function deleteThisProduct(index){
    // listProductsInListaVenda.splice(index,-1);
    // delete listProductsInListaVenda[index];
    let copyArray = listProductsInListaVenda;
    listProductsInListaVenda=[];
    for (let i = 0; i < copyArray.length; i++){
        if(i != index){
            listProductsInListaVenda.push(copyArray[i]);
            addHtmlItemProdutctOnVenda(copyArray[i], copyArray[i]['quantidade']);
        }
    }
    // listProductsInListaVenda = copyArray;

    console.log(listProductsInListaVenda);

    var htmlToClear = document.querySelector('#listaDeProdutosNaVenda');
    htmlToClear.innerHTML = "";

    listProductsInListaVenda.forEach(item => {
            addHtmlItemProdutctOnVenda(item, item['quantidade']);
    });
}



firebaseListVendas();