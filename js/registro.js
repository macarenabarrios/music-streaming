
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



//FUNCION VALIDAR CONTRASEÑA Y NOMBRE
function validarContraseñaNombre() {
    let contraseña = document.getElementById("registroInputContraseña").value;
    let contraseña2 = document.getElementById("registroInputConfirmarContraseña").value;
    let texto = document.getElementById("registroInputNombre").value;


    let regex1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,15}$/;
    let valido1 = regex1.test(contraseña);
    
    let regex2 = /^[A-Za-z]+$/;
    let valido2 = regex2.test(texto);

    let contraseñasIguales = contraseña === contraseña2;

    
    if (valido1 && contraseñasIguales && valido2) {

      alert("Se ha registrado correctamente");
      document.getElementById("registroFormulario").submit();

    } else {
      alert("No se pudo registrar la cuenta");

      if (!valido1) {
        alert("La contraseña debe cumplir con los siguientes requisitos:\n- Longitud mínima de 7 caracteres y máxima de 15\n- Al menos una letra y un número.");
      }
      if (!contraseñasIguales) {
        alert("Las contraseñas ingresadas no coinciden");
      }
      if (!valido2) {
        alert("El nombre no debe contener números ni símbolos");
      }
    }
  }
  
  // Asigna la función al evento onclick del botón de registrarme
  document.getElementById("registroBtn").onclick = validarContraseñaNombre;





  /*// FUNCION VALIDAR EMAIL
const emailFeedback = (email) =>{
    signUpFormPasswordInput.classList.remove("is-valid")
    signUpFormPasswordInput.classList.remove("is-invalid")

    if (validateEmail(email) && validateExistingEmail(email)) {
        signUpFormEmailInput.classList.add("is-valid")
        return true
    }
    signUpFormEmailInput.classList.add("is-invalid")
    return false
}


const validarEmail = (email) =>{
    const users = JSON.parse(localStorage.getItem("users")) || []
    const foundUserEmail = users.find(user => user.email == email)
    
    if (foundUserEmail) {
        return false
    }

    return true
}

*/


