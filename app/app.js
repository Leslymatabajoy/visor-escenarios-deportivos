const nombreTabla = "escenariodeportivo";

function filtrarPorTipo() {
  const tipo = document.getElementById("tipo").value;
  fetch("http://localhost:5501/filtrarTipo/" + nombreTabla + "/" + tipo)
    .then((response) => response.json())
    .then((data) => {
      const divResultados = document.getElementById("tabla-de-resultados");
      divResultados.innerHTML = "";
      const tabla = document.createElement("table");

      let nombreIndex, tipoIndex;
      const filaEncabezado = document.createElement("tr");
      if (data.length > 0) {
        let index = 0;
        for (const propiedad in data[0]) {
          const celdaEncabezado = document.createElement("th");
          celdaEncabezado.textContent = propiedad;
          filaEncabezado.appendChild(celdaEncabezado);
          if (propiedad === "nombre") {
            nombreIndex = index;
          } else if (propiedad === "tipo") {
            tipoIndex = index;
          }
          index++;
        }
        const celdaEncabezadoUbicacion = document.createElement("th");
        celdaEncabezadoUbicacion.textContent = "Ubicación";
        filaEncabezado.appendChild(celdaEncabezadoUbicacion);
      }
      tabla.appendChild(filaEncabezado);

      data.forEach((objeto) => {
        const fila = document.createElement("tr");
        for (const propiedad in objeto) {
          const celda = document.createElement("td");
          if (propiedad === "nombre" || propiedad === "tipo") {
            celda.setAttribute("contenteditable", "true"); // Hace que la celda sea editable
          }
          celda.textContent = objeto[propiedad];
          fila.appendChild(celda);
        }

        const celdaBoton = document.createElement("td");
        const boton = document.createElement("button");
        boton.setAttribute("id", "ir-a");
        boton.addEventListener("click", function () {
          irUbicacion(geojsonFeature, objeto.id); // Suponiendo que objeto.id contiene el ID de la entidad
        });

        const imgSVG = document.createElement("img");
        imgSVG.setAttribute("src", "../assets/ir-a.svg");
        imgSVG.setAttribute("width", "30");
        imgSVG.setAttribute("height", "30");
        boton.appendChild(imgSVG);

        celdaBoton.appendChild(boton);
        fila.appendChild(celdaBoton);

        tabla.appendChild(fila);
      });
      divResultados.appendChild(tabla);
    })
    .catch((error) => console.error("Error:", error));
}

function filtrarPorId() {
  const id = document.getElementById("id").value;
  fetch("http://localhost:5501/filtrarId/" + nombreTabla + "/" + id)
    .then((response) => response.json())
    .then((data) => {
      const divResultados = document.getElementById("tabla-de-resultados");
      divResultados.innerHTML = "";
      const tabla = document.createElement("table");

      const filaEncabezado = document.createElement("tr");
      if (data.length > 0) {
        for (const propiedad in data[0]) {
          const celdaEncabezado = document.createElement("th");
          celdaEncabezado.textContent = propiedad;
          filaEncabezado.appendChild(celdaEncabezado);
        }
        const celdaEncabezadoUbicacion = document.createElement("th");
        celdaEncabezadoUbicacion.textContent = "Ubicación";
        filaEncabezado.appendChild(celdaEncabezadoUbicacion);
      }
      tabla.appendChild(filaEncabezado);

      data.forEach((objeto) => {
        const fila = document.createElement("tr");
        for (const propiedad in objeto) {
          const celda = document.createElement("td");
          celda.textContent = objeto[propiedad];
          fila.appendChild(celda);
        }
        const celdaBoton = document.createElement("td");
        const boton = document.createElement("button");
        boton.setAttribute("id", "ir-a");
        boton.addEventListener("click", function () {
          irUbicacion(geojsonFeature, objeto.id); // Suponiendo que objeto.id contiene el ID de la entidad
        });

        const imgSVG = document.createElement("img");
        imgSVG.setAttribute("src", "../assets/ir-a.svg");
        imgSVG.setAttribute("width", "30");
        imgSVG.setAttribute("height", "30");
        boton.appendChild(imgSVG);

        celdaBoton.appendChild(boton);
        fila.appendChild(celdaBoton);

        tabla.appendChild(fila);
      });
      divResultados.appendChild(tabla);
    })
    .catch((error) => console.error("Error:", error));
}

function manejarMostrarTabla() {
  const tabla = document.getElementById("contenedor-tabla");
  tabla.style.display = tabla.style.display === "block" ? "none" : "block";
  return tabla;
}

function irUbicacion(geojsonFeature, entidadId) {
  const punto = geojsonFeature.features.find(
    (feature) => feature.properties.id === entidadId
  );

  if (punto) {
    if (marcadoresPorId[entidadId]) {
      var marcadorExistente = marcadoresPorId[entidadId];
      var nuevoIcono = L.icon({
        iconUrl: "../assets/newMarker.svg",
      });

      marcadorExistente
        .setLatLng([
          punto.geometry.coordinates[1],
          punto.geometry.coordinates[0],
        ])
        .setIcon(nuevoIcono);
      map.setView(
        [punto.geometry.coordinates[1], punto.geometry.coordinates[0]],
        20
      );
    }
  }
}

function enviarActualizaciones(nombreT, cambios) {
  const url = `http://localhost:5501/EditarNombreYTipo/${nombreT}`;
  const opciones = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cambios),
  };

  fetch(url, opciones)
    .then((response) => response.json())
    .then((data) => {
      console.log("Actualizaciones exitosas:", data);
    })
    .catch((error) => {
      console.error("Error al actualizar:", error);
    });
}

const nombreIndex = 1;
const tipoIndex = 2;

function guardarCambios() {
  const tabla = document
    .getElementById("tabla-de-resultados")
    .querySelector("table");
  const filas = tabla.querySelectorAll("tr");
  const cambios = [];

  for (let i = 1; i < filas.length; i++) {
    const fila = filas[i];
    const id = fila.querySelector("button[id='ir-a']").getAttribute("data-id");
    const nombreEditado = fila.children[nombreIndex].textContent;
    const tipoEditado = fila.children[tipoIndex].textContent;
    cambios.push({ id, nombre: nombreEditado, tipo: tipoEditado });
  }

  enviarActualizaciones(nombreTabla, cambios);
}
