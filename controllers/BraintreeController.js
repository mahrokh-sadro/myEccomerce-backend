const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../services/AuthService.js");
const { userById } = require("../services/CustomerService.js");

router.get("/getToken/:userId", requireSignin, isAuth, generateToken);

router.param("userId", userById);

module.exports = router;
