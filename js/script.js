// liste categories
const title =document.getElementById('title');
const catList =document.getElementById('categorieList');

title.addEventListener('click' , function(){
    console.log('click')
    catList.classList.toggle('hidden')
})

//modale
const modal = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');

function loadModal(id){
    modal.classList.add('active')
    console.log('loadmodal');
}
function clickDelete(id){
    modal.classList.remove('active');
    console.log('clickdelete');
}
modalClose.addEventListener('click' , function(){
    modal.classList.remove('active');
})