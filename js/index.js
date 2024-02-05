import { artistas } from '../data/artistas.js';

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

// Funcionalidad para buscar artistas
searchInputDesktop.addEventListener('input', (event) => {
  const searchText = event.target.value;

  if (searchText.trim() === '') {
    clearSearchResults();
  } else {
    const filteredResults = filterResults(searchText, artistas);
    renderSearchResultsArtists(filteredResults);
  }
});

searchInputMobile.addEventListener('input', (event) => {
  const searchText = event.target.value;

  if (searchText.trim() === '') {
    clearSearchResults();
  } else {
    const filteredResults = filterResults(searchText, artistas);
    renderSearchResultsMobileArtists(filteredResults);
  }
});

// Función para filtrar las canciones según el texto de búsqueda
function filterResults(searchText, data) {
  const searchTerm = searchText.toLowerCase();
  return data.filter(item => {
    const match = item.artist.toLowerCase().includes(searchTerm);
    return match;
  });
}

// Función para renderizar los resultados de búsqueda en el escritorio
function renderSearchResultsArtists(results, isSong) {
  const searchResultsDesktop = document.getElementById('searchResultsDesktop');
  searchResultsDesktop.innerHTML = '';

  const resultList = document.createElement('ul');
  resultList.classList.add('list-group');

  results.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    const itemLink = document.createElement('a');
    itemLink.href = generatePageLink(item, false);
    itemLink.textContent = item.artist;
    itemLink.style.textDecoration = 'none';

    itemLink.addEventListener('click', (event) => {
      event.preventDefault();
      handleArtistSelection(item);
    });

    listItem.appendChild(itemLink);
    resultList.appendChild(listItem);
  });

  searchResultsDesktop.appendChild(resultList);
}

// Función para renderizar los resultados de búsqueda en mobile
function renderSearchResultsMobileArtists(results, isSong) {
  const searchResultsMobile = document.getElementById('searchResultsMobile');
  searchResultsMobile.innerHTML = '';

  const resultListMobile = document.createElement('ul');
  resultListMobile.classList.add('list-group');

  results.forEach(item => {
    const listItemMobile = document.createElement('li');
    listItemMobile.classList.add('list-group-item');

    const itemLinkMobile = document.createElement('a');
    itemLinkMobile.href = generatePageLink(item, false);
    itemLinkMobile.textContent = item.artist;
    itemLinkMobile.style.textDecoration = 'none';

    itemLinkMobile.addEventListener('click', (event) => {
      event.preventDefault();
      handleArtistSelection(item);
    });

    listItemMobile.appendChild(itemLinkMobile);
    resultListMobile.appendChild(listItemMobile);
  });

  searchResultsMobile.appendChild(resultListMobile);
}

// Función para manejar la selección de un artista
function handleArtistSelection(artist) {
  console.log(`Seleccionaste al artista: ${artist.artist}`);
  window.location.href = generatePageLink(artist, false);
}

// Función para generar el enlace de la página del artista
function generatePageLink(item, isSong) {
  const formattedTitle = item.title ? item.title.toLowerCase().replace(/\s+/g, '-') : item.artist.toLowerCase().replace(/\s+/g, '-');
  return isSong ? `${formattedTitle}.html` : `${formattedTitle}.html`;
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