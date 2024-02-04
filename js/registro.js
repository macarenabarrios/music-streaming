// FUNCION MOSTRAR/OCULTAR CONTRASEÑA
const contraseña = document.getElementById("registroInputContraseña");
const confirmarContraseña = document.getElementById("registroInputConfirmarContraseña");
const iconoContraseña = document.getElementById("iconoMostrarContraseña");
const iconoConfirmarContraseña = document.getElementById("iconoMostrarConfirmarContraseña");

iconoContraseña.addEventListener("click", () => {
  // Cambiar el tipo de input entre "password" y "text"
  contraseña.type = (contraseña.type === "password") ? "text" : "password";
  // Cambiar la opacidad del ícono según el tipo de input
  iconoContraseña.style.opacity = (contraseña.type === "password") ? 0.2 : 0.8;
});

iconoConfirmarContraseña.addEventListener("click", () => {
  // Cambiar el tipo de input entre "password" y "text"
  confirmarContraseña.type = (confirmarContraseña.type === "password") ? "text" : "password";
  // Cambiar la opacidad del ícono según el tipo de input
  iconoConfirmarContraseña.style.opacity = (confirmarContraseña.type === "password") ? 0.2 : 0.8;
});

const signupForm = document.querySelector("#registroFormulario");

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener valores del formulario
  const name = document.querySelector("#registroInputNombre").value;
  const correoElectronico = document.querySelector("#registroInputEmail").value;
  const clave1 = document.querySelector("#registroInputContraseña").value;
  const clave2 = document.querySelector("#registroInputConfirmarContraseña").value;

  const email = correoElectronico.toLowerCase();

  // Expresiones regulares para validar el nombre y la contraseña
  const regex1 = /^[A-Za-z]+$/;
const regex2 = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9#*])[A-Za-z\d*#]{7,15}$/;


  // Validar el nombre y la contraseña
  const valido1 = regex1.test(name);
  const valido2 = regex2.test(clave1);

  if (clave1 === clave2 && valido1 && valido2) {
    // Verificar si el usuario ya está registrado
    const Users = JSON.parse(localStorage.getItem("users")) || [];
    const isUserRegistered = Users.find((user) => user.email === email);

    if (isUserRegistered) {
      // Mostrar alerta si el usuario ya está registrado
      return Swal.fire({
        title: "¡El usuario ya se encuentra registrado!",
        icon: "error"
      });
    }

    // Almacenar el nuevo usuario en el localStorage
    Users.push({ name: name, email: email, password: clave2 });
    localStorage.setItem("users", JSON.stringify(Users));

    // Mostrar alerta de registro exitoso
    Swal.fire({
      title: "Registro exitoso",
      text: "Se ha registrado correctamente",
      icon: "success",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Continuar"
    }).then((result) => {
      // Redirigir a la página de inicio de sesión si se confirma la alerta
      if (result.isConfirmed) {
        window.location.href = "login.html";
      }
    });
  } else {
    // Mostrar alertas de validación si hay errores
    if (!valido1) {
      Swal.fire({
        title: "El nombre no debe contener números ni símbolos",
        icon: "error"
      });
    }

    if (!(clave1 === clave2)) {
      Swal.fire({
        title: "Las contraseñas ingresadas no son iguales",
        icon: "error"
      });
    }

    if (!valido2) {
      Swal.fire({
        title: "La contraseña no cumple con los requisitos",
        text: "Debe contener entre 7 y 15 caracteres, al menos una letra y un número o uno de estos símbolos: # *",
        icon: "error"
      });
    }
  }
});

//localStorage.removeItem('users'); //limpiar localStorage para prueba