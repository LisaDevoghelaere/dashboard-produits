const content = document.getElementById('content')
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
const prod_Vendor_URLa = document.getElementById('prod_Vendor_URLa');
const prod_Vendor_URL_input = document.getElementById('prod_Vendor_URL_input');
const prod_Tips = document.getElementById('prod_Tips');
const prod_Tips_input = document.getElementById('prod_Tips_input');
const prod_Manual_btn = document.getElementById('prod_Manual_btn');
const pictureHidden = document.getElementById('pictureHidden');
const ticketHidden = document.getElementById('ticketHidden');
const manualHidden = document.getElementById('manualHidden');
const filePicture = document.getElementById('filePicture');
const filePictureLabel = document.getElementById('filePictureLabel');
const fileTicket = document.getElementById('fileTicket');
const fileTicketLabel = document.getElementById('fileTicketLabel');
const fileManual = document.getElementById('fileManual');
const fileManualLabel = document.getElementById('fileManualLabel');
console.log(prod_Vendor_URLa)
let type = 0;
let product_id = 0;
let mode = "";
let fileUpload = null;
let order = 'date_decroissant';
let categorie = '';
let page = 1;
let search = '';
let extension ='';
let valid = false;

title.addEventListener('click' , function(){
    catList.classList.toggle('hidden');
})
window.onload = loadProducts();
window.onload = loadCategories();
window.onload = loadPagination();

function datesFR(items){
    const months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Decembre'];
    let dates = document.querySelectorAll(items)

    for (let element of dates){
        let arr = element.innerText.split('-');
        element.innerText = arr[2]+' '+months[parseInt(arr[1])-1]+' '+arr[0]
    }
}

function hideAlerts(){
    let alerts = document.getElementsByClassName('MSGalert')
    Array.from(alerts).forEach(function (element) {
        element.style.display = 'none';
    });
}

function Nalert(look , msg){
    const alertModal = document.getElementById('msg-modal');
    const message = document.getElementById('alertMsg');
    const icon = document.getElementById('alertIcon');
    if(look==='good'){
        alertModal.classList.add('bg-success');
        alertModal.classList.remove('bg-danger');
        icon.classList.add('fa-thumbs-up');
        icon.classList.remove('fa-exclamation-triangle');
        message.innerText=msg;
    }else{
        alertModal.classList.remove('bg-success');
        alertModal.classList.add('bg-danger');
        icon.classList.remove('fa-thumbs-up');
        icon.classList.add('fa-exclamation-triangle');
        message.innerText=msg;
    }
    alertModal.classList.add('alertshow');
    setTimeout(function(){alertModal.classList.remove('alertshow'); }, 1500);
}

function searchLoad(searchBar){
    page=1;
    search = searchBar.value;
    loadProducts();
    loadPagination();
}

function selectCategorie(button){
    page=1;
    const res = button.innerText;
    const categorieTitle = document.getElementById('categorieTitle');

    if(res==='Tout'){
        categorie = '';
        categorieTitle.innerText="Choisissez une categorie";
    }else{
        categorie = res;
        categorieTitle.innerText=button.innerText;
    }
    catList.classList.add('hidden');
    loadProducts();
    loadPagination()
}

function selectOrder(classement){
    order = classement;
    loadProducts();
    loadPagination()
}

