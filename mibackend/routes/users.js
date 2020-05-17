var express = require("express");
var router = express.Router();
const Pokemon = require("../models/pokemon/pokemon");
/* GET users listing. */
router.get("/guardar", function (req, res, next) {
  const nombre = req.query.nombre;
  const imagen = req.query.imagen;

  const guardarDocumento = new Pokemon({
    nombre: nombre,
    imagen: imagen,
  });

  guardarDocumento
    .save()
    .then((documento) => {
      res.send({
        mensaje: "GUARDADO CON EXITO!",
        documento: documento,
      });
    })
    .catch((e) => {
      res.send({
        mensaje: "HUBO UN ERROR!",
        error: e,
      });
    });
});

router.get("/leer", function (req, res, next) {
  Pokemon.find()
    .then((result) => {
      res.status(200).send({
        success: true,
        pokemon: result,
      });
    })
    .catch((e) => {
      res.send({
        success: false,
        error: e,
      });
    });
});

router.get("/borrar", function (req, res, next) {
  Pokemon.collection
    .drop()
    .then((result) => {
      res.status(200).send({
        success: true,
      });
    })
    .catch((e) => {
      res.send({
        success: false,
        error: e,
      });
    });
});

module.exports = router;
