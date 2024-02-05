

function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("dualipa"))
    console.log(memoria)
    if(!memoria){
        const nuevoProducto = getNuevoProductoParaMemoria(producto)
        localStorage.setItem("dualipa", JSON.stringify([nuevoProducto]))
    }
    else{
        const indiceProducto = memoria.findIndex(canciones => canciones.id === producto.id)
        console.log(indiceProducto)
        if(indiceProducto === -1){
            const nuevaMemoria = memoria
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
            localStorage.setItem("dualipa", JSON.stringify(nuevaMemoria))
        }
    }
    
}

function eliminarCancion(producto){
    const memoria = JSON.parse(localStorage.getItem("dualipa"))
    const indiceProducto = memoria.findIndex(canciones => canciones.id === producto.id)
    if(memoria[indiceProducto].cantidad === 1){
        memoria.splice(indiceProducto,1)
        localStorage.setItem("dualipa", JSON.stringify(memoria))
    }
}

function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
    
}


function actualizarCarrito(){

}
