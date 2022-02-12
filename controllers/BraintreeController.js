const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../services/AuthService.js");
const { userById } = require("../services/CustomerService.js");
const {
  generateToken,
  processPayment,
} = require("../services/BraintreeService.js");

router.get("/getToken/:userId", requireSignin, isAuth, generateToken);
router.post("/payment/:userId", requireSignin, isAuth, processPayment);

router.param("userId", userById);

module.exports = router;
