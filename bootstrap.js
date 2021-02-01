/**
Point d'entrée du processus Nodejs
Préparation du serveur express
 */
const debug = require('debug')('node-angular');
const http = require('http');
const app = require('./src/app');
/*
On s'assure que le port sur lequel on essaye de lancer
l'application soit valide
*/
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || '3000');
const bind = typeof port === 'string' ? `pipe ${port}` : `port ${port}`;

/**
Permet de gérer les erreurs au démarrage du serveur,
selon le type d'erreur, on reçoit un message explicite
puis on traite celle-ci (pour l'instant on kill le process)
 */
const handleError = {
  // https://nodejs.org/api/errors.html
  EACCES: () => {
    debug(`${bind} requires elevated privileges`);
    process.exit(1);
  },
  EADDRINUSE: () => {
    debug(`${bind} is already in use`);
    process.exit(1);
  },
};

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  if (Object.prototype.hasOwnProperty.call(handleError, error.code)) {
    handleError(error.code);
  } else {
    throw error;
  }
};

app.set('port', port);

const server = http.createServer(app);

// Initial States
const onListening = () => {
  const addr = server.address();
  console.log(`Listening on ${bind}`);
  console.log(`Server Address: ${addr.address}`);
};

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
