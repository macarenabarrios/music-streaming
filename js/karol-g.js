const contenedorTarjetas = document.getElementById("productos-container");

/** Crea las tarjetas de productos teniendo en cuenta la lista en bicicletas.js */
function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevaBicicleta = document.createElement("div");
    nuevaBicicleta.classList = "tarjeta-producto"
    nuevaBicicleta.innerHTML = `
    <div class="song tamaño-computadora ">
    <div class="lista-enumeracion">
        <p>${producto.enumeracion}</p>
    </div>
    <img src=${producto.img} class="imagen-lista-canciones" alt="Imagen de la canción 1">
    <div class="song-details">
    <p>${producto.nombre}</p>
    </div>
    <div class="nombre-del-album">
        <p>${producto.album}</p>
    </div>
    <div class="duracion-cancion">
        <p>${producto.precio}</p>
    </div>
    <div class="icons">
    <i type="button" class="bi bi-plus-circle p-2"></i><i  class="bi bi-three-dots p-3"></i>
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
                    <buttom><i type="button" class="bi bi-plus-circle p-2"></i><i  class="bi bi-three-dots p-3"></i></buttom>
                    </div>
                </div>
`
    contenedorTarjetas.appendChild(nuevaBicicleta);
    nuevaBicicleta.getElementsByTagName("i")[0].addEventListener("click",() => agregarAlCarrito(producto))
    nuevaBicicleta.getElementsByTagName("buttom")[0].addEventListener("click",() => agregarAlCarrito(producto))
  });
}
crearTarjetasProductosInicio(karolg);