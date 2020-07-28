// liste categories
const title =document.getElementById('title');
const catList =document.getElementById('categorieList');

title.addEventListener('click' , function(){
    catList.classList.toggle('hidden');
})

//modale
const modal = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');

function loadModal(id){
    modal.classList.add('active')
}
function clickDelete(id){
    modal.classList.remove('active');
}
modalClose.addEventListener('click' , function(){
    modal.classList.remove('active');
})

//switchmode
const staticElements = document.getElementsByClassName('m-static');
const modifElements = document.getElementsByClassName('m-modif');

window.onload=function(){
    for(let i = 0 ; i<staticElements.length ; i++){
        staticElements[i].classList.remove('hide');
    }
    for(let i = 0 ; i<modifElements.length ; i++){
        modifElements[i].classList.add('hide');
    }
}

function modifActivate(){
    console.log('activate')
    console.log(staticElements.length)
    for(let i = 0 ; i<staticElements.length ; i++){
        console.log(staticElements[i]);
        staticElements[i].classList.add('hide');
    }
    for(let i = 0 ; i<modifElements.length ; i++){
        modifElements[i].classList.remove('hide');
    }
}
function modifValidate(){
    console.log(staticElements);
    for(let i = 0 ; i<staticElements.length ; i++){
        staticElements[i].classList.remove('hide');
    }
    for(let i = 0 ; i<modifElements.length ; i++){
        modifElements[i].classList.add('hide');
    }
}
