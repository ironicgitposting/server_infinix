# Instructions to start a development environment

## Prerequisites

- NodeJS 14.17.6 LTS (https://nodejs.org/en/)
- Git 2.33.0 (https://git-scm.com/)
- Postgresql 13.4 (https://www.postgresql.org/download/)

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
DB_HOST=127.0.0.1
DB_USERNAME='postgres'
DB_PASSWORD='postgres'
LOCAL_DB_PORT=5432

```

## Create and setup databases

```
npm run db:create
npm run db:migrate
npm run db:seeds

```

## Check instructions in setup.md to start a deployment server
