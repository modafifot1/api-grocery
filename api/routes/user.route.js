const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.get("/users", userController.index);
router.get("/users/:id", userController.get);
router.post("/users/login", userController.login);
router.post("/users/create", userController.create);
router.patch("/users/:id", userController.update);

module.exports = router;
