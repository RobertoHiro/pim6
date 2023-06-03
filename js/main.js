// var 

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