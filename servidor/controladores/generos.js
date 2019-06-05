
const express = require('express');
const router = express.Router();
const bd = require('../lib/conexionbd')


/* 
      CONSULTA DE GENEROS
*/

router.get("/", function(req,res){

    const query = "select * from genero";

    bd.query(query, function (error, results, fields) {
        if (error)   return res.status(500).send(error);
        const response = {generos: results}
        res.status(200).send(response);       
      });   
   
  })
  

  module.exports = router;