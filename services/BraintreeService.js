const customerModel = require("../models/CustomerModel.js");
const braintree = require("braintree");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: "config/keys.env" });
}
