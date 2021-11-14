
//This is my entry point file!
//import express
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const customersController = require("./controllers/CustomersController.js");
const productsController = require("./controllers/ProductsController.js");


if (process.env.NODE_ENV != "production") {
    require('dotenv').config({ path: 'config/keys.env' });
}
const app = express();

const corsOptionsDelegate = function (req, callback) {
    const allowlist = [`http://localhost:3000`, 'http://127.0.0.1:3000', 'https://61907538ac6c773eabc14db4--dazzling-bohr-642fda.netlify.app']
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

//middleware
app.use(cors(corsOptionsDelegate))



app.use(express.json());

//retirieve
app.get("/", (req, res) => {

    res.json({
        message: "main page"
    })
});

app.use("/products", productsController);
app.use("/customers", customersController);
//for routes that doesnt exist



app.use("*", (req, res) => {
    res.status(404).json({
        message: "not found"
    })
})


app.listen(process.env.PORT || 5000, () => {

    console.log(`app listening on `);

    mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
        .then(() => {
            console.log("connected to db");
        })
        .catch(err => {
            console.log(err);
        })
});





//handle a route that doesnt exist