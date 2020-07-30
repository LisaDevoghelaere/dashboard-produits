// liste categories
const title =document.getElementById('title');
const catList =document.getElementById('categorieList');
const prod_Vendor_Type_input = document.getElementById('prod_Vendor_Type_input');
let product_id = 0;

title.addEventListener('click' , function(){
    catList.classList.toggle('hidden');
})

//modale
const modal = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');
let idProduit = 0;

function loadModal(id){
    product_id=id;
    catList.classList.add('hidden')
    modal.classList.add('active')
    vendorType();

    const prod_Picture = document.getElementById('prod_Picture');
    const prod_Ticket = document.getElementById('prod_Ticket');
    const prod_Name = document.getElementById('prod_Name');
    const prod_Name_input = document.getElementById('prod_Name_input');
    const prod_Serial = document.getElementById('prod_Serial');
    const prod_Serial_input = document.getElementById('prod_Serial_input');
    const prod_Categorie = document.getElementById('prod_Categorie');
    const prod_Categorie_input = document.getElementById('prod_Categorie_input');
    const prod_Price = document.getElementById('prod_Price');
    const prod_Price_input = document.getElementById('prod_Price_input');
    const prod_Date = document.getElementById('prod_Date');
    const prod_Date_input = document.getElementById('prod_Date_input');
    const prod_Warranty = document.getElementById('prod_Warranty');
    const prod_Warranty_input = document.getElementById('prod_Warranty_input');
    const prod_Vendor_Name = document.getElementById('prod_Vendor_Name');
    const prod_Vendor_Name_input = document.getElementById('prod_Vendor_Name_input');
    const prod_Vendor_Address = document.getElementById('prod_Vendor_Address');
    const prod_Vendor_Street_input = document.getElementById('prod_Vendor_Street_input');
    const prod_Vendor_Code_input = document.getElementById('prod_Vendor_Code_input');
    const prod_Vendor_City_input = document.getElementById('prod_Vendor_City_input');
    const prod_Vendor_URL = document.getElementById('prod_Vendor_URL');
    const prod_Vendor_URL_input = document.getElementById('prod_Vendor_URL_input');
    const prod_Tips = document.getElementById('prod_Tips');
    const prod_Tips_input = document.getElementById('prod_Tips_input');

    const formData = new FormData();
    formData.append('id', JSON.stringify(id));

    fetch( 'back/ajax_produit_by_id.php', { method : "post" , body : formData } )
        .then( res => res.json() ).then( data =>{

        // image
            if(data.picture[0]!=false){
                prod_Picture.setAttribute('src' , data.picture[0]);
            }
            else{
                prod_Picture.setAttribute('src' , 'images/product-main/placeholder.jpg');
            }

        // ticket
            if(data.ticket!=""){
                prod_Picture.setAttribute('src' , data.ticket);
            }
            else{
                prod_Picture.setAttribute('src' , 'images/product-ticket/placeholder.jpg');
            }

        //nom produit
            prod_Name.innerText = data.name;
            prod_Name_input.value = data.name;

        //numero de serie
            prod_Serial.innerText = data.serial;
            prod_Serial_input.value = data.serial;

        //categorie
            prod_Categorie.innerText = data.categorie;
            prod_Categorie_input.value = data.categorie_id;

        //prix
            prod_Price.innerText = data.price;
            prod_Price_input.value = data.price;

        //prix
            prod_Date.innerText = data.date;
            prod_Date_input.value = data.date;

        //garantie
            prod_Warranty.innerText = data.warranty;
            prod_Warranty_input.value = data.warranty;

        //vendeur nom
            prod_Vendor_Name.innerText = data.vendor_name;
            prod_Vendor_Name_input.value = data.vendor_name;

        // vendeur adresse
            prod_Vendor_Address.innerText = data.vendor_street+" - "+data.vendor.code+" - "+data.vendor.city;
            prod_Vendor_Name_input.value = data.vendor_name;
            prod_Vendor_Street_input.value = data.vendor_street;
            prod_Vendor_Code_input.value = data.vendor_code;
            prod_Vendor_City_input.value = data.vendor_city;

        //vendeur url
            prod_Vendor_URL.innerText = data.vendor_url;
            prod_Vendor_URL_input.value = data.vendor_url;

        //conseils
            prod_Tips.innerText = data.vendor_url;
            prod_Tips_input.value = data.vendor_url;

        })

}
function clickDelete(){
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
function vendorTypeChange(){
    vendorType();
}

function vendorType(){

    let type = prod_Vendor_Type_input.value;
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

function deleteProduct(){
    deleteModal.classList.remove('active');
}


//upload picture modale
const uppicModal = document.getElementById('uppic-modal');
const modalUppicClose = document.getElementById('modal-uppic-close');

modalUppicClose.addEventListener('click' , function(){
    uppicModal.classList.remove('active');
})

function uppicValidate(){
    uppicModal.classList.remove('active');
}
function uploadPictureClick(){
    uppicModal.classList.add('active');
}

//upload ticket modale
const upTicketModal = document.getElementById('upticket-modal');
const modalUpTicketClose = document.getElementById('modal-upticket-close');

modalUpTicketClose.addEventListener('click' , function(){
    upTicketModal.classList.remove('active');
})

function upticketValidate(){
    upTicketModal.classList.remove('active');
}
function uploadTicketClick(){
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
