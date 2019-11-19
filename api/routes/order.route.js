const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();

router.get("/orders", orderController.index);
router.get("/orders/:id", orderController.get);
router.post("/orders/create", orderController.create);
router.patch("/orders/:id", orderController.update);
router.delete("/orders/:id", orderController.delete);

module.exports = router;
