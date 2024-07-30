// CAMBIOS DE PANTALLA
function changeScreenIn() {
    const presentacion = document.getElementById("presentacion");
    const contenido = document.getElementById("contenido");
    

    if(contenido.style.display !== "none") {
        contenido.style.display = "none";
        presentacion.style.display = "";
    }
    else {
        contenido.style.display = "";
        presentacion.style.display = "none";
    }
}

function changeScreenOut() {
    const presentacion = document.getElementById("presentacion");
    const contenido = document.getElementById("contenido");
    

    if(presentacion.style.display !== "none") {
        presentacion.style.display = "none";
        contenido.style.display = "";
    }
    else {
        presentacion.style.display = "";
        contenido.style.display = "none";
    }
}


function changeScreenRegister() {
    const logIn = document.getElementById("logueamos");
    const register = document.getElementById("registramos");
    

    if(register.style.display !== "none") {
        register.style.display = "none";
        logIn.style.display = "";
    }
    else {
        register.style.display = "";
        logIn.style.display = "none";
    }
}

function changeScreenLogIn() {
    const logIn = document.getElementById("logueamos");
    const register = document.getElementById("registramos");
    

    if(logIn.style.display !== "none") {
        logIn.style.display = "none";
        register.style.display = "";
    }
    else {
        
        logIn.style.display = "";
        register.style.display = "none";
    }
}

function changeScreenRank() {
    const contenido = document.getElementById("contenido");
    const ranking = document.getElementById("ranking");
    

    if(ranking.style.display !== "none") {
        ranking.style.display = "none";
        contenido.style.display = "";
    }
    else {
        ranking.style.display = "";
        contenido.style.display = "none";
    }
}

function changeScreenAdmin() {
    const contenido = document.getElementById("contenido");
    const admin = document.getElementById("admin");
    

    if(admin.style.display !== "none") {
        admin.style.display = "none";
        contenido.style.display = "";
    }
    else {
        admin.style.display = "";
        contenido.style.display = "none";
    }
}

// GET

function getUserLogIn() {
    return document.getElementById("usuarioLogin").value
}
function getPasswordLogIn() {
    return document.getElementById("contraseñaLogin").value
}
function getDni() {
    return document.getElementById("dni").value
}
function getName() {
    return document.getElementById("nombre").value
}
function getUsername() {
    return document.getElementById("apellido").value
}
function getUser() {
    return document.getElementById("usuario").value
}
function getPassword() {
    return document.getElementById("contraseña").value
}

//ADMIN
function getDniAdmin() {
    return document.getElementById("adminDNI").value
}
function getNameAdmin() {
    return document.getElementById("adminNombre").value
}
function getUsernameAdmin() {
    return document.getElementById("adminApellido").value
}
function getUserAdmin() {
    return document.getElementById("adminUsuario").value
}
function getPasswordAdmin() {
    return document.getElementById("adminContraseña").value
}
function getPuntajeAdmin() {
    return document.getElementById("adminPuntaje").value
}