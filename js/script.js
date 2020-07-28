const title =document.getElementById('title');
console.log(title)
const catList =document.getElementById('categorieList');

title.addEventListener('click' , function(){
    console.log('click')
    catList.classList.toggle('hidden')
})