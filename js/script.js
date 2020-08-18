const form = document.getElementById('product-form');
const title =document.getElementById('title');
const catList =document.getElementById('categorieList');
const prod_Vendor_Type_input = document.getElementById('prod_Vendor_Type_input');
const prod_Vendor_Title_direct = document.getElementById('title-vente-directe');
const prod_Vendor_Title_ecom = document.getElementById('title-ecom');
const modalTitle = document.getElementById('product-modal-title');
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
const prod_Manual_btn = document.getElementById('prod_Manual_btn');
const pictureHidden = document.getElementById('pictureHidden');
const ticketHidden = document.getElementById('ticketHidden');
const manualHidden = document.getElementById('manualHidden');
let type = 0;
let product_id = 0;
let mode = "";

title.addEventListener('click' , function(){
    catList.classList.toggle('hidden');
})

function blankValues(){
    prod_Picture.setAttribute('src' , 'images/product-main/placeholder.jpg');
    prod_Ticket.setAttribute('src' , 'images/product-ticket/placeholder.jpg');

    //nom produit
        prod_Name_input.value = "";
    //numero de serie
        prod_Serial_input.value = "";
    //categorie
        prod_Categorie_input.value = "";
    //prix
        prod_Price_input.value = "";
    //date achat
        prod_Date_input.value = "";
    //garantie
        prod_Warranty_input.value = "";
    //vendeur nom
        prod_Vendor_Name_input.value = "";

    // vendeur adresse
        prod_Vendor_Type_input.selectedIndex = 0;
        prod_Vendor_Name_input.value = "";
        prod_Vendor_Street_input.value = "";
        prod_Vendor_Code_input.value = "";
        prod_Vendor_City_input.value = "";
    //vendeur url
        prod_Vendor_URL_input.value = "";

    //conseils
        prod_Tips_input.value = "";

    //links
        pictureHidden.value = 'images/product-main/placeholder.jpg';
        ticketHidden.value = 'images/product-ticket/placeholder.jpg';
        manualHidden.value = "";


    //Categories
    const formData = new FormData();
    formData.append('id', JSON.stringify(0));

    fetch( 'back/get_categories.php', { method : "post" , body : formData } )
        .then( res => res.json() ).then( data =>{
            prod_Categorie_input.innerHTML = '';
            for (let i = 0 ; i<data[0].categories.length ; i++){
                let option = document.createElement('option');
                option.innerText = data[0].categories[i];
                option.setAttribute('value',i+1)
                prod_Categorie_input.appendChild(option);
                if(data[0].categorie === data[0].categories[i]){
                    prod_Categorie_input.value=i+1;
                }
        }
        })
    prod_Categorie_input.value=1;
}


//modale
const modal = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');



function loadModal(id){
    product_id=id;
    catList.classList.add('hidden')
    modal.classList.add('active')

    if(mode==="create"){
        blankValues();
        return;
    }

    const formData = new FormData();
    formData.append('id', JSON.stringify(id));
    formData.append('mode', JSON.stringify(mode));

    fetch( 'back/ajax_produit_by_id.php', { method : "post" , body : formData } )
        .then( res => res.json() ).then( data =>{

            const photo = data[2].nom_photo;
            if(photo == undefined){
                prod_Picture.setAttribute('src' , 'images/product-main/placeholder.jpg');
                pictureHidden.value = 'images/product-main/placeholder.jpg';
            }
            else{
                prod_Picture.setAttribute('src' , photo);
                pictureHidden.value = photo;
            }

            const phototicket = data[0].ticket_achat;
            if((phototicket == undefined) || (phototicket == "")){
                prod_Ticket.setAttribute('src' , 'images/product-ticket/placeholder.jpg');
                ticketHidden.value = 'images/product-ticket/placeholder.jpg';
            }
            else{
                prod_Ticket.setAttribute('src' , phototicket);
                ticketHidden.value = phototicket;
            }

        //Categories
        prod_Categorie_input.innerHTML = '';
        for (let i = 0 ; i<data[3].categories.length ; i++){
            let option = document.createElement('option');
            option.innerText = data[3].categories[i];
            option.setAttribute('value',i+1)
            prod_Categorie_input.appendChild(option);
            if(data[0].categorie === data[3].categories[i]){
                prod_Categorie_input.value=i+1;
            }
        }


        //nom produit
            prod_Name.innerText = data[0].nom;
            prod_Name_input.value = data[0].nom;

        //numero de serie
            prod_Serial.innerText = data[0].reference;
            prod_Serial_input.value = data[0].reference;

        //categorie
            prod_Categorie.innerText = data[0].categorie;
            prod_Categorie_input.value = data[0].id_categorie;

        //prix
            prod_Price.innerText = data[0].prix + "€";
            prod_Price_input.value = data[0].prix;

        //date achat
            prod_Date.innerText = data[0].date_achat;
            prod_Date_input.value = data[0].date_achat;

        //garantie
            prod_Warranty.innerText = data[0].date_fin_garantie;
            prod_Warranty_input.value = data[0].date_fin_garantie;

        //vendeur nom
            prod_Vendor_Name.innerText = data[1].nom_vendeur;
            prod_Vendor_Name_input.value = data[1].nom_vendeur;

            if(data[1].url == undefined){
                type=0;
        // vendeur adresse
            prod_Vendor_Type_input.selectedIndex = 0;
            prod_Vendor_Address.innerText = data[1].rue+" - "+data[1].code_postal+" - "+data[1].ville;
            prod_Vendor_Name_input.value = data[1].nom_vendeur;
            prod_Vendor_Street_input.value = data[1].rue;
            prod_Vendor_Code_input.value = data[1].code_postal;
            prod_Vendor_City_input.value = data[1].ville;


        //vendeur url
            prod_Vendor_URL.innerText = "";
            prod_Vendor_URL_input.value = "";
            }
            else{
                type=1;
        // vendeur adresse
            prod_Vendor_Type_input.selectedIndex = 1;
            prod_Vendor_Address.innerText = "";
            prod_Vendor_Name_input.value = "";
            prod_Vendor_Street_input.value = "";
            prod_Vendor_Code_input.value = "";
            prod_Vendor_City_input.value = "";

        //vendeur url
            prod_Vendor_URL.innerText = data[1].url;
            prod_Vendor_URL_input.value = data[1].url;
            }

        //conseils
            prod_Tips.innerText = data[0].conseil;
            prod_Tips_input.value = data[0].conseil;

        //Manuel
            prod_Manual_btn.setAttribute('href', data[0].manuel_utilisation);
            manualHidden.value = data[0].manuel_utilisation;

        vendorType();
        })
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
    modalTitle.classList.remove('hideRight');
}
function showStatic(){
    mode=""
    for(let i = 0 ; i<staticElements.length ; i++){
        staticElements[i].classList.remove('hide');
    }
    for(let i = 0 ; i<modifElements.length ; i++){
        modifElements[i].classList.add('hide');
    }
    modalTitle.classList.add('hideRight');
}

