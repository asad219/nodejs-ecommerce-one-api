const express = require('express');
const router = express.Router();

const {getAllProducts, getProduct, createProduct, updateProduct, deleteProduct, getProductCount, getFeaturedProduct, getFilterProducts} = require('../controllers/productController');

router.get("/", getAllProducts);
router.get("/search", getFilterProducts);
router.get("/getcount", getProductCount);
router.get("/getfeatured/:limit", getFeaturedProduct);
router.get("/:id", getProduct);
router.post("/", createProduct)
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;