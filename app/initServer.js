var Service = require('node-windows').Service;

// Crear un nuevo objeto de servicio
var svc = new Service({
  name: 'Inicializar el servidor',
  description: 'El servidor se incializa automaticamente.',
  script: './server.js'
});

// Escuchar el evento "install", que indica que
// el proceso está disponible como un servicio.
svc.on('install', function() {
  svc.start();
});

svc.install();