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


