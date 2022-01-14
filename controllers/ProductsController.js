const express = require("express");
const router = express.Router();

//imp
const productService = require("../services/ProductService.js");

router.get("/related/:id", productService.getRelatedProducts);
router.get("/", productService.getAllProducts);
router.get("/categories", productService.getAllCategories);
router.get("/:id", productService.getAProduct);
router.post("/", productService.createAProduct);
router.put("/:id", productService.updateAProduct);
router.delete("/:id", productService.deleteAProduct);

module.exports = router;
