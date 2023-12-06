// Crea un nuevo grupo de clusters (paquete) de marcadores
var markers = L.markerClusterGroup({
  maxClusterRadius: 20,
  iconCreateFunction: function (cluster) {
    return L.icon({ iconUrl: "../assets/point.svg", iconSize: [25, 25] });
  },
});

var marcadoresPorId = {};

var geojsonLayer = L.geoJSON(geojsonFeature, {
  pointToLayer: function (feature, latlng) {
    var marker = L.marker(latlng, { icon: Point });
    marker.bindPopup(
      feature.properties.nombre + ", " + feature.geometry.coordinates
    );

    marcadoresPorId[feature.properties.id] = marker;

    return marker;
  },
});

// Agrega la capa GeoJSON al grupo de clusters de marcadores
markers.addLayer(geojsonLayer);

// Agrega el grupo de clusters de marcadores al mapa
map.addLayer(markers);

var overlayMaps = {
  "Escenarios deportivos": markers,
};
// añade tanto las capas que se crean en el modulo map.js asi como tambien la capa de marcadores
L.control.layers(baseLayers, overlayMaps).addTo(map);
