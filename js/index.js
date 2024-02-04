import { songs } from '../data/songs.js';

// Función para generar el enlace de la página de la canción
function generateSongPageLink(title) {
  const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
  return `${formattedTitle}.html`;
}

// Función para manejar la selección de una canción
function handleSongSelection(song) {
  console.log(`Seleccionaste: ${song.title} - ${song.artist}`);
  window.location.href = generateSongPageLink(song.title);
}

// Función para limpiar la lista de resultados cuando el cuadro de búsqueda está vacío
function clearSearchResults() {
  const searchResultsDesktop = document.getElementById('searchResultsDesktop');
  const searchResultsMobile = document.getElementById('searchResultsMobile');

  if (searchResultsDesktop) {
    searchResultsDesktop.innerHTML = '';
  }
  if (searchResultsMobile) {
    searchResultsMobile.innerHTML = '';
  }
}

// Adjunta un evento de escucha al cuadro de búsqueda
const searchInputDesktop = document.getElementById('searchInputDesktop');
searchInputDesktop.addEventListener('input', (event) => {
  const searchText = event.target.value;

  // Verifica si el cuadro de búsqueda está vacío
  if (searchText.trim() === '') {
    // Si está vacío, limpia la lista de resultados
    clearSearchResults();
  } else {
    // Si no está vacío, realiza el filtrado de canciones
    filterSongs(searchText);
  }
});

const searchInputMobile = document.getElementById('searchInputMobile');
searchInputMobile.addEventListener('input', (event) => {
  const searchText = event.target.value;

  if (searchText.trim() === '') {
    clearSearchResults();
  } else {
    filterSongsMobile(searchText);
  }
});

// Función para filtrar las canciones según el texto de búsqueda
function filterSongs(searchText) {

  const searchTerm = searchText.toLowerCase();

  const filteredSongs = songs.filter(song => {
    const titleMatch = song.title.toLowerCase().includes(searchTerm);
    const artistMatch = song.artist.toLowerCase().includes(searchTerm);
    return titleMatch || artistMatch;
  });

  renderSearchResults(filteredSongs);
}

function filterSongsMobile(searchText) {
  const searchTerm = searchText.toLowerCase();

  const filteredSongs = songs.filter(song => {
    const titleMatch = song.title.toLowerCase().includes(searchTerm);
    const artistMatch = song.artist.toLowerCase().includes(searchTerm);
    return titleMatch || artistMatch;
  });

  renderSearchResultsMobile(filteredSongs);
}

// Función para renderizar los resultados de búsqueda en el escritorio
function renderSearchResults(results) {
  // Selecciona el contenedor de resultados de búsqueda
  const searchResultsDesktop = document.getElementById('searchResultsDesktop');

  // Limpia el contenido anterior
  searchResultsDesktop.innerHTML = '';

  // Crea elementos de lista y añade cada resultado
  const resultList = document.createElement('ul');
  resultList.classList.add('list-group');

  results.forEach(song => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    // Crea un enlace para cada canción
    const songLink = document.createElement('a');
    songLink.href = generateSongPageLink(song.title);
    songLink.textContent = `${song.title} - ${song.artist}`;
    songLink.style.textDecoration = 'none'; // Evita el subrayado predeterminado

    // Agrega un evento clic para manejar la selección del resultado
    songLink.addEventListener('click', (event) => {
      event.preventDefault(); // Evita la acción predeterminada del enlace
      handleSongSelection(song);
    });

    // Añade el enlace al elemento de lista
    listItem.appendChild(songLink);

    // Añade el elemento de lista al resultado final
    resultList.appendChild(listItem);
  });

  // Agrega la lista de resultados al contenedor
  searchResultsDesktop.appendChild(resultList);
}

