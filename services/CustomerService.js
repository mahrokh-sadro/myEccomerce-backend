
const customerModel = require("../models/CustomerModel.js");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');



const { body, validationResult } = require('express-validator');


// var JWT_SECRET="kkklkjnmdd";


if (process.env.NODE_ENV != "production") {
    require('dotenv').config({ path: 'config/keys.env' });
}










exports.createACustomer = (req, res) => {

    if (!req.body.firstName || !req.body.lastName
        || !req.body.email || !req.body.password) {
        res.status(400).json({
            message: `bad request`
            ///addd more info 
            //first      one is missing more info
        })
    }
    const newCustomer = new customerModel(req.body);

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
}





// exports.createACustomer = (req, res) => {

//     const validationErrors = validationResult(req);
//     const { firstName, lastName, email, password } = req.body;



//     if (!firstName || !lastName
//         || !email || !password) {
//         res.status(400).json({
//             message: `bad request`
//             ///addd more info 
//             //first      one is missing more info
//         })
//     }

//     const user = customerModel.findOne({email})
//     .then(user=>{
//         if(user)
//         res.json({
//             message: `email already exists.`
//             ,data:null
//         })
//     })
//     .catch(err=>{
//         res.status(500).json({
//             message: `Error------->${err}`
//         })
//     });


//     const newCustomer = new customerModel({

//         firstName,
//         lastName,
//         email,
//         password


//     });



//     newCustomer.save()
//         .then(customer => {
//             res.json({
//                 message: 'new customer got created',
//                 data: customer

//             })
//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: `Error ${err}`
//             })
//         })

//         const token = JWT.sign(
//             { email: newCustomer.email },
//             process.env.JWT_SECRET,
//             {
//               expiresIn: 360000,
//             }
//           );

// res.json({
//     errors: [],
//     data: {
//       token,
//       user: {
//         id: newCustomer._id,
//         email: newCustomer.email,
      
//     },
// },
// });
// }





exports.getACustomer = (req, res) => {

    customerModel.findById(req.params.id)
        .then(customer => {
            if (customer) {
                res.json({
                    message: `customer with the id ${req.params.id}`,
                    data: customer
                })
            }
            else {

                res.status(404).json({
                    message: `There is no customer with the id ${req.params.id}`
                })
            }
        })

        .catch(err => {
            res.status(500).json({
                message: `There is no customer with the id ${req.params.id}`
            })
        })

}




