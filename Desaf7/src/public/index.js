

document.addEventListener('submit',envform);

function envform(event){
    event.preventDefault();
    let form= document.getElementById('prodform');
    let data = new FormData(form);
    let name = data.get('name');
    let ProductId = data.get('ProductId');
    let price = data.get('price');
    let image = data.get('image');
    let Object ={
        name:name,
        ProductId:ProductId,
        price:price,
        image:image,
    }
    fetch('/api/productos',{
        method:'POST',
        body:Object,
        headers:{
            'Content-type':'aplication/json'
        }
    }).then(result=>{
        return result.json();
    }).then(json=>{
        Swal.fire({
            title:'Producto Agregado',
            text:json.message,
            icon:'success',
            timer:2000,
        }).then(result=>{
            location.href='/'
        })
    })
}

document.getElementById("image").onchange = (e)=>{
    let read = new FileReader();
    read.onload = e =>{
        document.querySelector('.image-text').innerHTML = "¡Agregar Imagen!"
        document.getElementById("preview").src = e.target.result;
    }
    
    read.readAsDataURL(e.target.files[0])
}