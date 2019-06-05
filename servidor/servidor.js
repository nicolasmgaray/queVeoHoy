// paquetes necesarios para el proyecto
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const controladorPeliculas = require('./controladores/peliculas.js')
const controladorGeneros = require('./controladores/generos.js')

// Configuro Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configuro las rutas con sus respectivos controladores
app.use('/peliculas', controladorPeliculas);
app.use('/generos', controladorGeneros);

// Abrimos el servidor
const port = 8080;
app.listen(port, function () {
  console.log( "Escuchando en el puerto "+ port );
});

