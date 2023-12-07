// server.js
const express = require("express");
const { exec } = require("child_process");
const app = express();
const path = require("path");

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "/views"));

app.use(express.static(path.join(__dirname, "..", "/public")));

const rutas = require("./routes");
app.use(rutas);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("error", { error: "Ocurrio un error en el servidor" });
});

const port = process.env.PORT || 5502;

const server = app.listen(port, () => {
  console.log("Servidor escuchando en el puerto 5502");
  const url = "http://localhost:5502";
  switch (process.platform) {
    case "darwin":
      exec(`open ${url}`);
      break;
    case "win32":
      exec(`start ${url}`);
      break;
    default:
      exec(`xdg-open ${url}`);
      break;
  }
});

process.on("SIGINT", () => {
  server.close();
  console.log("servidor detenido");
  process.exit();
});
