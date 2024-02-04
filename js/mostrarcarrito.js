const contenedorTarjetas = document.getElementById("productos-container");
const carritoVacio = document.getElementById("carrito-vacio")


function crearTarjetasProductosInicio(){
    contenedorTarjetas.innerHTML = ""
    const productos = JSON.parse(localStorage.getItem("dualipa"))
    console.log(productos)
    if(productos && productos.length > 0){
        productos.forEach((producto) => {
            const nuevaLista = document.createElement("div");
            nuevaLista.classList = "tarjeta-producto"
            nuevaLista.innerHTML = `
            <div class="song tamaño-computadora ">
            <img src=${producto.img} class="imagen-lista-canciones" alt="Imagen de la canción 1">
            <div class="song-details">
            <p>${producto.nombre}</p>
            </div>
            <div class="nombre-del-album">
                <p>${producto.nombre}</p>
            </div>
            <div class="duracion-cancion">
                <p>${producto.precio}</p>
            </div>
            <div class="icons">
            <i type="button" class="bi bi-dash-circle p-2"></i>
            </div>
        </div>
        <div class="song tamaño-tablet">
                    <img src=${producto.img} alt="Imagen de la canción 1" class="imagen-tamaño-movil">
                    <div class="song-details">
                    <p>${producto.nombre}</p>
                    <p class="subtitulo-album">${producto.album}</p>
                    </div>
                    <div class="icons icono-duracion-tablet">
                        <p>${producto.precio}</p>
                    </div>
                    <div class="icons icono-tablet">
                    <buttom><i type="button" class="bi bi-dash-circle p-2"></i></buttom>
                    </div>
                </div>`
            contenedorTarjetas.appendChild(nuevaLista);
            nuevaLista.getElementsByTagName("i")[0].addEventListener("click",() => 
            {eliminarCancion(producto)
            crearTarjetasProductosInicio()
            })
            nuevaLista.getElementsByTagName("buttom")[0].addEventListener("click",() => 
            {eliminarCancion(producto)
            crearTarjetasProductosInicio()
            })
        });
    }
    revisarMensajeVacio()
    
}

crearTarjetasProductosInicio();

function revisarMensajeVacio(){
    const productos = JSON.parse(localStorage.getItem("dualipa"))
    carritoVacio.classList.toggle("escondido", (productos && productos.length>0))
}


