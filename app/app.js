const nombreTabla = "escenariodeportivo";
let nombreIndex, tipoIndex; // Definirlos fuera de la función para que sean accesibles globalmente

function filtrarPorTipo() {
  const tipo = document.getElementById("tipo").value;
  fetch("http://localhost:5501/filtrarTipo/" + nombreTabla + "/" + tipo)
    .then((response) => response.json())
    .then((data) => {
      const divResultados = document.getElementById("tabla-de-resultados");
      divResultados.innerHTML = "";
      const tabla = document.createElement("table");

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
        celdaEncabezadoUbicacion.textContent = "Acciones";
        filaEncabezado.appendChild(celdaEncabezadoUbicacion);
      }
      tabla.appendChild(filaEncabezado);

      data.forEach((objeto, index) => {
        const fila = document.createElement("tr");
        Object.keys(objeto).forEach((propiedad, i) => {
          const celda = document.createElement("td");
          if (i === nombreIndex || i === tipoIndex) {
            celda.setAttribute("contenteditable", "true");
          }
          celda.textContent = objeto[propiedad];
          fila.appendChild(celda);
        });

        const celdaBoton = document.createElement("td");
        const boton = document.createElement("button");
        boton.setAttribute("id", "ir-a")
        boton.addEventListener("click", function () {
          irUbicacion(geojsonFeature, objeto.id);
        });

        const imgSVG = document.createElement("img");
        imgSVG.setAttribute("src", "../assets/ir-a.svg");
        imgSVG.setAttribute("width", "30");
        imgSVG.setAttribute("height", "30");
        boton.appendChild(imgSVG);

        const botonSave = document.createElement("button");
        botonSave.setAttribute("id", "save")
        botonSave.addEventListener("click", function () {
          guardarCambios(objeto.id, index + 1); // Pasar el id y el índice de la fila a guardarCambios
        });

        const img_save = document.createElement("img");
        img_save.setAttribute("src", "../assets/save.svg");
        img_save.setAttribute("width", "30");
        img_save.setAttribute("height", "30");
        botonSave.appendChild(img_save);

        celdaBoton.appendChild(boton);
        celdaBoton.appendChild(botonSave);
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
        celdaEncabezadoUbicacion.textContent = "Acciones";
        filaEncabezado.appendChild(celdaEncabezadoUbicacion);
      }
      tabla.appendChild(filaEncabezado);

      data.forEach((objeto, index) => {
        const fila = document.createElement("tr");
        Object.keys(objeto).forEach((propiedad, i) => {
          const celda = document.createElement("td");
          if (i === nombreIndex || i === tipoIndex) {
            celda.setAttribute("contenteditable", "true");
          }
          celda.textContent = objeto[propiedad];
          fila.appendChild(celda);
        });

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

        const botonSave = document.createElement("button");
        botonSave.setAttribute("id", "save")
        botonSave.addEventListener("click", function () {
          guardarCambios(objeto.id, index + 1); // Pasar el id y el índice de la fila a guardarCambios
        });

        const img_save = document.createElement("img");
        img_save.setAttribute("src", "../assets/save.svg");
        img_save.setAttribute("width", "30");
        img_save.setAttribute("height", "30");
        botonSave.appendChild(img_save);

        celdaBoton.appendChild(boton);
        celdaBoton.appendChild(botonSave);
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
    body: JSON.stringify([cambios]), // Envía los cambios como un arreglo
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

function guardarCambios(rowId, rowIndex) {
  const tabla = document
    .getElementById("tabla-de-resultados")
    .querySelector("table");
  const fila = tabla.querySelectorAll("tr")[rowIndex];
  const id = rowId;
  const nuevoNombre = fila.children[nombreIndex].textContent;
  const nuevoTipo = fila.children[tipoIndex].textContent;
  const cambios = { id, nuevoNombre, nuevoTipo }; // Asegúrate de que las propiedades coincidan con las del servidor
  enviarActualizaciones(nombreTabla, cambios); // Envía solo los cambios de la fila específica
}
