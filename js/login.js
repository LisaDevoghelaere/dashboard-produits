const form = {
    submit: document.getElementById('btn-submit'),
    messages: document.getElementById('form-messages'),
    connect: document.getElementById('connect'),
};

form.submit.addEventListener('click', (e)=>{
    e.preventDefault();

    const formData = new FormData(form.connect);
    fetch( 'back/authentification.php', { method : "post" , body : formData } )
        .then( res => res.json() ).then( data =>{
            form.messages.style.display='none';
            if(data.ok){
                location.href = 'index.php';
            }else{
                form.messages.innerHTML='';
                form.messages.style.display='block';
                data.messages.forEach(Element => {
                    let msg = document.createElement("li");
                    msg.innerText = Element;
                    form.messages.appendChild(msg);

                });
            }
        });
})