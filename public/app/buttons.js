
//boton ubicacion gps
var gpsBoton = L.control({ position: 'topright' });
gpsBoton.onAdd = function () {
    var div = L.DomUtil.create('div', 'mi-boton-gps');
    div.innerHTML = '<button id="boton-gps"><div class="img-button-gps"/></button>';
    return div;
};
gpsBoton.addTo(map);
