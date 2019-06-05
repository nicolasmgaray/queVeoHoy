CREATE TABLE `actor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2089 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `genero` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `pelicula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  `duracion` int(5) DEFAULT NULL,
  `director` varchar(400) DEFAULT NULL,
  `anio` int(5) DEFAULT NULL,
  `fecha_lanzamiento` date DEFAULT NULL,
  `puntuacion` int(2) DEFAULT NULL,
  `poster` varchar(300) DEFAULT NULL,
  `trama` varchar(700) DEFAULT NULL,
  `genero_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=744 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `actor_pelicula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `actor_id` int(11) DEFAULT NULL,
  `pelicula_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2965 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `vista_actores_pelicula` AS
    SELECT 
        `actor`.`nombre` AS `actor`,
        `actor`.`id` AS `actor_id`,
        `genero`.`nombre` AS `genero`,
        `pelicula`.`id` AS `id`,
        `pelicula`.`titulo` AS `titulo`,
        `pelicula`.`duracion` AS `duracion`,
        `pelicula`.`director` AS `director`,
        `pelicula`.`anio` AS `anio`,
        `pelicula`.`fecha_lanzamiento` AS `fecha_lanzamiento`,
        `pelicula`.`puntuacion` AS `puntuacion`,
        `pelicula`.`poster` AS `poster`,
        `pelicula`.`trama` AS `trama`,
        `pelicula`.`genero_id` AS `genero_id`
    FROM
        (((`pelicula`
        JOIN `actor_pelicula` ON ((`pelicula`.`id` = `actor_pelicula`.`pelicula_id`)))
        JOIN `actor` ON ((`actor`.`id` = `actor_pelicula`.`actor_id`)))
        JOIN `genero` ON ((`pelicula`.`genero_id` = `genero`.`id`)));

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `vista_peliculas_genero` AS
    SELECT 
        `genero`.`nombre` AS `genero`,
        `pelicula`.`id` AS `id`,
        `pelicula`.`titulo` AS `titulo`,
        `pelicula`.`duracion` AS `duracion`,
        `pelicula`.`director` AS `director`,
        `pelicula`.`anio` AS `anio`,
        `pelicula`.`fecha_lanzamiento` AS `fecha_lanzamiento`,
        `pelicula`.`puntuacion` AS `puntuacion`,
        `pelicula`.`poster` AS `poster`,
        `pelicula`.`trama` AS `trama`,
        `pelicula`.`genero_id` AS `genero_id`
    FROM
        (`pelicula`
        JOIN `genero` ON ((`pelicula`.`genero_id` = `genero`.`id`)));

