# Portfolio Tracking API

A portfolio tracking API that allows adding/deleting/updating trades and can do basic return calculations.

## Table of Contents
- [Introduction](#introduction)
- [API Documentation](#api-documentation)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Routes](#routes)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This API provides functionality for managing a portfolio, including adding, deleting, and updating trades, as well as performing basic return calculations.

## API Documentation

The API documentation is available in the [Swagger YAML file](./swagger.yaml). You can access it in local with http://localhost:8080/api-docs/

## Setup

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ravipateldhg/portfolio.git

2. Install dependencies:

   ```bash
   npm install

3. Start the server:

   ```bash
   npm start

## Environment Variables

Make sure to set the following environment variables:

* PORT: The port number for the Express server.
* MONGODB_USER: MongoDB username.
* MONGODB_PASSWORD: MongoDB password.
* MONGODB_HOST: MongoDB host.
* MONGODB_PORT: MongoDB port.
* MONGODB_DATABASE: MongoDB database name.
Example .env file:

   ```bash
   PORT=3000
   MONGODB_USER=myuser
   MONGODB_PASSWORD=mypassword
   MONGODB_HOST=localhost
   MONGODB_PORT=27017
   MONGODB_DATABASE=mydatabase

## Usage

Once the server is running, you can use tools like Postman or curl to interact with the API endpoints.

## Routes

The API provides the following routes:

* /api/v1/portfolio: Portfolio-related endpoints.
* /api/v1/trade: Trade-related endpoints.
* /api/v1/stock: Stock-related endpoints.

For detailed route information, refer to the Swagger YAML file.

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* Swagger/OpenAPI

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License