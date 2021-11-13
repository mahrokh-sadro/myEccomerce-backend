const productModel = require('../models/ProductModel.js');


exports.getAllProducts = (req, res) => {



    //if /products + query string
    //if we wonna get some movies
    if (req.query.isBestSeller) {
        //   productModel.find({ isBestSeller: true })//just wanna get the documents where this condition
        productModel.find()
            .where("isBestSeller")
            .equals(req.query.isBestSeller === "yes" ? true : false)
            .then(products => {
                res.json({
                    message: "Get bestseller products",
                    data: products
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: `Error------> ${err}`,

                })
            })
    }

    else if (req.query.isFeatured) {
        //   productModel.find({ isBestSeller: true })//just wanna get the documents where this condition
        productModel.find()
            .where("isFeatured")
            .equals(req.query.isFeatured === "yes" ? true : false)
            .then(products => {
                res.json({
                    message: "Get featured products",
                    data: products
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: `Error------> ${err}`,

                })
            })
    }



    else if (req.query.category) {
        productModel.find()
            .where("category")
            .equals(req.query.category)
            .then(products => {
                res.json({
                    message: `A list of products with the category ${req.query.category}`,
                    data: products
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: `Error------>  ${err}`
                })
            })
    }
    //http://localhost:3000/products
    //when we wanna get all movies
    else {
        productModel.find()//in mongoose find means all documents
            .then(products => {
                res.json({
                    message: "Get all products",
                    data: products
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: `Error------>   ${err}`,

                })
            })


    }

};

exports.getAProduct = (req, res) => {
    //buggy
    console.log('get a product')
    productModel.findById(req.params.id)
        .then(product => {
            if (product) {
                res.json({
                    message: `Product with the id ${req.params.id}`,
                    data: product
                })
            }
            else {

                res.status(404).json({
                    message: `There is no product with the id ${req.params.id}`,

                })
            }
        })

        .catch(err => {
            res.status(500).json({
                message: `Error------>  ${err}`
            })
        })
}




exports.createAProduct = (req, res) => {
    if (!req.body.name || !req.body.price
        || !req.body.category) {
        res.status(400).json({
            message: `bad request`
        })
    }

    const newProduct = new productModel(req.body);//the data that client pass

    newProduct.save()
        .then(product => {
            //if the document saved successfully,well return the json format of the inserted document


            res.json({
                message: "create a product",
                data: product
            })
        })
        //if it fails we return json too
        //cuz its a server err we return status code of 500
        .catch(err => {
            res.status(500).json({
                message: `Error ${err}`
            })
        })
}


exports.updateAProduct = (req, res) => {

    productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(product => {

            if (product) {
                res.json({
                    message: `updated`,
                    data: product
                })
            }
            else {
                res.status(400).json({
                    message: `thres no product which such id`
                })
            }
        })
        .catch(err => {
            res.json({
                message: `Error ${err}`
            })
        })
}

exports.deleteAProduct = (req, res) => {

    productModel.findByIdAndRemove(req.params.id)
        //no second param so doesnt reurn anything so no arg for then()
        .then(product => {

            if (product) {
                res.json({
                    message: `The product with the id ${req.params.id} was deleted`
                })
            }
            else {
                res.status(400).json({
                    message: `no product with the id ${req.params.id} found`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}

///buggggyyy
exports.getAllCategories = (req, res) => {
    productModel.find()
        .then(products => {
            if (!products) {
                res.status(404).json({
                    message: `No product categories`
                });
            }
            else {
                let allCategories = [];
                for (i = 0; i < products.length; i++) {
                    allCategories.push(products[i].category)
                }
                let uniqueCategories = [...new Set(allCategories)];
                res.json({
                    message: `All product categories`,
                    data: uniqueCategories

                })
            }
        }).catch(err => {
            res.status(500).json({
                message: err
            })
        })
};