let clienteLogueado;

async function verificoLogin(usuario, contraseña) {
    const response = await fetch('http://localhost:7000/JugadoresDos', {
        method: "GET",
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
        alert("Registrese si no tiene usuario")
    }
    else if (verificacion == 0) {
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
    const response = await fetch('http://localhost:7000/InsertarJugadoresDos', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    console.log(response);
    changeScreenLogIn()

}

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


let personaje;

async function consigoPersonajes() {
    const response = await fetch('http://localhost:7000/JugadoresDos', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    let personajes = result;

    return personajes
}


async function elijeRandom() {
    let array = await consigoPersonajes();

    if (array.length === 0) {
        console.log("El array está vacío.");
    }

    let personajeAleatorio = Math.floor(Math.random() * array.length);

    personaje = array[personajeAleatorio];

    return personaje
}

// async function veoPersonaje(){
//     console.log(await elijeRandom())
//     return console.log("ok")
// }

async function pPremier() {
    let array = await consigoPersonajes();
    let personaje = await elijeRandom()

    console.log(array)
    console.log(personaje)



    for (let i = 0; i < array.length; i++) {
        if (array[i].usuario == "huracan" && personaje.usuario == "huracam") {
            // responde si y se tachan los que no son de la premier
            console.log(array[i].usuario == "huracan")
            return 1
        }
        else if (array[i].usuario != "huracan" && personaje.usuario == "huracam") {
            // responde no y se tachan los que no son de la premier
            return console.log("el usuario no es igual")
        }
        else {
            console.log(array[i].usuario == "huracan")
            console.log(array[i])
            return console.log("son distintos")
            // responde no y se tachan los de la premier
        }
    }
}



// async function pPremier() {
//     let array = await consigoPersonajes();
//     let personaje = await elijeRandom()

//     for (let i = 0; i < array.length; i++) {
//         if (array[i].premier == true && personaje.premier == true) {
//             // responde si y se tachan los que no son de la premier
//             return
//         }
//         else if (array[i].premier == false && personaje.premier == true) {
//             // responde no y se tachan los que no son de la premier
//             return
//         }
//         else {
//             // responde no y se tachan los de la premier
//         }
//     }
// }


//ADMINISTRADOR 

async function PosteoComoAdmin() {
    // Armo un objeto para mandarlo como formato JSON
    const data = {
        nombre: getNameAdmin(),
        apellido: getUsernameAdmin(),
        dni: getDniAdmin(),
        usuario: getUserAdmin(),
        contraseña: getPasswordAdmin()
    };
    console.log(data)

    // Envio un pedido POST con un JSON en el body
    const response = await fetch('http://localhost:7000/InsertarJugadoresDos', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return console.log(response);
}

async function veoJugadores() {
    const response = await fetch('http://localhost:7000/JugadoresDos', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    let tabla = `
        <tr>
            <th>nombre</th>
            <th>apellido</th>
            <th>dni</th>
            <th>usuario</th>
            <th>contraseña</th>
        </tr>
    `;

    for (let i = 0; i < result.length; i++) {
        tabla += `
            <tr>
                <td>${result[i].nombre}</td>
                <td>${result[i].apellido}</td>
                <td>${result[i].dni}</td>
                <td>${result[i].usuario}</td>
                <td>${result[i].contraseña}</td>
                <td><button onclick="envioDelete('${result[i].nombre}')">Eliminar</button><td>
                <button onclick="envioPut('${result[i].dni}')">Modificar</button>
            </tr>
        `;

    }
    document.getElementById("tablaAdmin").innerHTML = tabla;
    document.getElementById("tablaAdmin").style.display = "block";
}

async function envioDelete(i) {
    let objeto = {
        nombre: i
    }

    const response = await fetch('http://localhost:7000/borrarJugadoresDos', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objeto),
    });
    console.log(response);
}


async function envioPut(dni) {
    let objeto = {
        nombre: getNameAdmin(),
        apellido: getUsernameAdmin(),
        dni: dni,
        usuario: getUserAdmin(),
        contraseña: getPasswordAdmin()
    };

    const response = await fetch('http://localhost:7000/actualizarJugadoresDos', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objeto),
    });

    console.log(response);
}

async function traeJugadores() {
    const response = await fetch('http://localhost:7000/PersonajesFutbol', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)
}

traeJugadores()

async function traeCaracteristicas() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)
}

traeCaracteristicas()