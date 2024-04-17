# NestJS Service

NestJS services using REST API (both internal and external)

## Recipe

- Node v16 : [NVM](https://github.com/nvm-sh/nvm) or [Download](https://nodejs.org/en/download/)
- PostgreSQL vXX
- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

Create `.env` file in the root folder, and add this line

```
# GENERAL
NODE_ENV=development
APP_PORT=3000

# POSTGRESQL
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
```

<br/><br/>
Start application by running command

```
  docker-compose up
```

Your application should be running on `http://localhost:3000`

See Documentation by accessing
`http://localhost:3000/docs`
<br/><br/>

# Port Allocation

API Port

```
localhost:3000
```

Documentation

```
localhost:3000/docs
```

PostgreSQL

```
localhost:5432
```

<br/><br/>

# Integrated Features
 - NestJS Router
 - TypeORM
 - PostgreSQL
 - Swagger