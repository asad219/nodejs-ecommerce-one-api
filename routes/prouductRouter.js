const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');
const authorization = require('../middleware/authorization')

const {getAllProducts, getProduct, createProduct, updateProduct, deleteProduct, getProductCount, getFeaturedProduct, getFilterProducts} = require('../controllers/productController');

router.get("/", validateToken, authorization, getAllProducts);
router.get("/search", getFilterProducts);
router.get("/getcount", validateToken, getProductCount);
router.get("/getfeatured/:limit", getFeaturedProduct);
router.get("/:id", getProduct);
router.post("/", createProduct)
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;