function createActivate(){
    mode="create"
    modalTitle.innerText='Ajouter un produit';
    showModif();
    loadModal();
    vendorType();
}

window.onload=function(){
    showStatic();
}

function modifActivate(){
    mode="edit"
    modalTitle.innerText='Modifier le produit';
    showModif();
}

function modifValidate(){
    console.log("produit id = "+product_id)
    console.log("mode = "+mode)
    if(mode==="create"){
        createProduct();
    }else{
        editProduct(product_id);
    }
    showStatic();
}

function createProduct(){
    const selectedCategorie = prod_Categorie_input.options[prod_Categorie_input.selectedIndex].text
    console.log(selectedCategorie);
    const formData = new FormData(form);
    formData.append('categorie', JSON.stringify(selectedCategorie));
    fetch('back/ajout.php' , {method: "post" , body: formData}).then(res =>res.json()).then(data => {
        console.log('new product added')
    })
}
function editProduct(id){
    const selectedCategorie = prod_Categorie_input.options[prod_Categorie_input.selectedIndex].text
    console.log(selectedCategorie);
    const formData = new FormData(form);
    formData.append('categorie', JSON.stringify(selectedCategorie));
    formData.append('id', JSON.stringify(product_id));
    fetch('back/update.php' , {method: "post" , body: formData}).then(res =>res.json()).then(data => {
        console.log('new product added')
    })
}

//vendor type
function vendorTypeChange(){
    type=prod_Vendor_Type_input.selectedIndex;
    vendorType();
}


function vendorType(){
    const vendorElements1 = document.getElementsByClassName('vendor1')
    const vendorElements2 = document.getElementsByClassName('vendor2')
        //vente directe
        if(type==0){
        for(let i = 0 ; i<vendorElements1.length ; i++){
            vendorElements1[i].removeAttribute('disabled');
            vendorElements1[i].classList.remove('hideRight');
        }
        for(let i = 0 ; i<vendorElements2.length ; i++){
            vendorElements2[i].setAttribute('disabled',"true");
            vendorElements2[i].classList.add('hideRight');
        }
        prod_Vendor_Name.classList.remove('hideRight');
        prod_Vendor_Address.classList.remove('hideRight');
        prod_Vendor_Title_direct.classList.remove('hideRight');
        prod_Vendor_URL.classList.add('hideRight');
        prod_Vendor_Title_ecom.classList.add('hideRight');
    }
    //ecommerce
    else{
        for(let i = 0 ; i<vendorElements1.length ; i++){
            vendorElements1[i].setAttribute('disabled',"true");
            vendorElements1[i].classList.add('hideRight');
        }
        for(let i = 0 ; i<vendorElements2.length ; i++){
            vendorElements2[i].removeAttribute('disabled');
            vendorElements2[i].classList.remove('hideRight');
        }
        prod_Vendor_Name.classList.add('hideRight');
        prod_Vendor_Address.classList.add('hideRight');
        prod_Vendor_Title_direct.classList.add('hideRight');
        prod_Vendor_URL.classList.remove('hideRight');
        prod_Vendor_Title_ecom.classList.remove('hideRight');
    }
}


//delete modale
const deleteModal = document.getElementById('delete-modal');
const modalDeleteClose = document.getElementById('modal-delete-close');
const deleteNo = document.getElementById('delete-no');

function clickDelete(id){
    product_id = id;
    console.log("id produit ->" + product_id)
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
    const formData = new FormData(form);
    formData.append('id', JSON.stringify(product_id));
    fetch('back/delete.php' , {method: "post" , body: formData}).then(res =>res.json()).then(data => {
        console.log('product deleted:')
    })
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