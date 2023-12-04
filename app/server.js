// server.js
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const { FiltrarTipo, FiltrarId, EditarNombreYTipo } = require("./methods");
const entidad_tipo = new FiltrarTipo();
const entidad_id = new FiltrarId();
const editar = new EditarNombreYTipo();

app.get("/FiltrarTipo/:nombreTabla/:tipo", async (req, res) => {
  const resultado = await entidad_tipo.filtrarTipo(
    req.params.nombreTabla,
    req.params.tipo
  );
  res.json(resultado);
});

app.get("/FiltrarId/:nombreTabla/:id", async (req, res) => {
  const resultado = await entidad_id.filtrarId(
    req.params.nombreTabla,
    req.params.id
  );
  res.json(resultado);
});

app.put("/EditarNombreYTipo/:nombreTabla", async (req, res) => {
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

app.listen(5501, () => {
  console.log("Servidor escuchando en el puerto 5501");
});