function loadProducts(){
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange  = function(){
        if (this.readyState == 4 && this.status == 200){
            content.innerHTML = xhr.responseText;
            datesFR('.date');
        }
    };

    xhr.open('POST', 'load_products.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("search=" + search + "&page=" + page + "&categorie=" + categorie + "&order=" + order);
}

function loadCategories(){
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange  = function(){
        if (this.readyState == 4 && this.status == 200){
            catList.innerHTML = xhr.responseText;
        }
    };

    xhr.open('POST', 'load_categories.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
}

function loadPagination(){
    const paging = document.getElementById('paging');
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange  = function(){
        if (this.readyState == 4 && this.status == 200){
            paging.innerHTML = xhr.responseText;
            activePaging();
        }
    };

    xhr.open('POST', 'load_pagination.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("search=" + search + "&page=" + page + "&categorie=" + categorie + "&order=" + order);
}

function changePage(num){
    page = num;
    loadProducts();
    loadPagination();
}

function activePaging(){
    const pageBtns = document.getElementsByClassName('pageBtn');
    Array.from(pageBtns).forEach(function (element) {
        if (element.innerText == page){
            element.classList.add('active');
        }else{
            element.classList.remove('active');
        }
    });
}

function newcatClick(){
    const newcatInput = document.getElementById("newcat-input");
    checkCategories(newcatInput.value);
}
function newCategorieClick(index){
    newCatModal.classList.add('active');
    newCatAlert.style.display= 'none';
}

function checkCategories(newCategorie){
    const catBTNS = document.getElementsByClassName('catBTN');
    const newCatAlert = document.getElementById('newCatAlert');
    let test = true;
    Array.from(catBTNS).forEach(function (element) {
        if (element.innerText.toUpperCase() == newCategorie.toUpperCase()){
            test = false;
        }
    });
    if(test){
        newCatAlert.style.display= 'none';
        const formData = new FormData();
        formData.append('categorie', newCategorie);

        fetch( 'back/add_categories.php', { method : "post" , body : formData } )
        .then( res => res.json() ).then( data =>{
            resetUploads();
            newCatModal.classList.remove('active');
            loadCategories();
            loadModal(product_id);
        })
    }else{
        newCatAlert.style.display= 'block';
    }
}

function pictureFile(file){
    filePictureLabel.innerHTML = "<span class='far fa-image icon'></span>"+file[0].name;
    fileUpload = file[0];
     extension = file[0].name.split('.').pop();
     let alert = document.getElementById('uppicAlert')
     if((extension === 'jpg')||(extension === 'jpeg')||(extension === 'png')||(extension === 'bmp')||(extension === 'gif')){
         alert.style.display = 'none';
     }else{
         alert.style.display = 'block';
         resetUploads()
     }
}
function ticketFile(file){
    fileTicketLabel.innerHTML = "<span class='far fa-image icon'></span>"+file[0].name;
    fileUpload = file[0];
    extension = file[0].name.split('.').pop();
    let alert = document.getElementById('upTicketAlert')
     if((extension === 'jpg')||(extension === 'jpeg')||(extension === 'png')||(extension === 'bmp')||(extension === 'gif')){
         alert.style.display = 'none';
     }else{
         alert.style.display = 'block';
         resetUploads()
     }
}
function manualFile(file){
    fileManualLabel.innerHTML = "<span class='far fa-image icon'></span>"+file[0].name;
    fileUpload = file[0];
    extension = file[0].name.split('.').pop();
    let alert = document.getElementById('upManualAlert')
     if((extension === 'pdf')||(extension === 'txt')||(extension === 'jpg')||(extension === 'jpeg')||(extension === 'png')||(extension === 'bmp')){
         alert.style.display = 'none';
     }else{
         alert.style.display = 'block';
         resetUploads()
     }
}

function resetUploads(){
    filePictureLabel.innerHTML = "<span class='far fa-image icon'></span>Parcourir";
    fileTicketLabel.innerHTML = "<span class='far fa-image icon'></span>Parcourir";
    fileManualLabel.innerHTML = "<span class='far fa-image icon'></span>Parcourir";
    filePicture.value=""
    fileTicket.value=""
    fileManual.value=""
    fileUpload = null;
}

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
        pictureHidden.value = 'placeholder.jpg';
        ticketHidden.value = 'placeholder.jpg';
        manualHidden.value = 'placeholder.pdf';


    //Categories
    const formData = new FormData();
    formData.append('id', JSON.stringify(0));

    fetch( 'back/get_categories.php', { method : "post" , body : formData } )
        .then( res => res.json() ).then( data =>{
            prod_Categorie_input.innerHTML = '';
            for (let i = 0 ; i<data[0].length ; i++){
                let option = document.createElement('option');
                option.innerText = data[0][i];
                option.setAttribute('value',data[1][i])
                if(i===0){
                    option.setAttribute('selected','selected');
                }
                prod_Categorie_input.appendChild(option);
        }
        })
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
            if((photo == undefined) || (photo == "")){
                prod_Picture.setAttribute('src' , 'images/product-main/placeholder.jpg');
                pictureHidden.value = 'placeholder.jpg';
            }
            else{
                prod_Picture.setAttribute('src' , 'images/product-main/'+photo);
                pictureHidden.value = photo;
            }

            const phototicket = data[0].ticket_achat;
            if((phototicket == undefined) || (phototicket == "")){
                prod_Ticket.setAttribute('src' , 'images/product-ticket/placeholder.jpg');
                ticketHidden.value = 'placeholder.jpg';
            }
            else{
                prod_Ticket.setAttribute('src' , 'images/product-ticket/'+phototicket);
                ticketHidden.value = phototicket;
            }

        //Categories
            const formData2 = new FormData();
            formData2.append('id', JSON.stringify(0));

            fetch( 'back/get_categories.php', { method : "post" , body : formData2 } )
                .then( res2 => res2.json() ).then( data2 =>{
                    prod_Categorie_input.innerHTML = '';
                    for (let i = 0 ; i<data2[0].length ; i++){
                        let option = document.createElement('option');
                        option.innerText = data2[0][i];
                        option.setAttribute('value',data2[1][i])
                        if(data[0].id_categorie===data2[1][i]){
                            option.setAttribute('selected','selected');
                        }
                        prod_Categorie_input.appendChild(option);
                }
                })


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
            prod_Vendor_URLa.innerText = "";
            prod_Vendor_URLa.setAttribute('href','#');
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
        const urlLength = 40;
            if(data[1].url.length>urlLength){
                prod_Vendor_URLa.innerText = data[1].url.substr(0, urlLength) +' ...';
            }else{
                prod_Vendor_URLa.innerText = data[1].url;
            }
            prod_Vendor_URLa.setAttribute('href',data[1].url);
            prod_Vendor_URL_input.value = data[1].url;
            }

        //conseils
            prod_Tips.innerText = data[0].conseil;
            prod_Tips_input.value = data[0].conseil;

        //Manuel
        const fichierManuel = data[0].manuel_utilisation;
        if((fichierManuel == undefined) || (fichierManuel == "")){
            prod_Manual_btn.setAttribute('href', 'images/product-manual/placeholder.pdf');
            manualHidden.value = 'placeholder.pdf';
        }
        else{
            prod_Manual_btn.setAttribute('href', 'images/product-manual/'+data[0].manuel_utilisation);
            manualHidden.value = data[0].manuel_utilisation;
        }

        vendorType();
        datesFR('.date2');
        })
}

