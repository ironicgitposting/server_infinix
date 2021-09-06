# Guide de déploiement

## Prerequis
### Node.Js

Télécharger Node.js:
https://nodejs.org/en/download/
Choisir la version LTS

## Postgresql

Télécharger Postgresql 13

## Git

Télécharger Git for windows

## node-windows
```
npm install -g node-windows
```


## Télécharger les sources

```
git clone https://github.com/ironicgitposting/server_infinix.git
git clone https://github.com/ironicgitposting/client_infinix.git
```

---

# ANGULAR SECTION

## Build your Angular application with angular-cli to dist folder

```
ng build --prod --output-path ./dist
```

## Démarrer le service:
node /path/to/client/svc.js node /path/to/client/svc.js


# SERVER SECTION

## Installer Sequelize-cli

npm install -g sequelize-cli

## Installer les modules nodes

Depuis le repertoire des projets

```
cd ./server_infinix
npm install

cd ./client_infinix
npm install
```

## Ajouter le fichier .env à la racine du server

```
LOCAL_PORT=3000
LOCAL_DB_HOST=127.0.0.1
LOCAL_DB_USERNAME='postgres'
LOCAL_DB_PASSWORD='postgres'
LOCAL_DB_PORT=5432
```

## Installer les bases

```
npm run db:create
npm run db:migrate
npm run db:seeds
```

## Démarrer le service
node /path/to/server/svc.js


Go to URL:
http://localhost/login


