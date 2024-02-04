const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const Users = JSON.parse(localStorage.getItem('users')) || [];
  const isAdmin = email === 'administrador@devtunes.com' && password === 'Devtunes2024';
  const validUser = Users.find(user => user.email === email && user.password === password);

  if (!validUser && !isAdmin) {
    Swal.fire({
      title: "Usuario y/o contraseña incorrectos!",
      icon: "error"
    });
  } else {
    const redirectUrl = isAdmin ? 'administracion.html' : 'main.html';
    Swal.fire({
      title: `Bienvenido ${validUser ? validUser.name : 'Administrador'}!`,
      icon: "success"
    }).then(() => {
      localStorage.setItem('login_success', JSON.stringify(validUser || { email: 'administrador@devtunes.com' }));
      window.location.href = redirectUrl;
    });
  }
});

// Función para mostrar y ocultar la contraseña
const contraseña = document.getElementById("password");
const iconoContraseña = document.getElementById("iconoMostrarContraseña");

iconoContraseña.addEventListener("click", () => {
  if (contraseña.type === "password") {
    contraseña.type = "text";
    iconoContraseña.style.opacity = 0.8;
  } else {
    contraseña.type = "password";
    iconoContraseña.style.opacity = 0.2;
  }
});