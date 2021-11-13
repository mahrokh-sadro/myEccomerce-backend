
const customerModel = require("../models/CustomerModel.js");

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




