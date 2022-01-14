const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const bcrypt = require("bcrypt");
const customerModel = require("../models/CustomerModel.js");

var expressValidator = require("express-validator");

exports.signup = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  //use validator
  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({
      message: `bad request`,
      ///addd more info
      //first      one is missing more info
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
    } else if (user) {
      bcrypt.compare(user.password, password).then((isMatched) => {
        if (!isMatched)
          return res.status(401).json({
            error: "Email and password dont match",
          });
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRETE);
    res.cookie("token", token, { expire: new Date() + 9999 });
    const { _id, firstName, lastName, email, role } = user;
    return res.json({ token, user: { _id, firstName, lastName, email, role } });
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

  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.requireSignin = expressJwt({
  secret: "aveiheislkcmalxjoqieqAPOi3tu45thhijsjsvfdnvlfdvowdpwip2",
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

//signin
