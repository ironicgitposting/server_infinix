# Guide de déploiement

## Prerequis

## Java 8 (JRE)

https://www.oracle.com/java/technologies/javase-jre8-downloads.html

## Tomcat 9

https://tomcat.apache.org/download-90.cgi

### Node.Js

Télécharger Node.js:
https://nodejs.org/en/download/

Choisir la version LTS

## Postgresql

Télécharger Postgresql

## Git

Télécharger Git for windows

## Télécharger les sources

```
git clone https://github.com/ironicgitposting/server_infinix.git
git clone https://github.com/ironicgitposting/client_infinix.git
```

---

# ANGULAR SECTION

Build your Angular application with angular-cli to dist folder

```
ng build --prod --output-path ./dist
```

```
forever start infinix-client-bootstrap.js
```

Go to URL:
http://localhost/login

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

## Installer forever

```
npm install -g forever
```

## Modifier le script forever

## Ajouter le script pm2 aux applications de démarrage windows

Touche Win + R
shell:startup

Coller le script forever

## Redémarrer le pc
