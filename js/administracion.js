//cargo los datos del localstorage en la tabla
document.addEventListener("DOMContentLoaded", function () {
  renderizarTablaDesdeLocalStorage();
});

//funcion agregar filas//
function Agregar() {
  const cancionesForm = document.querySelector("#carga-canciones");

  //aqui obtengo los valores del formulario
  const codigo = document.querySelector("#cod-cancion").value;
  const nombre = document.querySelector("#nombre-cancion").value;
  const artista = document.querySelector("#artista").value;
  const album = document.querySelector("#album").value;
  const categoria = document.querySelector("#categ-cancion").value;

  //aqui controlo que no se agreguen campos vacios a la tabla
  if (!codigo || !nombre || !artista || !album || !categoria) {
    alert("Por favor, completa todos los campos antes de agregar una canción.");
    return;
  }

  const Canciones = JSON.parse(localStorage.getItem("canciones")) || [];

  Canciones.push({
    codigo: codigo,
    nombre: nombre,
    artista: artista,
    album: album,
    categoria: categoria,
  });
  localStorage.setItem("canciones", JSON.stringify(Canciones));
  alert("Se ha agregado la cancion correctamente");

  const tabla = document.getElementById("tabla-canciones");

  const fila = document.createElement("tr");
  const celdaCodigo = document.createElement("th");
  const celdaNombre = document.createElement("td");
  const celdaArtista = document.createElement("td");
  const celdaAlbum = document.createElement("td");
  const celdaCategoria = document.createElement("td");

  //se asignan los valores del form a la celdas
  celdaCodigo.textContent = codigo;
  celdaNombre.textContent = nombre;
  celdaArtista.textContent = artista;
  celdaAlbum.textContent = album;
  celdaCategoria.textContent = categoria;

  //aqui agrego las celdas con los valores a la fila
  fila.appendChild(celdaCodigo);
  fila.appendChild(celdaNombre);
  fila.appendChild(celdaArtista);
  fila.appendChild(celdaAlbum);
  fila.appendChild(celdaCategoria);

  //agrego botones Editar y Eliminar a la fila
  const botonEditar = document.createElement("button");
  botonEditar.textContent = "Editar";
  const botonEliminar = document.createElement("button");
  botonEliminar.textContent = "Eliminar";

  const celdaOpciones = document.createElement("td");
  celdaOpciones.appendChild(botonEditar);
  celdaOpciones.appendChild(botonEliminar);

  fila.appendChild(celdaOpciones);

  //agrego la fila cargada de valores a la tabla
  tabla.appendChild(fila);
  cancionesForm.reset();

  Eliminar(botonEliminar);
  Editar(botonEditar);
} //fin de funcion Agregar

//funcion Eliminar fila //
function Eliminar(botonEliminar) {
  botonEliminar.addEventListener("click", function () {
    const fila = botonEliminar.parentNode.parentNode;
    const codigoDeCancion = fila.firstChild.textContent;

    //obtengo la lista de canciones del localStorage
    const Canciones = JSON.parse(localStorage.getItem("canciones")) || [];

    //aqui se filtra la lista de canciones y se compara el codigo de la cancion a eliminar, para guardar la lista actualizada en la variable "cancionesActualizadas"
    const cancionesActualizadas = Canciones.filter(function (cancion) {
      return cancion.codigo !== codigoDeCancion;
    });

    //aqui se guarda la lista actualizada en el localstorage
    localStorage.setItem("canciones", JSON.stringify(cancionesActualizadas));

    //eliminamos la fila de la tabla
    fila.remove();
  });
}
//fin de funcion eliminar fila//

//funcion editar fila//
function Editar(botonEditar) {
  botonEditar.addEventListener("click", function () {
    const fila = botonEditar.parentNode.parentNode;
    const codigoDeCancion = fila.firstChild.textContent;

    const Canciones = JSON.parse(localStorage.getItem("canciones")) || [];

    //buscamos la cancion a editar con su codigo
    const cancionAEditar = Canciones.find(function (cancion) {
      return cancion.codigo === codigoDeCancion;
    });

    if (cancionAEditar) {
      //si es true mostrara los prompt y se editara la cancion
      const nuevoNombre = prompt("Nuevo nombre:", cancionAEditar.nombre);
      const nuevoArtista = prompt("Nuevo artista:", cancionAEditar.artista);
      const nuevoAlbum = prompt("Nuevo album:", cancionAEditar.album);
      const nuevoCategoria = prompt(
        "Nueva categoria:",
        cancionAEditar.categoria
      );

      //se actualizan los datos de la cancion
      cancionAEditar.nombre = nuevoNombre;
      cancionAEditar.artista = nuevoArtista;
      cancionAEditar.album = nuevoAlbum;
      cancionAEditar.categoria = nuevoCategoria;

      //aqui actualizamos el localstorage
      localStorage.setItem("canciones", JSON.stringify(Canciones));

      //se actualiza la fila
      fila.children[1].textContent = nuevoNombre;
      fila.children[2].textContent = nuevoArtista;
      fila.children[3].textContent = nuevoAlbum;
      fila.children[4].textContent = nuevoCategoria;

      alert("Canción editada correctamente");
    } else {
      alert("No se encontró la canción para editar");
    }
  });
}
//fin de editar fila//

function renderizarTablaDesdeLocalStorage() {
  const tabla = document.getElementById("tabla-canciones");
  tabla.innerHTML = ""; // Limpiar la tabla antes de renderizar

  //obtiene la lista de canciones del localStorage
  const Canciones = JSON.parse(localStorage.getItem("canciones")) || [];

  //recorre la lista de canciones y renderiza cada fila
  Canciones.forEach(function (cancion) {
    const fila = document.createElement("tr");
    const celdaCodigo = document.createElement("th");
    const celdaNombre = document.createElement("td");
    const celdaArtista = document.createElement("td");
    const celdaAlbum = document.createElement("td");
    const celdaCategoria = document.createElement("td");

    //se cargan los valores a las celdas
    celdaCodigo.textContent = cancion.codigo;
    celdaNombre.textContent = cancion.nombre;
    celdaArtista.textContent = cancion.artista;
    celdaAlbum.textContent = cancion.album;
    celdaCategoria.textContent = cancion.categoria;

    fila.appendChild(celdaCodigo);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaArtista);
    fila.appendChild(celdaAlbum);
    fila.appendChild(celdaCategoria);

    const botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";

    const celdaOpciones = document.createElement("td");
    celdaOpciones.appendChild(botonEditar);
    celdaOpciones.appendChild(botonEliminar);

    fila.appendChild(celdaOpciones);

    tabla.appendChild(fila);

    Eliminar(botonEliminar);
    Editar(botonEditar);
  });
}

//localStorage.removeItem('canciones'); //limpiar localStorage para prueba
