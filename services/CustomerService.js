const customerModel = require("../models/CustomerModel.js");
const bcrypt = require("bcrypt");

// exports.getACustomer = (req, res) => {
//   customerModel
//     .findById(req.params.id)
//     .then((customer) => {
//       if (customer) {
//         res.json({
//           message: `customer with the id ${req.params.id}`,
//           data: customer,
//         });
//       } else {
//         res.status(404).json({
//           message: `There is no customer with the id ${req.params.id}`,
//         });
//       }
//     })

//     .catch((err) => {
//       res.status(500).json({
//         message: `There is no customer with the id ${req.params.id}`,
//       });
//     });
// };

exports.userById = (req, res, next, id) => {
  customerModel.findById(id).exec((err, user) => {
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
  const { firstName, lastName, password } = req.body;

  customerModel.findOne({ _id: req.profile._id }, (err, user) => {
    if (err || !user) {
      res.status(400).json({
        error: "User not found",
      });
    }

    if (!firstName || !lastName) {
      res.status(400).json({
        error: "first name and last name are required",
      });
    } else {
      user.firstName = firstName;
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

      user.save((err, updatedUser) => {
        if (err) {
          res.status(400).json({
            error: "User update failed",
          });
        }
        updatedUser.password = undefined;
        res.json(updatedUser);
      });
    }
  });
};
