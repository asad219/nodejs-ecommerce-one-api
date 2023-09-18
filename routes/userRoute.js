const express = require("express");
const router = express.Router();
const validateToken = require('../middleware/validateToken');
const {
    getAllUser,
    getUser,
    registerUser,
    loginUser,
    getUserCount
} = require("../controllers/userController");

router.get('/', getAllUser);
router.get('/usercount', validateToken, getUserCount);
router.get('/:id', getUser);
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router;
