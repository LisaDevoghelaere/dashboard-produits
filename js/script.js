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
    catList.classList.add('hidden')
    modal.classList.add('active')
    vendorType();
}
function clickDelete(id){
    modal.classList.remove('active');
}
modalClose.addEventListener('click' , function(){
    modal.classList.remove('active');
    showStatic();
})

//switchmode
const staticElements = document.getElementsByClassName('m-static');
const modifElements = document.getElementsByClassName('m-modif');

function showModif(){
    for(let i = 0 ; i<staticElements.length ; i++){
        staticElements[i].classList.add('hide');
    }
    for(let i = 0 ; i<modifElements.length ; i++){
        modifElements[i].classList.remove('hide');
    }
}
function showStatic(){
    for(let i = 0 ; i<staticElements.length ; i++){
        staticElements[i].classList.remove('hide');
    }
    for(let i = 0 ; i<modifElements.length ; i++){
        modifElements[i].classList.add('hide');
    }
}

function createActivate(){
    showModif();
    loadModal();
}

window.onload=function(){
    showStatic();
}

function modifActivate(){
    showModif();

}
function modifValidate(){
    showStatic();
}

//vendor type

const vendorTypeInput = document.getElementById('form-vendor');
function vendorTypeChange(){
    vendorType();
}

function vendorType(){

    let type = vendorTypeInput.value;
    const vendorElements1 = document.getElementsByClassName('vendor1')
    const vendorElements2 = document.getElementsByClassName('vendor2')
    if(type==1){
        for(let i = 0 ; i<vendorElements1.length ; i++){
            vendorElements1[i].removeAttribute('disabled');
            vendorElements1[i].classList.remove('transp');
        }
        for(let i = 0 ; i<vendorElements2.length ; i++){
            vendorElements2[i].setAttribute('disabled',"true");
            vendorElements2[i].classList.add('transp');
        }
    }else{
        for(let i = 0 ; i<vendorElements1.length ; i++){
            vendorElements1[i].setAttribute('disabled',"true");
            vendorElements1[i].classList.add('transp');
        }
        for(let i = 0 ; i<vendorElements2.length ; i++){
            vendorElements2[i].removeAttribute('disabled');
            vendorElements2[i].classList.remove('transp');
        }
    }
}


//delete modale
const deleteModal = document.getElementById('delete-modal');
const modalDeleteClose = document.getElementById('modal-delete-close');
const deleteNo = document.getElementById('delete-no');

function clickDelete(id){
    catList.classList.add('hidden')
    deleteModal.classList.add('active')
}
modalDeleteClose.addEventListener('click' , function(){
    deleteModal.classList.remove('active');
})
deleteNo.addEventListener('click' , function(){
    deleteModal.classList.remove('active');
})

function deleteProduct(index){
    deleteModal.classList.remove('active');
}


//upload picture modale
const uppicModal = document.getElementById('uppic-modal');
const modalUppicClose = document.getElementById('modal-uppic-close');

modalUppicClose.addEventListener('click' , function(){
    uppicModal.classList.remove('active');
})

function uppicValidate(index){
    uppicModal.classList.remove('active');
}
function uploadPictureClick(index){
    uppicModal.classList.add('active');
}

//upload ticket modale
const upTicketModal = document.getElementById('upticket-modal');
const modalUpTicketClose = document.getElementById('modal-upticket-close');

modalUpTicketClose.addEventListener('click' , function(){
    upTicketModal.classList.remove('active');
})

function upticketValidate(index){
    upTicketModal.classList.remove('active');
}
function uploadTicketClick(index){
    upTicketModal.classList.add('active');
}


//upload manual modale
const upManualModal = document.getElementById('upmanual-modal');
const modalUpManualClose = document.getElementById('modal-upmanual-close');

modalUpManualClose.addEventListener('click' , function(){
    upManualModal.classList.remove('active');
})

function upmanualValidate(index){
    upManualModal.classList.remove('active');
}
function uploadManualClick(index){
    upManualModal.classList.add('active');
}


//new categorie modale
const newCatModal = document.getElementById('newcat-modal');
const newCatClose = document.getElementById('modal-newcat-close');

newCatClose.addEventListener('click' , function(){
    newCatModal.classList.remove('active');
})

function newcatClick(index){
    newCatModal.classList.remove('active');
}
function newCategorieClick(index){
    newCatModal.classList.add('active');
}
