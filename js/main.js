function toggleNavbar() {
  var navbar = document.getElementById('navbar');
  if (navbar.style.display === 'none' || navbar.style.display === '') {
    navbar.style.display = 'flex';
  } else {
    navbar.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('toggleNavbarBtn').addEventListener('click', toggleNavbar);
});

// Para ocultar el navbar en responsive
document.addEventListener("DOMContentLoaded", function () {
  var logoContainer = document.getElementById("logoContainer");
  logoContainer.addEventListener("click", function () {
    document.getElementById("navbar").style.display = "none";
  });
});