// Función para renderizar los resultados de búsqueda en mobile
function renderSearchResultsMobile(results) {
  const searchResultsMobile = document.getElementById('searchResultsMobile');

  searchResultsMobile.innerHTML = '';

  const resultListMobile = document.createElement('ul');
  resultListMobile.classList.add('list-group');

  results.forEach(song => {
    const listItemMobile = document.createElement('li');
    listItemMobile.classList.add('list-group-item');

    const songLinkMobile = document.createElement('a');
    songLinkMobile.href = generateSongPageLink(song.title);
    songLinkMobile.textContent = `${song.title} - ${song.artist}`;
    songLinkMobile.style.textDecoration = 'none';

    songLinkMobile.addEventListener('click', (event) => {
      event.preventDefault();
      handleSongSelection(song);
    });

    listItemMobile.appendChild(songLinkMobile);
    resultListMobile.appendChild(listItemMobile);
  });

  searchResultsMobile.appendChild(resultListMobile);
}


// Funcion para ocultar los botones de iniciar sesion y registro
document.addEventListener('DOMContentLoaded', () => {
  const loginSuccess = JSON.parse(localStorage.getItem('login_success'));

  const logoutLink = document.querySelector('.navbar-link-cerrar-sesion');
  const logoutLinkMoble = document.querySelector('.navbar-link-cerrar-sesion-mobile');

  if (loginSuccess) {
    console.log("email", loginSuccess.email);

    if (loginSuccess.email === 'administrador@devtunes.com') {
      console.log("Es administrador --> Ocultar enlace de administrador.");
      showAdministratorLink()
    } else {
      console.log("No es administrador --> Mostrar enlace de administrador.");
      hideAdministratorLink();
    }
    showLogoutLink();
    hideLoginAndRegisterLinks();
  } else {
    hideLogoutLink();
    hideAdministratorLink();
  }

  function showLogoutLink() {
    if (logoutLink) {
      logoutLink.style.display = 'block';
    }
    if (logoutLinkMoble) {
      logoutLinkMoble.style.display = 'block';
    }
  }

  function hideLogoutLink() {
    if (logoutLink) {
      logoutLink.style.display = 'none';
    }
    if (logoutLinkMoble) {
      logoutLinkMoble.style.display = 'none';
    }
  }
});

function hideLoginAndRegisterLinks() {
  const loginLink = document.querySelector('.navbar-link-iniciar-sesion');
  const registerLink = document.querySelector('.navbar-link-registro');

  const loginLinkMobile = document.querySelector('.navbar-link-iniciar-sesion-mobile');
  const registerLinkMobile = document.querySelector('.navbar-link-registro-mobile');

  if (loginLink && registerLink) {
    loginLink.style.display = 'none';
    registerLink.style.display = 'none';
  }

  if (loginLinkMobile && registerLinkMobile) {
    loginLinkMobile.style.display = 'none';
    registerLinkMobile.style.display = 'none';
  }
}

function hideAdministratorLink() {
  const administratorLink = document.querySelector('.navbar-link-administrador');
  const administratorLinkMobile = document.querySelector('.navbar-link-administrador-mobile');
  if (administratorLink) {
    console.log("Ocultar enlace de administrador.");
    administratorLink.style.display = 'none';
  }
  if (administratorLinkMobile) {
    console.log("Ocultar enlace de administrador mobile.");
    administratorLinkMobile.style.display = 'none';
  }
}

function showAdministratorLink() {
  const administratorLink = document.querySelector('.navbar-link-administrador');
  const administratorLinkMobile = document.querySelector('.navbar-link-administrador-mobile');
  if (administratorLink) {
    console.log("Mostrar enlace de administrador.");
    administratorLink.style.display = 'block';
  }
  if (administratorLinkMobile) {
    console.log("Mostrar enlace de administrador mobile.");
    administratorLinkMobile.style.display = 'block';
  }
}

window.redirectMiBiblioteca = function () {
  const loginSuccess = JSON.parse(localStorage.getItem('login_success'));
  if (loginSuccess) {
    window.location.href = '../views/listaReproduccion.html';
  } else {
    window.location.href = '../views/login.html';
  }
}

window.redirectOthers = function () {
  const loginSuccess = JSON.parse(localStorage.getItem('login_success'));
  if (loginSuccess) {
    window.location.href = '../views/error.html';
  } else {
    window.location.href = '../views/login.html';
  }
}