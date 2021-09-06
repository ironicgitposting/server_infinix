# Production deployment guide

## Prerequisites

- Follow the instructions given in README.md to setup and start a development server.

## Install Node-Windows

```
npm install -g node-windows
```

## Service creation

Go to server sources folder:

```
cd path/to/server_infinix
```

Create and start Windows Service:

```
node ./svc.js
```

## Server should be running at localhost:3000
