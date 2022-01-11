const express = require("express");
const router = express.Router();
const { userSignupValidator } = require("../validator");
// const { check } = require("express-validator");
const { check, body, validationResult } = require("express-validator");

const {
  signup,
  signin,
  signout,
  requireSignin,
  //   userSignupValidator,
} = require("../services/AuthService.js");

router.post(
  "/signup",
  //   userSignupValidator,
  //   [
  //     // check("name", "Name at least should be 3 characters").isLength({ min: 3 }),
  //     check("email", "Email should be valid").isEmail(),
  //     check("password", "Password at least should be 6 characters").isLength({
  //       min: 6,
  //     }),
  //   ],

  signup
); //
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
