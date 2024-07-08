let clienteLogueado;

async function verificoLogin(usuario, contraseña) {
    const response = await fetch('http://localhost:7000/JugadoresDos',{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    let jugadores = result;

    for (let i = 0; i < jugadores.length; i++) {
        if (jugadores[i].usuario == usuario && jugadores[i].contraseña == contraseña) {
            clienteLogueado = jugadores[i].id;
            console.log(jugadores)
            return 1
        }
        else if (jugadores[i].usuario == usuario && jugadores[i].contraseña != contraseña || (usuario == "" && contraseña == "")) {
            return 0
        }
    }
    return -1
}

async function login() {
    var verificacion = await verificoLogin(getUserLogIn(), getPasswordLogIn())

    if (verificacion == 1) {
        alert("Bienvenido A ¿Quien es Quien?")
        return changeScreenIn()
    }
    else if (verificacion == -1) {
        alert("Registrese para ingresar a CarraBank")
    }
    else if (verificacion == 0){
        alert("Verifique los parametros ingresados")
    }
}




async function envioPost() {
    // Armo un objeto para mandarlo como formato JSON
    const data = {
        nombre: getName(),
        apellido: getUsername(),
        dni: getDni(),
        usuario: getUser(),
        contraseña: getPassword()
    };
    console.log(data)

    // Envio un pedido POST con un JSON en el body
    const response = await fetch('http://localhost:7000/InsertarJugadoresDos',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(data),
    });
    console.log(response);
    changeScreenLogIn()
    
}

// Punto 19
function verificoRegistro(dni, password, name, surname) {
    if (dni.length != 8 || password == "" || name == "" || surname == "") {
        alert("Revise si hay error en los campos")
        return false;
    } else {
        return true;
    }

}

function register() {
    let verificacion = verificoRegistro(getDNI(), getPassword(), getName(), getSurname());
    if (verificacion == 1) {
        alert("Registro exitoso");

        let aa = new Client(getDNI(), getPassword(), getName(), getSurname());
        clients.push(aa);
        clienteId = aa

        changeScreenIn();
        return console.log(clients)
    }
}