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


    let numeroAleatorio = Math.floor(Math.random() * 24) + 1;

async function iniciar() {
    login();
    numeroAleatorio
    console.log(numeroAleatorio)
}

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


async function Pregunta1() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].liga == "Premier Ligue"){
                CruzCarlos_Tevez();
                CruzCavani();
                CruzDiego_Maradona();
                CruzEnzo();
                CruzGallardo();
                CruzGriezmann();
                CruzKylian_Mbappe();
                CruzLionel_Messi();
                CruzLuka_Modric();
                CruzRiquelme();
                CruzRodrigo_Depaul();
                CruzRudiger();
                CruzValderrama();
                CruzVinicius_Jr();
                CruzWitsel();
            } else {
                CruzAke();
                CruzDavid_Beckham();
                CruzGvardiol();
                CruzJulian_Alvarez();
                CruzKevin();
                CruzMartinez();
                CruzOdegaard();
                CruzPeter_Cech();
                CruzSaka()
            }
        }

    }
}

async function Pregunta2() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].liga == "La Liga"){
                CruzCarlos_Tevez();
                CruzCavani();
                CruzDiego_Maradona();
                CruzEnzo();
                CruzGallardo();
                CruzKylian_Mbappe();
                CruzLionel_Messi();
                CruzRiquelme();
                CruzAke();
                CruzDavid_Beckham();
                CruzGvardiol();
                CruzJulian_Alvarez();
                CruzKevin();
                CruzMartinez();
                CruzOdegaard();
                CruzPeter_Cech();
                CruzSaka()
            } else {
                CruzGriezmann();
                CruzLuka_Modric();
                CruzRodrigo_Depaul();
                CruzRudiger();
                CruzValderrama();
                CruzVinicius_Jr();
                CruzWitsel();
            }
        }

    }
}

async function Pregunta3() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].liga == "Ligue 1"){
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzEnzo();
                CruzGallardo();
                CruzRiquelme();
                CruzAke();
                CruzDavid_Beckham();
                CruzGvardiol();
                CruzJulian_Alvarez();
                CruzKevin();
                CruzMartinez();
                CruzOdegaard();
                CruzPeter_Cech();
                CruzSaka()
                CruzGriezmann();
                CruzLuka_Modric();
                CruzRodrigo_Depaul();
                CruzRudiger();
                CruzValderrama();
                CruzVinicius_Jr();
                CruzWitsel();
            } else {
                CruzKylian_Mbappe();
                CruzLionel_Messi();
                CruzCavani();
            }
        }

    }
}

async function Pregunta4() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].liga == "LPF"){
                CruzAke();
                CruzDavid_Beckham();
                CruzGvardiol();
                CruzJulian_Alvarez();
                CruzKevin();
                CruzMartinez();
                CruzOdegaard();
                CruzPeter_Cech();
                CruzSaka()
                CruzGriezmann();
                CruzLuka_Modric();
                CruzRodrigo_Depaul();
                CruzRudiger();
                CruzValderrama();
                CruzVinicius_Jr();
                CruzWitsel();
                CruzKylian_Mbappe();
                CruzLionel_Messi();
                CruzCavani();
            } else {
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzEnzo();
                CruzGallardo();
                CruzRiquelme();
            }
        }

    }
}

async function Pregunta5() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].equipo == "Manchester City"){
                CruzDavid_Beckham();
                CruzMartinez();
                CruzOdegaard();
                CruzPeter_Cech();
                CruzSaka()
                CruzGriezmann();
                CruzLuka_Modric();
                CruzRodrigo_Depaul();
                CruzRudiger();
                CruzValderrama();
                CruzVinicius_Jr();
                CruzWitsel();
                CruzKylian_Mbappe();
                CruzLionel_Messi();
                CruzCavani();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzEnzo();
                CruzGallardo();
                CruzRiquelme();
                CruzJulian_Alvarez();
            } else {
                CruzAke();
                CruzGvardiol();
                CruzKevin();
            }
        }

    }
}

async function Pregunta6() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].equipo == "Manchester United"){
                CruzMartinez();
                CruzOdegaard();
                CruzPeter_Cech();
                CruzSaka()
                CruzGriezmann();
                CruzLuka_Modric();
                CruzRodrigo_Depaul();
                CruzRudiger();
                CruzValderrama();
                CruzVinicius_Jr();
                CruzWitsel();
                CruzKylian_Mbappe();
                CruzLionel_Messi();
                CruzCavani();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzEnzo();
                CruzGallardo();
                CruzRiquelme();
                CruzAke();
                CruzGvardiol();
                CruzJulian_Alvarez();
                CruzKevin();
            } else {
                CruzDavid_Beckham();
            }
        }

    }
}

