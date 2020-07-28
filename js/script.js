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
    console.log('type'+type)
    const vendorElements1 = document.getElementsByClassName('vendor1')
    console.log(vendorElements1);
    const vendorElements2 = document.getElementsByClassName('vendor2')
    console.log(vendorElements2);
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
