var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
const MySQL = require('./modulos/mysql')
const cors = require('cors');

var app = express(); //Inicializo express
var port = process.env.PORT || 7000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/JugadoresDos', async function(req,res){
    console.log(req.query) 
    const respuesta = await MySQL.realizarQuery(`
    SELECT * FROM JugadoresDos;
    `)
    res.send(respuesta)
})

app.get('/PersonajesFutbol', async function(req,res){
    console.log(req.query) 
    const respuesta = await MySQL.realizarQuery(`
    SELECT * FROM PersonajesFutbol;
    `)
    res.send(respuesta)
})

app.get('/CaracteristicasPjs', async function(req,res){
    console.log(req.query) 
    const respuesta = await MySQL.realizarQuery(`
    SELECT * FROM CaracteristicasPjs;
    `)
    res.send(respuesta)
})

app.post('/InsertarJugadoresDos', async function(req,res) {
    console.log(req.body) 
    result = await MySQL.realizarQuery(`SELECT * FROM JugadoresDos WHERE nombre = '${req.body.nombre}' AND dni = ${req.body.dni} AND apellido = '${req.body.apellido}' AND usuario = '${req.body.usuario}' AND contraseña = '${req.body.contraseña}'`);
    if (result.length > 0) {
        res.send("Ya existe")
    } else {
        await MySQL.realizarQuery(`INSERT INTO JugadoresDos (nombre, apellido, dni, usuario, contraseña) VALUES ('${req.body.nombre}', '${req.body.apellido}','${req.body.dni}','${req.body.usuario}', '${req.body.contraseña}')`);
        res.send("ok")
    }
})

app.delete("/borrarJugadoresDos", async function(req,res) {
    console.log(req.body)
    await MySQL.realizarQuery(`DELETE FROM JugadoresDos WHERE nombre = '${req.body.nombre}';`)
    res.send("ok")
})

app.put('/actualizarJugadoresDos', async function(req, res){
    console.log(req.body);
    const { nombre, apellido, dni, usuario, contraseña} = req.body;
    await MySQL.realizarQuery(`UPDATE JugadoresDos SET nombre = '${nombre}', apellido = '${apellido}', dni = '${dni}', usuario = '${usuario}', contraseña = '${contraseña}' WHERE dni = ${dni};`);
        
    res.send("ok");
});

//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
    console.log('Defined routes:');
    console.log('   [GET] http://localhost:3000/');
    console.log('   [GET] http://localhost:3000/saludo');
    console.log('   [POST] http://localhost:3000/nombreDelPedido');
});