async function Pregunta7() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].equipo == "Real Madrid"){
                CruzMartinez();
                CruzOdegaard();
                CruzPeter_Cech();
                CruzSaka()
                CruzGriezmann();
                CruzRodrigo_Depaul();
                CruzValderrama();
                CruzWitsel();
                CruzKylian_Mbappe();
                CruzLionel_Messi();
                CruzCavani();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzEnzo();
                CruzGallardo();
                CruzRiquelme();
                CruzAke();
                CruzGvardiol();
                CruzJulian_Alvarez();
                CruzKevin();
                CruzDavid_Beckham();
            } else {
                CruzVinicius_Jr();
                CruzRudiger();
                CruzLuka_Modric();
            }
        }

    }
}

async function Pregunta8() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].equipo == "Arsenal"){
                CruzGriezmann();
                CruzRodrigo_Depaul();
                CruzValderrama();
                CruzWitsel();
                CruzKylian_Mbappe();
                CruzLionel_Messi();
                CruzCavani();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzEnzo();
                CruzGallardo();
                CruzRiquelme();
                CruzAke();
                CruzGvardiol();
                CruzJulian_Alvarez();
                CruzKevin();
                CruzDavid_Beckham();
                CruzVinicius_Jr();
                CruzRudiger();
                CruzLuka_Modric();
            } else {
                CruzMartinez();
                CruzOdegaard();
                CruzPeter_Cech();
                CruzSaka()
            }
        }

    }
}

async function Pregunta9() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].equipo == "Boca Juniors"){
                CruzGriezmann();
                CruzRodrigo_Depaul();
                CruzValderrama();
                CruzWitsel();
                CruzKylian_Mbappe();
                CruzLionel_Messi();
                CruzCavani();
                CruzEnzo();
                CruzGallardo();
                CruzAke();
                CruzGvardiol();
                CruzJulian_Alvarez();
                CruzKevin();
                CruzDavid_Beckham();
                CruzVinicius_Jr();
                CruzRudiger();
                CruzLuka_Modric();
                CruzMartinez();
                CruzOdegaard();
                CruzPeter_Cech();
                CruzSaka()
            } else {
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
            }
        }

    }
}

async function Pregunta10() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].equipo == "River"){
                CruzGriezmann();
                CruzRodrigo_Depaul();
                CruzValderrama();
                CruzWitsel();
                CruzKylian_Mbappe();
                CruzLionel_Messi();
                CruzCavani();
                CruzAke();
                CruzGvardiol();
                CruzKevin();
                CruzDavid_Beckham();
                CruzVinicius_Jr();
                CruzRudiger();
                CruzLuka_Modric();
                CruzMartinez();
                CruzOdegaard();
                CruzPeter_Cech();
                CruzSaka()
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
            } else {
                CruzEnzo();
                CruzGallardo();
                CruzJulian_Alvarez();
            }
        }

    }
}

async function Pregunta11() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].nacionalidad == "Francia"){
                CruzRodrigo_Depaul();
                CruzValderrama();
                CruzWitsel();
                CruzLionel_Messi();
                CruzCavani();
                CruzAke();
                CruzGvardiol();
                CruzKevin();
                CruzDavid_Beckham();
                CruzVinicius_Jr();
                CruzRudiger();
                CruzLuka_Modric();
                CruzMartinez();
                CruzOdegaard();
                CruzPeter_Cech();
                CruzSaka()
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
                CruzEnzo();
                CruzGallardo();
                CruzJulian_Alvarez();
            } else {
                CruzKylian_Mbappe();
                CruzGriezmann();
            }
        }

    }
}

async function Pregunta11() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].nacionalidad == "Argentina"){
                CruzValderrama();
                CruzWitsel();
                CruzCavani();
                CruzAke();
                CruzGvardiol();
                CruzKevin();
                CruzDavid_Beckham();
                CruzVinicius_Jr();
                CruzRudiger();
                CruzLuka_Modric();
                CruzOdegaard();
                CruzPeter_Cech();
                CruzSaka()
                CruzRodrigo_Depaul();
                CruzKylian_Mbappe();
                CruzGriezmann();
            } else {
                CruzMartinez();
                CruzLionel_Messi();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
                CruzEnzo();
                CruzGallardo();
                CruzJulian_Alvarez();
            }
        }

    }
}

async function Pregunta13() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].nacionalidad == "Croacia"){
                CruzValderrama();
                CruzWitsel();
                CruzCavani();
                CruzAke();
                CruzKevin();
                CruzDavid_Beckham();
                CruzVinicius_Jr();
                CruzRudiger();
                CruzOdegaard();
                CruzPeter_Cech();
                CruzSaka()
                CruzRodrigo_Depaul();
                CruzKylian_Mbappe();
                CruzGriezmann();
                CruzMartinez();
                CruzLionel_Messi();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
                CruzEnzo();
                CruzGallardo();
                CruzJulian_Alvarez();
            } else {
                CruzGvardiol();
                CruzLuka_Modric();
            }
        }

    }
}

