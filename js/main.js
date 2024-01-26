function toggleNavbar() {
  var navbar = document.getElementById('navbar');
  // Verificar si el navbar está visible o no
  var isNavbarVisible = window.getComputedStyle(navbar).display !== 'none';

  // Cambiar el estado del navbar
  navbar.style.display = isNavbarVisible ? 'none' : 'flex';
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('toggleNavbarBtn').addEventListener('click', toggleNavbar);

  // Ocultar el navbar en responsive al hacer clic en logoContainer
  var logoContainer = document.getElementById("logoContainer");
  logoContainer.addEventListener("click", function () {
    if (window.matchMedia("(max-width: 767px)").matches) {
      document.getElementById("navbar").style.display = "none";
    }
  });
});
