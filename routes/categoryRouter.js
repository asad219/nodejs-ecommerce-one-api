const express = require("express");
const router = express.Router();
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

//You can do also like this if there is no middleware in service like jwttoken or authentication
// router.route("/").get(getCategories);
// router.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory);
// router.route("/").post(createCategory);


module.exports = router;