async function Pregunta14() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].nacionalidad == "Noruega"){
                CruzValderrama();
                CruzWitsel();
                CruzCavani();
                CruzAke();
                CruzKevin();
                CruzDavid_Beckham();
                CruzVinicius_Jr();
                CruzRudiger();
                CruzPeter_Cech();
                CruzSaka()
                CruzRodrigo_Depaul();
                CruzKylian_Mbappe();
                CruzGriezmann();
                CruzMartinez();
                CruzLionel_Messi();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
                CruzEnzo();
                CruzGallardo();
                CruzJulian_Alvarez();
                CruzGvardiol();
                CruzLuka_Modric();
            } else {
                CruzOdegaard();
            }
        }

    }
}

async function Pregunta15() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].nacionalidad == "Inglaterra"){
                CruzValderrama();
                CruzWitsel();
                CruzCavani();
                CruzAke();
                CruzKevin();
                CruzVinicius_Jr();
                CruzRudiger();
                CruzPeter_Cech();
                CruzRodrigo_Depaul();
                CruzKylian_Mbappe();
                CruzGriezmann();
                CruzMartinez();
                CruzLionel_Messi();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
                CruzEnzo();
                CruzGallardo();
                CruzJulian_Alvarez();
                CruzGvardiol();
                CruzLuka_Modric();
                CruzOdegaard();
            } else {
                CruzSaka()
                CruzDavid_Beckham();
            }
        }

    }
}

async function Pregunta16() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].nacionalidad == "Belgica"){
                CruzValderrama();
                CruzCavani();
                CruzAke();
                CruzVinicius_Jr();
                CruzRudiger();
                CruzPeter_Cech();
                CruzRodrigo_Depaul();
                CruzKylian_Mbappe();
                CruzGriezmann();
                CruzMartinez();
                CruzLionel_Messi();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
                CruzEnzo();
                CruzGallardo();
                CruzJulian_Alvarez();
                CruzGvardiol();
                CruzLuka_Modric();
                CruzOdegaard();
                CruzSaka()
                CruzDavid_Beckham();
            } else {
                CruzWitsel();
                CruzKevin();
            }
        }

    }
}

async function Pregunta17() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].nacionalidad == "Paises Bajos"){
                CruzValderrama();
                CruzCavani();
                CruzVinicius_Jr();
                CruzRudiger();
                CruzPeter_Cech();
                CruzRodrigo_Depaul();
                CruzKylian_Mbappe();
                CruzGriezmann();
                CruzMartinez();
                CruzLionel_Messi();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
                CruzEnzo();
                CruzGallardo();
                CruzJulian_Alvarez();
                CruzGvardiol();
                CruzLuka_Modric();
                CruzOdegaard();
                CruzSaka()
                CruzDavid_Beckham();
                CruzWitsel();
                CruzKevin();
            } else {
                CruzAke();
            }
        }
    }
}

async function Pregunta18() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].nacionalidad == "Uruguay"){
                CruzValderrama();
                CruzVinicius_Jr();
                CruzRudiger();
                CruzPeter_Cech();
                CruzRodrigo_Depaul();
                CruzKylian_Mbappe();
                CruzGriezmann();
                CruzMartinez();
                CruzLionel_Messi();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
                CruzEnzo();
                CruzGallardo();
                CruzJulian_Alvarez();
                CruzGvardiol();
                CruzLuka_Modric();
                CruzOdegaard();
                CruzSaka()
                CruzDavid_Beckham();
                CruzWitsel();
                CruzKevin();
                CruzAke();
            } else {
                CruzCavani();
            }
        }
    }
}

async function Pregunta19() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].nacionalidad == "Republica Checa"){
                CruzValderrama();
                CruzVinicius_Jr();
                CruzRudiger();
                CruzRodrigo_Depaul();
                CruzKylian_Mbappe();
                CruzGriezmann();
                CruzMartinez();
                CruzLionel_Messi();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
                CruzEnzo();
                CruzGallardo();
                CruzJulian_Alvarez();
                CruzGvardiol();
                CruzLuka_Modric();
                CruzOdegaard();
                CruzSaka()
                CruzDavid_Beckham();
                CruzWitsel();
                CruzKevin();
                CruzAke();
                CruzCavani();
            } else {
                CruzPeter_Cech();
            }
        }
    }
}

async function Pregunta20() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].nacionalidad == "Alemania"){
                CruzValderrama();
                CruzVinicius_Jr();
                CruzRodrigo_Depaul();
                CruzKylian_Mbappe();
                CruzGriezmann();
                CruzMartinez();
                CruzLionel_Messi();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
                CruzEnzo();
                CruzGallardo();
                CruzJulian_Alvarez();
                CruzGvardiol();
                CruzLuka_Modric();
                CruzOdegaard();
                CruzSaka()
                CruzDavid_Beckham();
                CruzWitsel();
                CruzKevin();
                CruzAke();
                CruzCavani();
                CruzPeter_Cech();
            } else {
                CruzRudiger();
            }
        }
    }
}