modalClose.addEventListener('click' , function(){
    if(mode!=="edit"){
        modal.classList.remove('active');
    }
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
    hideAlerts()
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
    hideAlerts()
}

function createActivate(){
    mode="create"
    modalTitle.innerText='Ajouter un produit';
    showModif();
    loadModal();
    type=0;
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
    if(mode==="create"){
        createProduct();
    }else{
        editProduct(product_id);
    }
    if(valid){
        showStatic();
    }
}

function createProduct(){
    let selectedCategorie = prod_Categorie_input.options[prod_Categorie_input.selectedIndex].text
    valid = true;
    mcheckPrix();
    mcheckDate();
    if(type===1){
        mcheckEmpty(prod_Vendor_URL_input,'alert_vendor_url')
        mcheckURL();
    }else{
        mcheckEmpty(prod_Name_input,'alert_nom')
        mcheckEmpty(prod_Vendor_Name_input,'alert_vendor_name')
        mcheckEmpty(prod_Vendor_Street_input,'alert_vendor_street')
        mcheckEmpty(prod_Vendor_Code_input,'alert_vendor_code')
        mcheckEmpty(prod_Vendor_City_input,'alert_vendor_city')
    }

    if(valid){
        const formData = new FormData(form);
        formData.append('categorie', selectedCategorie);

        fetch('back/ajout.php' , {method: "post" , body: formData}).then(res =>res.json()).then(data => {
            modal.classList.remove('active');
            loadProducts()
            if(data!=='ok'){
                Nalert('bad',data)
            }else{
                Nalert('good' , 'Produit Ajouté !')
            }
        })
    }

}
function editProduct(id){
    let selectedCategorie = prod_Categorie_input.options[prod_Categorie_input.selectedIndex].text
    valid = true;
    mcheckPrix();
    mcheckDate();
    if(type===1){
        mcheckEmpty(prod_Vendor_URL_input,'alert_vendor_url')
        mcheckURL();
    }else{
        mcheckEmpty(prod_Name_input,'alert_nom')
        mcheckEmpty(prod_Vendor_Name_input,'alert_vendor_name')
        mcheckEmpty(prod_Vendor_Street_input,'alert_vendor_street')
        mcheckEmpty(prod_Vendor_Code_input,'alert_vendor_code')
        mcheckEmpty(prod_Vendor_City_input,'alert_vendor_city')
    }

    if(valid){
        const formData = new FormData(form);
        formData.append('categorie', selectedCategorie);
        formData.append('id', JSON.stringify(product_id));
        fetch('back/update.php' , {method: "post" , body: formData}).then(res =>res.json()).then(data => {
            loadModal(id);
            vendorType();
            loadProducts();
            loadPagination()
            if(data!=='ok'){
                Nalert('bad',data)
            }else{
                Nalert('good' , 'Produit Modifié !')
            }
        })
    }
}

function mcheckEmpty(){
    if(prod_Vendor_Name_input.value == ''){
        prod_Vendor_Name_input.value = ' '
    }
    if(prod_Vendor_Street_input.value == ''){
        prod_Vendor_Street_input.value = ' '
    }
    if(prod_Vendor_Code_input.value == ''){
        prod_Vendor_Code_input.value = ' '
    }
    if(prod_Vendor_City_input.value == ''){
        prod_Vendor_City_input.value = ' '
    }
    if(prod_Vendor_URL_input.value == ''){
        prod_Vendor_URL_input.value = ' '
    }
}
function mcheckEmpty(chInput , chMessage){
    let input = chInput;
    let alert = document.getElementById(chMessage);
    if(input.value==''){
        alert.style.display='block';
        valid =  false;
    }else{
        alert.style.display='none';
    }
}

function mcheckPrix(){
    let input = prod_Price_input;
    let alert = document.getElementById('alert_prix');
    if((input.value=='')||(isNaN(input.value))){
        alert.style.display='block';
        valid =  false;
    }else{
        alert.style.display='none';
    }
}

function mcheckDate(){
    let inputA = prod_Date_input.value.split('-').join('')
    let inputB = prod_Warranty_input.value.split('-').join('')
    let alert = document.getElementById('alert_date');
    if(inputA>inputB){
        alert.style.display='block';
        valid =  false;
    }else{
        alert.style.display='none';
    }
}

function mcheckURL(){
    let input = prod_Vendor_URL_input.value;
    let res = isValidURL(input);
    let alert = document.getElementById('alert_url');

    var prefixes = ['http://','https://','Http://','Https://','HTTP://','HTTPS://'];
    var hasPrefix = false;
    for(let i = 0 ; i<prefixes.length ; i++){
        if (input.substr(0, prefixes[i].length) == prefixes[i])
            {
                hasPrefix=true;
                break;
            }
    }
    if(!hasPrefix){
        input = 'http://' + input;
        prod_Vendor_URL_input.value = input;
    }

    if((input!=='')&&(!res)){
        alert.style.display='block';
        valid =  false;
    }else{
        alert.style.display='none';
    }
}

function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  }

