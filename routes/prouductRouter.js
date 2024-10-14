const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const authorization = require("../middleware/authorization");

const {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductCount,
    getFeaturedProduct,
    getFilterProducts,
    prod,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/prod/:id", prod);
router.get("/search", getFilterProducts);
router.get("/getcount", validateToken, getProductCount);
router.get("/getfeatured/:limit", getFeaturedProduct);
router.get("/:id", getProduct);
router.post("/", validateToken, createProduct);
router.put("/:id", validateToken, updateProduct);
router.delete("/:id", validateToken, deleteProduct);

module.exports = router;
