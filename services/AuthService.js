

// const { body, validationResult } = require('express-validator');

// const customerModel = require("../models/CustomerModel.js");

// exports.createACustomer = (req, res) => {

//     if (!req.body.firstName || !req.body.lastName
//         || !req.body.email || !req.body.password) {
//         res.status(400).json({
//             message: `bad request`
//             ///addd more info 
//             //first      one is missing more info
//         })
//     }
//     const newCustomer = new customerModel(req.body);

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
// }
