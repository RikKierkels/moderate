# Moderate

This project serves as a pet project for trying out various (frontend) frameworks. The main purpose of the applications is to serve as a platform for users to share their pet project ideas. They can create an idea and tag it with an existing set of tags. Users can also comment on each others ideas.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

#### Auth0

Authentication is handled by [Auth0](https://auth0.com). You will need to create an Auth0 account and create an API in the Auth0 dashboard. You can follow the configuration part of [this tutorial](https://auth0.com/blog/developing-a-secure-api-with-nestjs-adding-authorization/).

### Installing

1. Install the dependencies for all of the applications within the Monorepo.

   ```
   npm install
   ```

2. Create an .env file at the root of the repository and add the following keys/values. Then add the Auth0 values for your Auth0 application to the .env file.

   ```
   PORT=7000
   PRODUCTION=false
   AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
   AUTH0_AUDIENCE=YOUR_AUTH0_AUDIENCE
   AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
   AUTH0_CLIENT_SECRET=YOUR_AUTH0_CLIENT_SECRET
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=admin
   DATABASE_NAME=moderate
   DATABASE_SYNCHRONIZE=true
   ```

3. You will need to configure the environment for the clients. The examples below explains which environment settings you should change for each specific client.

   **Angular**

   The environment config files are located at: *apps/moderate/src/environments*

   Replace the placeholder values with your Auth0 credentials.

   ```
   export const environment = {
     PRODUCTION: false,
     API_BASE_URL: '/api',
     AUTH0_DOMAIN: 'YOUR_AUTH0_DOMAIN',
     AUTH0_CLIENT_ID: 'YOUR_AUTH0_CLIENT_ID',
     AUTH0_AUDIENCE: 'YOUR_AUTH0_AUDIENCE'
   };
   ```

4. (optional) It's possible to seed the database with test data by running the following command:

   ```
   npm run seed
   ```

## Running the tests

### Jest

#### API

```
ng test api
```

#### Angular

```
ng test
```

## Deployment

Run the following commands to serve the different applications. Alternatively run their build command to build the applications.

### API

```
ng serve api
```

### Angular

```
ng serve
```

## Built With

* [Angular](https://angular.io) 
* [NestJS](https://nestjs.com) - Node.js framework
* [Auth0](https://auth0.com) - Authentication Client
* [Jest](https://jestjs.io) - Testing framework
* [Nx](https://github.com/nrwl/nx) - Dev Tools for a Monorepo
