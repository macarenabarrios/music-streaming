import { songs } from '../data/songs.js';

// Función para filtrar las canciones según el texto de búsqueda
function filterSongsDesktop(searchText) {
  // Convierte el texto de búsqueda a minúsculas para hacer la comparación insensible a mayúsculas
  const searchTerm = searchText.toLowerCase();

  // Filtra las canciones que coinciden con el título o el artista
  const filteredSongs = songs.filter(song => {
    const titleMatch = song.title.toLowerCase().includes(searchTerm);
    const artistMatch = song.artist.toLowerCase().includes(searchTerm);
    return titleMatch || artistMatch;
  });

  // Llama a la función para renderizar los resultados
  renderSearchResults(filteredSongs);
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

// Función para generar el enlace de la página de la canción
function generateSongPageLink(title) {
  // Convierte el título a minúsculas y reemplaza los espacios con guiones
  const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
  return `${formattedTitle}.html`; // Ajusta según tu estructura de URLs
}

// Función para manejar la selección de una canción
function handleSongSelection(song) {
  // Aquí puedes redirigir a la página específica de la canción o realizar otras acciones
  console.log(`Seleccionaste: ${song.title} - ${song.artist}`);
  window.location.href = generateSongPageLink(song.title);
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
    filterSongsDesktop(searchText);
  }
});

// Función para limpiar la lista de resultados cuando el cuadro de búsqueda está vacío
function clearSearchResults() {
  const searchResultsDesktop = document.getElementById('searchResultsDesktop');
  searchResultsDesktop.innerHTML = '';
}