var email       = document.forms["formView"]["email"];
var password    = document.forms["formView"]["password"];

var messageBox = document.getElementById("messageBox");
var text = document.getElementById("messageBox-text");

function validated(){
    var i = 0;
    if(!isValidEmail(email.value)){
        email.style.border = "1px solid red";
        messageBox.style.display = "block";
        email.focus();
        i += 1;
    }
    var errors = validatePassword(password.value);
    if(errors.length > 0){
        password.style.border = "1px solid red";
        messageBox.style.display = "block";
        password.focus();
        i += 2;
    }
    switch (i) {
        case 1:
            text.textContent = "Introduzca un correo valido micorreo@email.com";
            return false;
        case 2:
            text.textContent = errors.join("\n");//"Introduzca una contraseña valida mayor a 5 digitos";
            return false;
        case 3:
            text.textContent = "Introduzca un correo valido micorreo@email.com \n"+ errors.join("\n");
            return false;
        default:
            return true;
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    errors = [];
    if (password.length < 6) {
        errors.push("La contraseña debe contener como minimo 6 caracteres."); 
    }
    if (password.search(/[a-z]/i) < 0) {
        errors.push("La contraseña debe contener almenos una letra.");
    }
    if (password.search(/[0-9]/) < 0) {
        errors.push("La contraseña debe contener almenos un digito."); 
    }
    return errors;
    
}