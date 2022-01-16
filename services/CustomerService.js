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
  // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
  const { lastName, password } = req.body;

  customerModel.findOne({ _id: req.profile._id }, (err, user) => {
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
      // updatedUser.salt = undefined;
      res.json(updatedUser);
    });
  });
};
