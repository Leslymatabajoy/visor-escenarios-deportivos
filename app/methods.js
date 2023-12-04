const { log } = require("console");
const pool = require("./db"); // debes importar pool desde tu archivo de base de datos db.js

class FiltrarTipo {
  constructor() {}

  async filtrarTipo(nombreTabla, tipo) {
    try {
      const result = await pool.query(
        `SELECT * FROM ${nombreTabla} WHERE tipo = '${tipo}'`
      );
      return result.rows;
    } catch (err) {
      throw err;
    }
  }
}

class FiltrarId {
  constructor() {}

  async filtrarId(nombreTabla, id) {
    try {
      const result = await pool.query(
        `SELECT * FROM ${nombreTabla} WHERE id = '${id}'`
      );
      return result.rows;
    } catch (err) {
      throw err;
    }
  }
}

class EditarNombreYTipo {
  constructor() {}

  async editarNombreYTipo(nombreTabla, id, nuevoNombre, nuevoTipo) {
    try {
      const result = await pool.query(
        `UPDATE ${nombreTabla} SET nombre = $1, tipo = $2 WHERE id = $3 RETURNING *`,
        [nuevoNombre, nuevoTipo, id]
      );
      return result.rows;
    } catch (err) {
      console.error(
        `Error al actualizar la tabla ${nombreTabla}: ${err.message}`
      );
      throw new Error(
        `Error al actualizar la tabla ${nombreTabla}: ${err.message}`
      );
    }
  }
}

module.exports = { FiltrarTipo, FiltrarId, EditarNombreYTipo }; // debes exportar todos metodos que hagas
