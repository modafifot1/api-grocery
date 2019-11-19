const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();

router.get("/products", productController.index);
router.get("/products/:id", productController.get);
router.post("/products/create", productController.create);
router.patch("/products/:id", productController.update);
router.delete("/products/:id", productController.delete);

module.exports = router;
