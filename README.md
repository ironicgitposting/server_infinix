# Instructions to start a development environment

## Prerequisites

- NodeJS
- Git
- Npm
- Postgresql

## Download Sources

```
git clone https://github.com/ironicgitposting/server_infinix.git
```

## Install Packages

Go to sources root folder

```
cd path/to/server_infinix
```

Install Packages

```
npm install
```

## Install Global Packages

```
npm install -g sequelize-cli
```

## Add a .env file in project root folder (Change Database credentials accordingly):

```
LOCAL_PORT=3000
LOCAL_DB_HOST=127.0.0.1
LOCAL_DB_USERNAME='postgres'
LOCAL_DB_PASSWORD='postgres'
LOCAL_DB_PORT=5432

```

## Installer les bases de données

```

npm run db:create
npm run db:migrate
npm run db:seeds

```
