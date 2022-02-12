const express = require("express");

const router = express.Router();
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../services/AuthService.js");

const {
  userById,
  read,
  update,
  //   purchaseHistory,
} = require("../services/CustomerService.js");
const { create } = require("../services/OrderService");

router.post("/create/:userId", requireSignin, isAuth, create);

router.param("userId", userById);

module.exports = router;
