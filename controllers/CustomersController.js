const express = require('express');
const router = express.Router();

const customerService = require("../services/CustomerService.js");


const customerModel = require("../models/CustomerModel.js");
const bcrypt = require('bcrypt');

const JWT = require('jsonwebtoken');



const { body, validationResult } = require('express-validator');


 var JWT_SECRET="kkklkjnmdd";



 router.post("/", customerService.createACustomer);
//  router.post("/login", customerService.signInACustomer);



 router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await customerModel.findOne({ email });
  
    if (!user) {
      return res.json({
        errors: [
          {
            msg: "Invalids credentials",
          },
        ],
        data: null,
      });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
      return res.json({
        errors: [
          {
            msg: "Invalids credentials",
          },
        ],
        data: null,
      });
    }
  
    const token = await JWT.sign(
      { email: user.email },
      JWT_SECRET ,
      {
        expiresIn: 360000,
      }
    );
  
    return res.json({
      errors: [],
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
        },
      },
    });
  });












router.get("/:id", customerService.getACustomer);

module.exports = router;