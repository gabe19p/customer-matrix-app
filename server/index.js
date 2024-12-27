/*
============================================
; Title:  index.js
; Author: gabe purselley
; Date:   24 Dec 24
; Description: main server file to connect
;   to the database and run APIs use the
;   'npm run server' command to start
;   use 'http://localhost:3000/api-docs/'
;   use ng serve --proxy-config proxy.conf.json
;   npm ci && npm run build
;===========================================
*/

// requiring essential middleware
require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerJS = require("swagger-jsdoc");

// requiring the routes for the token
const locationAPI = require("./routes/location-routes");

// running express and setting it to the app variable
const app = express();

// using the app variable to set the port and use JSON
app.set("port", process.env.PORT || 3000); //  local host port
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to MongoDB server
// const dbURI = process.env.MONGODB_URI;
const dbURI =
  "mongodb+srv://danialpurselley:M4d1s0n13@customer-matrix-cluster.cuqo7.mongodb.net/customer-matrix-db?retryWrites=true&w=majority&appName=customer-matrix-cluster";
mongoose
  .connect(dbURI)
  .then(() => {
    console.log(`Connection to tokenCluster on MongoDB Atlas successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  });

// swagger documentation to define the GUI for testing
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "customer-matrix",
      version: "1.0.0",
    },
  },
  apis: [`${__dirname}/routes/*.js`], //don't leave off the parent folder
};
const openapiSpecification = swaggerJS(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/api", locationAPI);

// listen for the server connection
http.createServer(app).listen(app.get("port"), function () {
  console.log(`Application started and listening on port ${app.get("port")}`);
});
