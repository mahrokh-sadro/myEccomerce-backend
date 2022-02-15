const CustomerModel = require("../models/CustomerModel.js");
const OrderModel = require("../models/OrderModel.js");
const { errorHandler } = require("../helpers/dbErrorHandler.js");
const bcrypt = require("bcrypt");

exports.userById = (req, res, next, id) => {
  CustomerModel.findById(id).exec((err, user) => {
    if (err || !user) {
      res.status(400).json({
        err: `user not found`,
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  req.profile.password = undefined;
  res.json(req.profile);
};

exports.update = (req, res) => {
  const { lastName, password } = req.body;

  CustomerModel.findOne({ _id: req.profile._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (!lastName) {
      return res.status(400).json({
        error: "Last Name is required",
      });
    } else {
      user.lastName = lastName;
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: "Password should be min 6 characters long",
        });
      } else {
        user.password = password;
      }
    }

    user.save((err, updatedUser) => {
      if (err) {
        console.log("USER UPDATE ERROR", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      updatedUser.password = undefined;
      res.json(updatedUser);
    });
  });
};

exports.purchaseHistory = (req, res) => {
  OrderModel.Order.find({ user: req.profile.id })
    .populate("user", "_id firstName")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      res.json({ orders: orders });
    });
};
