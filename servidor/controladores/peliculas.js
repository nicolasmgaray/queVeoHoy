const express = require("express");
const router = express.Router();
const bd = require("../lib/conexionbd");

/* 
      CONSULTA ESTANDAR DE PELICULAS
*/

router.get("/", function(req, res) {
  // Obtengo los filtros
  const {
    titulo,
    genero,
    anio,
    columna_orden,
    tipo_orden,
    cantidad,
    pagina
  } = req.query;

  // Inicializo el Query
  let query = `SELECT * FROM pelicula WHERE titulo LIKE '%${titulo ? titulo : ""}%'`;

  // Modifico el query en base a los filtros enviados
  if (genero) query += ` AND genero_id=${genero}`;  
  if (anio) query += ` AND anio=${anio}`;  

  // Agrego ordenamiento
  query += ` ORDER BY ${columna_orden} ${tipo_orden}`;

  // Agrego paginacion
  const offset = (pagina - 1) * cantidad;
  const queryPaginado = query + ` LIMIT ${offset} , ${cantidad}`;

  const response = {};

  // Query para tener el total de peliculas
  bd.query(query, function(error, results, fields) {
    if (error) return res.status(500).send(error);
    response.total = results.length;
  });

  // Query para tener la pagina actual
  bd.query(queryPaginado, function(error, results, fields) {
    if (error) return res.status(500).send(error);
    response.peliculas = results;
    return res.status(200).send(response);
  });
});


/* 
      CONSULTA RECOMENDACION DE PELICULAS
*/

router.get("/recomendacion", function(req, res) {
  
  // Obtengo los filtros
  const {    
    genero,
    anio_inicio,
    anio_fin,
    puntuacion
  } = req.query;
  
  // Inicializo el Query
  let query = `SELECT * FROM vista_peliculas_genero where genero LIKE '%${genero ? genero : ""}%'`;

  // Modifico el query en base a los filtros enviados
  if (anio_inicio) query += ` AND anio>=${anio_inicio}`;  
  if (anio_fin) query += ` AND anio<=${anio_fin}`;  
  if (puntuacion) query += ` AND puntuacion>=${puntuacion}`;  

  // Ejecuto el Query
  bd.query(query, function(error, results, fields) {
    if (error) return res.status(500).send(error);  
    return res.status(200).send({peliculas: results});
  });
  
});


/* 
      CONSULTA ESPECIFICA DE PELICULA
*/

router.get("/:id", function(req, res) {
  const { id } = req.params;

  // Inicializo el Query
  const queryPelicula =  `SELECT * FROM vista_actores_pelicula where id=${id}`;

  // Query para tener la pagina actual
  bd.query(queryPelicula, function(error, results, fields) {
    // Si hay un error , respondo con el mismo
    if (error) return res.status(500).send(error);

    // Si no hay resultados, respondo que no se encontro la peli
    if (results.length == 0)
      return res
        .status(404)
        .send(`No se encontro una pelicula con el ID: ${id}.`);

    const { actor, actor_id, genero, genero_id, ...pelicula } = results[0]; // Destructuring para separar genero y actor de la peli
    let actores = [
      {
        nombre: actor,
        id: actor_id
      }
    ];

    // Si hay mas actores, barro los resultados y los guardo en la variable
    if (results.length > 1)
      actores = results.map(x => {
        return {
          nombre: x.actor,
          id: x.actor_id
        };
      });

    // Armo el objeto de la respuesta y respondo con el mismo
    return res.status(200).send({
      pelicula: pelicula,
      actores: actores,
      genero: genero
    });
  });
});

module.exports = router;
