const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const bcrypt = require("bcryptjs");
const customerModel = require("../models/CustomerModel.js");
// const { comparePassword  = require("../models/CustomerModel.js");

var expressValidator = require("express-validator");

exports.signup = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  //use validator
  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({
      message: `bad request`,
    });
  }

  customerModel
    .findOne({ email })
    .then((user) => {
      if (user) {
        res.status(400).json({
          error: `email is taken`,
        });
      } else {
        const newCustomer = new customerModel(req.body);
        newCustomer.save().then((customer) => {
          res.json({
            message: "new customer got created",
            data: customer,
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error ${err}`,
      });
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body.email);
  customerModel.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    } else {
      bcrypt.compare(password, user.password).then((isMatched) => {
        if (!isMatched) {
          return res.status(401).json({
            error: "Email and password dont match",
          });
        } else {
          const token = jwt.sign(
            { _id: user._id, role: user.role },
            "aveiheislkcmalxjoqieqAPOi3tu45thhijsjsvfdnvlfdvowdpwip2"
          );
          res.cookie("token", token, { expire: new Date() + 9999 });
          const { _id, firstName, lastName, email, role } = user;

          return res.json({
            token,
            user: { _id, firstName, lastName, email, role },
          });
        }
      });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "signout success",
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resourse! Access denied",
    });
  }
  next();
};

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log(req.profile._id);
  console.log(req.auth._id);

  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.requireSignin = expressJwt({
  secret: "aveiheislkcmalxjoqieqAPOi3tu45thhijsjsvfdnvlfdvowdpwip2",
  algorithms: ["HS256"],
  userProperty: "auth",
});
