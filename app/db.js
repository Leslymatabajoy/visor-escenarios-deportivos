const { Pool } = require("pg"); // debes instalar usando npm install pg

const pool = new Pool({
  user: "postgres",
  host: "escenarios-deportivos.cuzaxiegjpbx.us-east-1.rds.amazonaws.com", // debes poner tu host, en este caso el de aws de la RDS el mismo con el que te conectas en pgAdmin
  database: "escenarios-deportivos", // debes poner le nombre de tu base de datos
  password: "database-1", // debes poner tu contraseña
  port: 5432,
});

module.exports = pool;
