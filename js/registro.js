
//FUNCION MOSTRAR/OCULTAR CONTRASEÑA

const contraseña = document.getElementById("registroInputContraseña");
const confirmarContraseña = document.getElementById("registroInputConfirmarContraseña");
const iconoContraseña = document.getElementById("iconoMostrarContraseña");
const iconoConfirmarContraseña = document.getElementById("iconoMostrarConfirmarContraseña")


iconoContraseña.addEventListener("click", () => {

    if (contraseña.type === "password") { 
        contraseña.type = "text"
        iconoContraseña.style.opacity = 0.8

    } else {
        contraseña.type = "password"
        iconoContraseña.style.opacity = 0.2
    }
})

iconoConfirmarContraseña.addEventListener("click", () => {

    if (confirmarContraseña.type === "password") { 
        confirmarContraseña.type = "text"
        iconoConfirmarContraseña.style.opacity = 0.8

    } else {
        confirmarContraseña.type = "password"
        iconoConfirmarContraseña.style.opacity = 0.2
    }
})


/*
//FUNCION DE VALIDACIONES
function validaciones() {
    const contraseña = document.getElementById("registroInputContraseña").value;
    const contraseña2 = document.getElementById("registroInputConfirmarContraseña").value;
    const texto = document.getElementById("registroInputNombre").value;
    const email = document.getElementById("registroInputEmail").value;



    const regex1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,15}$/;
    const valido1 = regex1.test(contraseña);
    
    const regex2 = /^[A-Za-z]+$/;
    const valido2 = regex2.test(texto);

    const regex3 = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valido3 = regex3.test(email);


    const contraseñasIguales = contraseña === contraseña2;
    
    if (valido1 && contraseñasIguales && valido2 && valido3) {

//ALMACENAR LOS DATOS EN EL LOCALSTORAGE

const form = document.querySelector("registroFormulario");

form.addEventListener("submit" , (e) => {
  e.preventDefault();
  const data = Object.assign.fromEntries(new FormData(e.target));

});



alert("Se ha registrado correctamente, probando funcion");


    } else {
      alert("¡Error! No se pudo registrar la cuenta");

      if (!valido1) {
        alert("La contraseña debe cumplir con los siguientes requisitos:\n- Longitud mínima de 7 caracteres y máxima de 15\n- Al menos una letra y un número.");
      }
      if (!contraseñasIguales) {
        alert("Las contraseñas ingresadas no coinciden");
      }
      if (!valido2) {
        alert("El nombre no debe contener números ni símbolos");
      }
      if (!valido3) {
        alert ("El correo ingresado es Incorrecto")
      }
    }
  }
  
  // Asigna la función al evento onclick del botón de registrarme
  document.getElementById("registroBtn").onclick = validaciones;

*/


const signupForm = document.querySelector('#registroFormulario');

signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener valores del formulario
    const name = document.querySelector('#registroInputNombre').value;
    const email = document.querySelector('#registroInputEmail').value;
    const clave1 = document.querySelector('#registroInputContraseña').value;
    const clave2 = document.querySelector('#registroInputConfirmarContraseña').value;

    // Comprobar si las contraseñas son iguales
    if (clave1 === clave2) {
        // Resto del código de registro
        const Users = JSON.parse(localStorage.getItem('users')) || [];
        const isUserRegistered = Users.find(user => user.email === email);

        if (isUserRegistered) {
            return alert('El usuario ya se encuentra registrado!');
        }

        Users.push({ name: name, email: email, password: clave2 });
        localStorage.setItem('users', JSON.stringify(Users));
        alert('Registro Exitoso!');
        window.location.href = 'login.html';
    } else {
        alert("Las contraseñas ingresadas no son iguales");
    }
});


//localStorage.removeItem('users');