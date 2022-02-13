//This is my entry point file!
//import express
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const expressValidator = require("express-validator");

const customersController = require("./controllers/CustomersController.js");
const productsController = require("./controllers/ProductsController.js");
const AuthController = require("./controllers/AuthController.js");
const BraintreeController = require("./controllers/BraintreeController.js");
const OrderController = require("./controllers/OrderController.js");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: "config/keys.env" });
}
const app = express();

const corsOptionsDelegate = function (req, callback) {
  const allowlist = [
    `http://localhost:3000`,
    "http://127.0.0.1:3000",
    "https://eemart.netlify.app/",
    "http://eemart.netlify.app/",
    "https://eemart.netlify.app",
    "http://eemart.netlify.app",
  ];
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

//middleware
app.use(morgan("dev"));
app.use(cors(corsOptionsDelegate));
app.use(bodyParser.json());
// app.use(express.json());
app.use(cookieParser());
// app.use(expressValidator());

//retirieve
app.get("/", (req, res) => {
  res.json({
    message: "main page",
  });
});

app.use("/auth", AuthController);
app.use("/products", productsController);
app.use("/", customersController);
app.use("/braintree", BraintreeController);
app.use("/order", OrderController);
// app.use("/customers", superMahrokhController);
// app.use("/customers", orderController);

//for routes that doesnt exist

app.use("*", (req, res) => {
  res.status(404).json({
    message: "page not found",
  });
});

const HTTP_PORT = process.env.PORT || 5000;

app.listen(HTTP_PORT, () => {
  console.log(`app listening on `);

  mongoose
    .connect(process.env.MONGO_DB_CONNECTION_STRING)
    .then(() => {
      console.log("connected to db " + HTTP_PORT);
    })
    .catch((err) => {
      console.log(err);
    });
});

//handle a route that doesnt exist
