//ELIMINAR CANCIONES//

/*const fila = document.getElementById("fila1"); --> este anda para una filaaaa
function eliminarFila () {
    fila.remove();
}*/

function eliminarFila(index) {
  // Obtiene el elemento FILA por su id usando el método getElementById
  const fila = document.getElementById("fila" + index);
  // Obtiene el elemento padre del elemento usando la propiedad parentNode
  const padreDeFila = fila.parentNode;
  // Elimina el elemento FILA del elemento padre TBODY usando el método removeChild
  padreDeFila.removeChild(fila);
}

//Pendiente: actualizar los indices al eliminar un elemento Fila.
