//cargo los datos del localstorage en la tabla
document.addEventListener("DOMContentLoaded", function () {
  renderizarTablaDesdeLocalStorage();
});

//funcion agregar filas//
function Agregar() {
  const cancionesForm = document.querySelector("#carga-canciones");

  //aqui obtengo los valores del formulario
  const codigo = document.querySelector("#cod-cancion").value;
  const titulo = document.querySelector("#titulo-cancion").value;
  const album = document.querySelector("#album").value;
  const duracion = document.querySelector("#durac-cancion").value;

  //aqui controlo que no se agreguen campos vacios a la tabla
  if (!codigo || !titulo || !album || !duracion) {
    alert("Por favor, completa todos los campos antes de agregar una canción.");
    return;
  }

  const Canciones = JSON.parse(localStorage.getItem("canciones")) || [];

  Canciones.push({
    codigo: codigo,
    titulo: titulo,
    album: album,
    duracion: duracion
  });
  localStorage.setItem("canciones", JSON.stringify(Canciones));
  alert("Se ha agregado la cancion correctamente");

  const tabla = document.getElementById("tabla-canciones");

  const fila = document.createElement("tr");
  const celdaCodigo = document.createElement("th");
  const celdaTitulo = document.createElement("td");
  const celdaAlbum = document.createElement("td");
  const celdaDuracion = document.createElement("td");

  //se asignan los valores del form a la celdas
  celdaCodigo.textContent = codigo;
  celdaTitulo.textContent = titulo;
  celdaAlbum.textContent = album;
  celdaDuracion.textContent =duracion;

  //aqui agrego las celdas con los valores a la fila
  fila.appendChild(celdaCodigo);
  fila.appendChild(celdaTitulo);
  fila.appendChild(celdaAlbum);
  fila.appendChild(celdaDuracion);

  //agrego botones Editar y Eliminar a la fila
  const botonEditar = document.createElement("button");
    botonEditar.classList.add("btn", "btn-success", "m-1");
    const editarSpan = document.createElement("span");
    editarSpan.classList.add("bi", "bi-pencil"); 
    botonEditar.appendChild(editarSpan);

    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("btn", "btn-danger", "m-1");
    const eliminarSpan = document.createElement("span");
    eliminarSpan.classList.add("bi", "bi-trash"); 
    botonEliminar.appendChild(eliminarSpan);


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
    const nombreDeUsuario = fila.firstChild.textContent;


    //obtengo la lista de canciones del localStorage
    const Canciones = JSON.parse(localStorage.getItem("canciones")) || [];
    const Usuarios = JSON.parse(localStorage.getItem("users")) || [];

    //aqui se filtra la lista de canciones y se compara el codigo de la cancion a eliminar, para guardar la lista actualizada en la variable "cancionesActualizadas"
    const cancionesActualizadas = Canciones.filter(function (cancion) {
      return cancion.codigo !== codigoDeCancion;
    });
    //comparamos si el user a eliminar es difente al resto de los users y guardamos la nueva lista actualizada.
    const listaUsuariosActualizada = Usuarios.filter(function (usuario) {
      return usuario.name !== nombreDeUsuario;
    });
    
    //aqui se guarda la lista actualizada en el localstorage
    localStorage.setItem("canciones", JSON.stringify(cancionesActualizadas));
    localStorage.setItem("users", JSON.stringify(listaUsuariosActualizada));

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
      const nuevoTitulo = prompt("Nuevo Título:", cancionAEditar.titulo);
      const nuevoAlbum = prompt("Nuevo album:", cancionAEditar.album);
      const nuevaDuracion = prompt(
        "Nueva duración:",
        cancionAEditar.duracion
      );

      //se actualizan los datos de la cancion
      cancionAEditar.titulo = nuevoTitulo;
      cancionAEditar.album = nuevoAlbum;
      cancionAEditar.duracion = nuevaDuracion;

      //aqui actualizamos el localstorage
      localStorage.setItem("canciones", JSON.stringify(Canciones));

      //se actualiza la fila
      fila.children[1].textContent = nuevoTitulo;
      fila.children[3].textContent = nuevoAlbum;
      fila.children[4].textContent = nuevaDuracion;

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
    const celdaTitulo = document.createElement("td");
    const celdaAlbum = document.createElement("td");
    const celdaDuracion = document.createElement("td");

    //se cargan los valores a las celdas
    celdaCodigo.textContent = cancion.codigo;
    celdaTitulo.textContent = cancion.titulo;
    celdaAlbum.textContent = cancion.album;
    celdaDuracion.textContent = cancion.duracion;

    fila.appendChild(celdaCodigo);
    fila.appendChild(celdaTitulo);
    fila.appendChild(celdaAlbum);
    fila.appendChild(celdaDuracion);

    const botonEditar = document.createElement("button");
    botonEditar.classList.add("btn", "btn-success", "m-1");
    const editarSpan = document.createElement("span");
    editarSpan.classList.add("bi", "bi-pencil"); 
    botonEditar.appendChild(editarSpan);

    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("btn", "btn-danger", "m-1");
    const eliminarSpan = document.createElement("span");
    eliminarSpan.classList.add("bi", "bi-trash"); 
    botonEliminar.appendChild(eliminarSpan);



    const celdaOpciones = document.createElement("td");
    celdaOpciones.appendChild(botonEditar);
    celdaOpciones.appendChild(botonEliminar);

    fila.appendChild(celdaOpciones);

    tabla.appendChild(fila);

    Eliminar(botonEliminar);
    Editar(botonEditar);
  });
}





  // Recuperar datos desde localStorage
  const usuariosGuardados = localStorage.getItem('users');

  // Convertir datos a un objeto JavaScript
  const usuarios = JSON.parse(usuariosGuardados);
  
  // Acceder a la tabla en la página HTML
  const tabla2 = document.getElementById('tabla-usuarios'); // Asegúrate de que tengas una tabla con el id "miTabla"
  
  // Iterar sobre los datos y agregar filas a la tabla
  usuarios.forEach(function (usuario) {
    const fila = tabla2.insertRow();
    const celdaNombre = fila.insertCell(0);
    const celdaEmail = fila.insertCell(1);

    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("btn", "btn-danger");
    const eliminarSpan = document.createElement("span");
    eliminarSpan.classList.add("bi", "bi-trash"); 
    botonEliminar.appendChild(eliminarSpan);

    
    const celdaOpcion = document.createElement("td");
    celdaOpcion.appendChild(botonEliminar);
    fila.appendChild(celdaOpcion);

    tabla2.appendChild(fila);

    Eliminar(botonEliminar);
  
    celdaNombre.textContent = usuario.name;
    celdaEmail.textContent = usuario.email;
  });





//localStorage.removeItem('canciones'); //limpiar localStorage para prueba