//vendor type
function vendorTypeChange(){
    type=prod_Vendor_Type_input.selectedIndex;
    vendorType();
    hideAlerts()
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
    const formData = new FormData();
    formData.append('delete', JSON.stringify(product_id));
    fetch('back/delete.php' , {method: "post" , body: formData}).then(data =>{
        loadProducts();
        loadPagination()
        Nalert('good','Produit supprimé !')
    })
}


//upload picture modale
const uppicModal = document.getElementById('uppic-modal');
const modalUppicClose = document.getElementById('modal-uppic-close');

modalUppicClose.addEventListener('click' , function(){
    uppicModal.classList.remove('active');
})

function uppicValidate(){
    filePictureLabel.innerHTML = "<span class='far fa-clock icon'></span>Chargement du fichier";
    const formData = new FormData();
    formData.append('id', product_id);
    formData.append('file', fileUpload);

    fetch( 'back/upload_picture.php', { method : "post" , body : formData } )
        .then( res => res.json() ).then( data =>{
            if((data == undefined) || (data == "")){
                prod_Picture.setAttribute('src' , 'images/product-main/placeholder.jpg');
                pictureHidden.value = 'placeholder.jpg';
            }
            else{
                prod_Picture.setAttribute('src' , 'images/product-main/'+data);
                pictureHidden.value = data;
            }
            resetUploads();
            uppicModal.classList.remove('active');
        })
}