async function Pregunta21() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].nacionalidad == "Brasil"){
                CruzValderrama();
                CruzRodrigo_Depaul();
                CruzKylian_Mbappe();
                CruzGriezmann();
                CruzMartinez();
                CruzLionel_Messi();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
                CruzEnzo();
                CruzGallardo();
                CruzJulian_Alvarez();
                CruzGvardiol();
                CruzLuka_Modric();
                CruzOdegaard();
                CruzSaka()
                CruzDavid_Beckham();
                CruzWitsel();
                CruzKevin();
                CruzAke();
                CruzCavani();
                CruzPeter_Cech();
                CruzRudiger();
            } else {
                CruzVinicius_Jr();
            }
        }
    }
}

async function Pregunta22() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].nacionalidad == "Colombia"){
                CruzRodrigo_Depaul();
                CruzKylian_Mbappe();
                CruzGriezmann();
                CruzMartinez();
                CruzLionel_Messi();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
                CruzEnzo();
                CruzGallardo();
                CruzJulian_Alvarez();
                CruzGvardiol();
                CruzLuka_Modric();
                CruzOdegaard();
                CruzSaka()
                CruzDavid_Beckham();
                CruzWitsel();
                CruzKevin();
                CruzAke();
                CruzCavani();
                CruzPeter_Cech();
                CruzRudiger();
                CruzVinicius_Jr();
            } else {
                CruzValderrama();
            }
        }
    }
}

async function Pregunta23() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].rubio == true){
                CruzKylian_Mbappe();
                CruzMartinez();
                CruzLionel_Messi();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
                CruzEnzo();
                CruzGallardo();
                CruzJulian_Alvarez();
                CruzGvardiol();
                CruzSaka()
                CruzWitsel();
                CruzAke();
                CruzCavani();
                CruzPeter_Cech();
                CruzRudiger();
                CruzVinicius_Jr();
            } else {
                CruzRodrigo_Depaul();
                CruzOdegaard();
                CruzLuka_Modric();
                CruzDavid_Beckham();
                CruzKevin();
                CruzGriezmann();
                CruzValderrama();
            }
        }
    }
}

async function Pregunta24() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].morocho == true){
                CruzRodrigo_Depaul();
                CruzOdegaard();
                CruzLuka_Modric();
                CruzDavid_Beckham();
                CruzKevin();
                CruzGriezmann();
                CruzValderrama();
            } else {
                CruzKylian_Mbappe();
                CruzMartinez();
                CruzLionel_Messi();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
                CruzEnzo();
                CruzGallardo();
                CruzJulian_Alvarez();
                CruzGvardiol();
                CruzSaka()
                CruzWitsel();
                CruzAke();
                CruzCavani();
                CruzPeter_Cech();
                CruzRudiger();
                CruzVinicius_Jr();
            }
        }
    }
}

async function Pregunta25() {
    const response = await fetch('http://localhost:7000/CaracteristicasPjs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    const result = await response.json()
    console.log(result)

    for (let i = 0; i < result.length; i++){
        if((i+1) == numeroAleatorio){
            array = [result[i]]
            if(result[i].pelo_lacio == true){
                CruzRodrigo_Depaul();
                CruzOdegaard();
                CruzLuka_Modric();
                CruzDavid_Beckham();
                CruzKevin();
                CruzGriezmann();
                CruzKylian_Mbappe();
                CruzMartinez();
                CruzLionel_Messi();
                CruzCarlos_Tevez();
                CruzDiego_Maradona();
                CruzRiquelme();
                CruzEnzo();
                CruzGallardo();
                CruzJulian_Alvarez();
                CruzGvardiol();
                CruzSaka()
                CruzWitsel();
                CruzAke();
                CruzCavani();
                CruzPeter_Cech();
                CruzRudiger();
                CruzVinicius_Jr();
                CruzValderrama();
            } else {

            }
        }
    }
}

/*CruzAke();
CruzCarlos_Tevez();
CruzCavani();
CruzDavid_Beckham();
CruzDiego_Maradona();
CruzEnzo();
CruzGallardo();
CruzGriezmann();
CruzGvardiol();
CruzJulian_Alvarez();
CruzKevin();
CruzKylian_Mbappe();
CruzLionel_Messi();
CruzLuka_Modric();
CruzMartinez();
CruzOdegaard();
CruzPeter_Cech();
CruzRiquelme();
CruzRodrigo_Depaul();
CruzRudiger();
CruzSaka();
CruzValderrama();
CruzVinicius_Jr();
CruzWitsel();*/