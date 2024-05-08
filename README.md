# Ripple

## Name

Ripple Application

## Description

This repository contains both web App and API of the Ripple Application-a workflow automation solution. The API is a Node Js/ExpressJS application backed by a MongoDb database. The code base can be found in the `/api` directory of the project. The web app is a Next Js, React application located in the `/app` directory of project. Both part of the application was written solely with typescript and individualy containerized with docker.

## Dependencies

This application was built atop docker as such the only dependencies for running the application is docker and docker-compose.

## Starting the Application

After cloning this repository. Follow the following procedure to set up the API.
NOTE: Ensure docker and docker-compose is successfully installed in your device before running application.

1. Create a MongoDb cluster and database on MongoDb Atlas https://www.mongodb.com/products/platform/atlas-database and ensure to copy the database connection string.
2. Navigate to the `/api` folder of the project.
3. Create a .env file and set the following environment variables.
   - DB_URL - this should be the database connection string.
   - PORT - this should be the port number which the application should run on. Defaults to 8080 if not provided.
4. Run `docker-compose up` on your terminal. This should start the application on the specified port. Confirm the app is running correctly by going to `http://localhost:${PORT}` on the browser.
5. Optionally run `yarn db:seed` on the terminal to seed trigger client data. The seed data can be found and updated on the `/api/src/seeders/trigger.seeders.ts` file.

Once the API is started, follow the following procedures to start the web app.

1. Navigate to the `/app` folder of the project.
2. Create a .env file and set the following environment variables.
   - ROOT_API_URL - this should be set to the url which the API is running on prefixed with `/api/v1` e.g http://localhost:8080/api/v1 (assuming the API is running on http://localhost:8080).
   - TRIGGER_ROOT_URL - this should be set to $ROOT_API_URL/triggers (NextJs allows this format. It expands the url to include the already defined `ROOT_API_URL` variable at runtime)
   - WORKFLOW_ROOT_URL - this should be set to $ROOT_API_URL/workflows
3. Run `docker-compose up` on your terminal. This should start the application on port 3000. Confirm the app is running correctly by going to `http://localhost:3000` on the browser.

To run any of the either the API or web app without docker.

1. Ensure NodeJs is installed in your device.
2. Navigate to the correct folder - `/api` for API or `/app` for web app.
3. Run `yarn` to install dependencies.
4. Run `yarn dev` to start the application.

## Package Manager

yarn

## Deployment

Deployment of the application was done using Amazon ECS (Elastic Container Service) and managed with AWS Fargate. To replicate follow the outlined procedures.

## Project status

Development phase