function uploadPictureClick(){
    uppicModal.classList.add('active');
    let alert = document.getElementById('uppicAlert');
    alert.style.display = 'none';
}

//upload ticket modale
const upTicketModal = document.getElementById('upticket-modal');
const modalUpTicketClose = document.getElementById('modal-upticket-close');

modalUpTicketClose.addEventListener('click' , function(){
    upTicketModal.classList.remove('active');
})


function upticketValidate(){
    fileTicketLabel.innerHTML = "<span class='far fa-clock icon'></span>Chargement du fichier";
    const formData = new FormData();
    formData.append('id', product_id);
    formData.append('file', fileUpload);

    fetch( 'back/upload_ticket.php', { method : "post" , body : formData } )
        .then( res => res.json() ).then( data =>{
            if((data == undefined) || (data == "")){
                prod_Ticket.setAttribute('src' , 'images/product-ticket/placeholder.jpg');
                ticketHidden.value = 'placeholder.jpg';
            }
            else{
                prod_Ticket.setAttribute('src' , 'images/product-ticket/'+data);
                ticketHidden.value = data;
            }
            resetUploads();
            upTicketModal.classList.remove('active');
        })
}
function uploadTicketClick(){
    upTicketModal.classList.add('active');
    let alert = document.getElementById('upTicketAlert');
    alert.style.display = 'none';
}


//upload manual modale
const upManualModal = document.getElementById('upmanual-modal');
const modalUpManualClose = document.getElementById('modal-upmanual-close');

modalUpManualClose.addEventListener('click' , function(){
    upManualModal.classList.remove('active');
})

function upmanualValidate(){
    fileManualLabel.innerHTML = "<span class='far fa-clock icon'></span>Chargement du fichier";
    const formData = new FormData();
    formData.append('id', product_id);
    formData.append('file', fileUpload);

    fetch( 'back/upload_manuel.php', { method : "post" , body : formData } )
        .then( res => res.json() ).then( data =>{
            if((data == undefined) || (data == "")){
                prod_Manual_btn.setAttribute('href', 'images/product-manual/placeholder.pdf');
                manualHidden.value = 'placeholder.pdf';
            }
            else{
                prod_Manual_btn.setAttribute('href', 'images/product-manual/'+data);
                manualHidden.value = data;
            }
            resetUploads();
            upManualModal.classList.remove('active');
        })
}

function uploadManualClick(){
    upManualModal.classList.add('active');
    let alert = document.getElementById('upManualAlert');
    alert.style.display = 'none';
}


//new categorie modale
const newCatModal = document.getElementById('newcat-modal');
const newCatClose = document.getElementById('modal-newcat-close');

newCatClose.addEventListener('click' , function(){
    newCatModal.classList.remove('active');
})