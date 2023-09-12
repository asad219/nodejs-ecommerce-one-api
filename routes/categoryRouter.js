const express = require("express");
const router = express.Router();
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
} = require("../controllers/categoryController");

router.route("").get(getCategories);
router.route("/:id").get(getCategory);
router.route("/").post(createCategory).put(updateCategory);

module.exports = router;
