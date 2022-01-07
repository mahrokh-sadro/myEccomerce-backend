

const express = require('express');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');


const router = express.Router();
const { body, validationResult } = require('express-validator');
const customerModel = require("../models/CustomerModel.js");
// const AuthService = require("../services/AuthService.js");

var JWT_SECRET="kkklkjnmdd";
router.post("/signup",

// body("email").isEmail().withMessage("The email is invalid"),
//   body("password").isLength({ min: 5 }).withMessage("The password is invalid"),



(req, res) => {
    const validationErrors = validationResult(req);

    // if (!validationErrors.isEmpty()) {
    //     const errors = validationErrors.array().map((error) => {
    //       return {
    //         msg: error.msg,
    //       };
    //     });
  
    //     return res.json({ errors, data: null });
     // }
    const { firstName, lastName, email, password } = req.body;



    if (!firstName || !lastName
        || !email || !password) {
        res.status(400).json({
            message: `bad request`
            ///addd more info 
            //first      one is missing more info
        })
    }

    const user = customerModel.findOne({email})
    .then(user=>{
        if(user)
        res.json({
            message: `email already exists.`
            ,data:null
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: `Error------->${err}`
        })
    });


    const newCustomer = new customerModel({

        firstName,
        lastName,
        email,
        password


    });



    newCustomer.save()
        .then(customer => {
            res.json({
                message: 'new customer got created',
                data: customer

            })
        })
        .catch(err => {
            res.status(500).json({
                message: `Error ${err}`
            })
        })

        const token = JWT.sign(
            { email: newCustomer.email },
            JWT_SECRET,
            {
              expiresIn: 360000,
            }
          );

res.json({
    errors: [],
    data: {
      token,
      user: {
        id: newCustomer._id,
        email: newCustomer.email,
      
    },
},
});
}
);

// router.get("/:id", customerService.getACustomer);



// router.post("/login",(req,res)=>{

//     const {email, password} = req.body;

//     customerModel.findOne({email})
//     .then(user=>{
//         if(!user)
//         res.json({
//             message:`Invalid credentials`,
//             data:null
//         })
//     .catch(err=>{
        
//         res.json({
//             message:`Error----->${err}`,
            
//         })
//     })
//     })
// bcrypt.compare(password, user.password)
// .then(isMatch=>{
//     if(!isMatch)
//     res.json({
//         message:`Invalid credentials`,
//         data:null
//     })
// })
// .catch(err=>{
//     res.status(500).json({
//         message:`Error----->${err}`
//     })
// })

// JWT.sign( { email: user.email }, JWT_SECRET, { expiresIn: 360000, }
//   )
//   .then(token=>{
//     res.json({
//         data: {
//           token,
//           user: {
//             id: user._id,
//             email: user.email,
//           },
//         },
//       });
//   })
//   .catch(err=>{
//     res.status(500).json({
//         message:`Error----->${err}`
//     })
//   })
    
// })

module.exports = router;