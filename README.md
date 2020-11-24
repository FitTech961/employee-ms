# Employee-ms

## Table of contents

- [Requirements](#requirements)
- [Run the service locally](#run-the-service-locally)
- [Commands](#commands)
- [APIS: routes, headers and parameters](#apis-routes-headers-and-parameters)
  - [List of routes](#list-of-routes)
  - [Headers](#headers)
- [Tests](#tests)
- [Project Structure](#project-structure)
  - [src](#src)
    - [db](#db)
    - [errors](#errors)
    - [controllers](#controllers)
    - [services](#services)
    - [routers](#routers)
    - [route](#route)
    - [utils](#utils)
    - [validation](#validation)
  - [specs](#specs)
  - [test](#test)

## Requirements

For development, you will only need [Node.js](http://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed on your environement.

## Run the service locally

First clone the project then in the root directory create `.env` file, for adding environment variables.

```
PORT=5000
MONGODB_HOST='<YOUR MONGODB HOST>'
MONGODB_PORT='<YOUR MONGODB PORT>'
MONGODB_DATABASE='<DB_NAME>'
MONGODB_USER='<YOUR MONGO USERNAME>'
MONGODB_PWD='<YOUR MONGO PASSWORD>'
BASE_URL='<CURRENT MS URL>'
PRIVATE_KEY='<YOUR HASH PRIVATE KEY>'
JWT_SECRET='<YOUR JWT SECRET KEY>'
```

## Commands

|Command          |Description                                 |
|:----------------|:-------------------------------------------|
|`yarn start`     |Starts the service                          |
|`yarn start:dev` |Starts the service in development mode and runs using `nodemon` that restarts the service automatically when a file is changed |
|`yarn test`      |Runs integration and unit tests|
|`yarn lint`      |Checks the linting of the project           |

## APIS: Routes, headers and parameters

### List of routes

Login routes

|HTTP Method|Route      |Description                               |
|:----------|:----------|:---------------------------------------- |
|`POST`      |`/login/signin`        |Login using username and hashed password                             |
|`POST`      |`/login/register`   |Register new user enabling them to use the login API      |

Employee routes

|HTTP Method|Route      |Description                               |
|:----------|:----------|:---------------------------------------- |
|`GET`      |`employee?id=<ID>&email=<email>`        | If no query params are passed it will get all employees or you can search for a specific employee by id or any key existing in the employee object.                             |
|`POST`      |`/employee`   |Add new employee to the database, noting that email and phone number are unique.     |
|`PATCH`      |`/employee?id=<ID>&email=<email>`   | Update employee by Id or email.        |
|`DELETE`      |`/employee?id=<ID>`   |Delete employee by Id.     |

### Headers

The above `/employee` routes including a request body, such as the `POST`, `PATCH` and `DELETE` methods, require `Authorization` header.
```
Authorization:Bearer jwt_string
```

## Tests

To run the tests, the server should be running and mongoDB started

The tests include:

- **Unit Tests**: to test the functions and include sample possible use cases
- **Integration**: To test the APIs and the server response by including sample possible use cases

In order to achieve this, we used `mocha` and `chai`.

## Project Structure

```bash
|- src
|  |-- auth
|  |-- db
|  |-- errors
|  |-- <api name>
|  |  |-- controller
|  |  |-- service
|  |-- routers
|  |-- routes
|  |-- utils
|  |-- validation
|- test
```

### src

#### db

Includes database connection handling, common db collection methods, etc..

### auth

Here you will find function related to hashing, generating a jwt and verifying a jwt.

#### errors

Here you can find utlity functions to help you handle errors.

#### API

This folder is divided into two sub directories

- **controller**: includes code that accepts the request and sends it to other corresponding modules and then handles the response or occuring errors.
- **service**: this is where the business logic resides. It processes the requested oparations forwarded by the controller.

#### routers

Here are located the express routers.

#### route

Each route is located in a separated file to keep it clear.

#### utils

You can find here utility functions that could be used all aroud the project without having dependencies with other modules.

#### validation

Here you will find the validation schemas for validating the request body.

### test

The automated test scripts live in this folder. It is separated into three sub folders:

- **Unit**: where we test service functions
- **Integration**: where we perform end-to-end testing
