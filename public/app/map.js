// esta seccion crea el mapa
var map = L.map("map", {
  center: [3.4667822154886214, -76.53100337169667],
  zoom: 14,
  maxZoom: 18,
  minZoom: 13,
  maxBounds: L.latLngBounds(L.latLng(-200, -280), L.latLng(200, 280)),
});
// esta seccion define los mapas base que se utilizarán
var Mapbox_Streets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "&copy; <a href='https://www.mapbox.com/about/maps/' target='_blank'>Mapbox</a> &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
    accessToken:
      "pk.eyJ1IjoibGVzbHltYXRhYmFqb3kiLCJhIjoiY2xwcTdwaTRkMHFyODJzb2liYXVrNzVxcCJ9.6-K6QdfQKRy-WwTTZHHxBA",
    id: "mapbox/streets-v11",
  }
).addTo(map);

var Mapbox_Satellite = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "&copy; <a href='https://www.mapbox.com/about/maps/' target='_blank'>Mapbox</a> &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
    accessToken:
      "pk.eyJ1IjoibGVzbHltYXRhYmFqb3kiLCJhIjoiY2xwcTdwaTRkMHFyODJzb2liYXVrNzVxcCJ9.6-K6QdfQKRy-WwTTZHHxBA",
    id: "mapbox/satellite-v9",
  }
);

var Mapbox_Navigation_Nigth = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "&copy; <a href='https://www.mapbox.com/about/maps/' target='_blank'>Mapbox</a> &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
    accessToken:
      "pk.eyJ1IjoibGVzbHltYXRhYmFqb3kiLCJhIjoiY2xwcTdwaTRkMHFyODJzb2liYXVrNzVxcCJ9.6-K6QdfQKRy-WwTTZHHxBA",
    id: "mapbox/navigation-night-v1",
  }
);

// esta seccion organiza en un objeto las cartografias base
var baseLayers = {
  "Cartografia Base": Mapbox_Streets,
  Satelite: Mapbox_Satellite,
  "Cartografia Nocturna": Mapbox_Navigation_Nigth,
};
// esta linea añade el controlador de escala al mapa
L.control.scale().addTo(map);
// esta linea define los pocos parametros que el metodo AutoGraticule permite
var options = {
  redraw: "moveend",
  minDistance: 100,
};
// en esta linea se añade la grilla al mapa con AutoGraticule
// new L.AutoGraticule(options).addTo(map);
// esta seccion añade la funcion de busqueda al mapa - geocodificacion
L.Control.geocoder({
  position: "topleft",
}).addTo(map);
