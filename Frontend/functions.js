async function traigoTablaJugadores() {
    const response = await fetch('http://localhost:7000/JugadoresDos',{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)
    
    const result = await response.json()
    

    /* let tabla = `
        <tr>
            <th>id_jugador</th>
            <th>id_equipo</th>
            <th>nombre_jugador</th>
            <th>posicion</th>
            <th>nacionalidad</th>
            <th>feha_nacimiento</th>
            <th>.</th>
            <th>.</th>
        </tr>`;

    for (let i = 0; i < result.length; i++) {
        tabla += `
            <tr>
                <td>${result[i].nombre}</td>
                <td>${result[i].apellido}</td>
                <td>${result[i].dni}</td>
                <td>${result[i].contraseña}</td>
                <td>${result[i].puntaje}</td>
                <td>${result[i].usuario}</td>
            </tr>
        `;
        
    }*/
    console.log(result)
    return result
}
let clienteLogueado;

function verificoLogin(usuario, contraseña) {
    let i = 0;
    let jugadores = traigoTablaJugadores();
    console.log("chau" + jugadores)
    console.log("hola" + jugadores.length)
    while (i < jugadores.length) {
        console.log(jugadores[i].usuario)
        if (jugadores[i].usuario == usuario && jugadores[i].contraseña == contraseña) {
            alert("Login exitoso")
            clienteLogueado = jugadores[i];
            console.log(jugadores[i])   
            return 1
        }
        else if (jugadores[i].usuario == usuario && jugadores[i].contraseña != contraseña) {
            console.log(jugadores[i])
            return 0
        }
        i++
    }
    console.log(jugadores[i])
    return -1
}


function login() {
    var verificacion = verificoLogin(getUserLogIn(), getPasswordLogIn())
    if (verificacion >= 1) {
        changeScreenIn();
    }
    else if (verificacion == -1) {
        alert("Registrese para ingresar a CarraBank")
    }
    else if (verificacion == 0) {
        alert("La contraseña es incorrecta")
    }
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