const express = require("express");
const router = express.Router();
const { FiltrarTipo, FiltrarId, EditarNombreYTipo } = require("./methods");
const entidad_tipo = new FiltrarTipo();
const entidad_id = new FiltrarId();
const editar = new EditarNombreYTipo();

router.get('/', (req, res) => {
  res.redirect('/home')
})
router.get('/home', (req, res) => {
  res.render('index')
})

router.get("/FiltrarTipo/:nombreTabla/:tipo", async (req, res) => {
  const resultado = await entidad_tipo.filtrarTipo(
    req.params.nombreTabla,
    req.params.tipo
  );
  res.json(resultado);
});

router.get("/FiltrarId/:nombreTabla/:id", async (req, res) => {
  const resultado = await entidad_id.filtrarId(
    req.params.nombreTabla,
    req.params.id
  );
  res.json(resultado);
});

router.put("/EditarNombreYTipo/:nombreTabla", async (req, res) => {
  const { nombreTabla } = req.params;
  const cambios = req.body; // Recibe el arreglo de cambios del cuerpo de la solicitud

  try {
    // Itera sobre el arreglo de cambios y actualiza cada fila
    for (const cambio of cambios) {
      await editar.editarNombreYTipo(
        nombreTabla,
        cambio.id,
        cambio.nuevoNombre,
        cambio.nuevoTipo
      );
    }
    res.json({ message: "Actualizaciones completadas con éxito" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;