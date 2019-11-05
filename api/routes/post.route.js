const express = require("express");
const postController = require("../controllers/post.controller");
const router = express.Router();

router.get("/posts", postController.indexPost);
router.get("/posts/:id", postController.getPost);
router.post("/posts/create", postController.createPost);
router.patch("/posts/:id", postController.updatePost);
router.delete("/posts/:id", postController.deletePost);

router.get("/posts/:id/comments", postController.getComments);
router.get("/posts/:id/comments/:cid", postController.getComment);
router.post("/posts/:id/comments", postController.createComment);
router.patch("/posts/:id/comments/:cid", postController.updateComment);
router.delete("/posts/:id/comments/:cid", postController.deleteComment);

module.exports = router;
