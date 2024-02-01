//FUNCION MOSTRAR/OCULTAR CONTRASEÑA

const contraseña = document.getElementById("registroInputContraseña");
const confirmarContraseña = document.getElementById(
  "registroInputConfirmarContraseña"
);
const iconoContraseña = document.getElementById("iconoMostrarContraseña");
const iconoConfirmarContraseña = document.getElementById(
  "iconoMostrarConfirmarContraseña"
);

iconoContraseña.addEventListener("click", () => {
  if (contraseña.type === "password") {
    contraseña.type = "text";
    iconoContraseña.style.opacity = 0.8;
  } else {
    contraseña.type = "password";
    iconoContraseña.style.opacity = 0.2;
  }
});

iconoConfirmarContraseña.addEventListener("click", () => {
  if (confirmarContraseña.type === "password") {
    confirmarContraseña.type = "text";
    iconoConfirmarContraseña.style.opacity = 0.8;
  } else {
    confirmarContraseña.type = "password";
    iconoConfirmarContraseña.style.opacity = 0.2;
  }
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

  const regex1 = /^[A-Za-z]+$/;
  const valido1 = regex1.test(name);

  const regex2 = /^[A-Za-z0-9\\*\\#\\$]{7,15}$/;
  const valido2 = regex2.test(clave1);

  if (clave1 === clave2 && valido1 && valido2) {
    const Users = JSON.parse(localStorage.getItem("users")) || [];
    const isUserRegistered = Users.find((user) => user.email === email);

    if (isUserRegistered) {

    return Swal.fire({
      title: "¡El usuario ya se encuentra registrado!",
      icon: "error"
  });
    }

    Users.push({ name: name, email: email, password: clave2 });
    localStorage.setItem("users", JSON.stringify(Users));


    alert("Se ha registrado correctamente");

    
    window.location.href = "login.html";
  } else {
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
        title: "La contraseña debe cumplir con los siguientes requisitos:\n- Longitud mínima de 7 caracteres y máxima de 15\n- Al menos una letra y un número o uno de estos símbolos: # *",
        icon: "error"
    });
    
    }
  }
});

//localStorage.removeItem('users'); //limpiar localStorage para prueba