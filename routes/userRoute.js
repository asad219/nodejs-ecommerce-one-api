const express = require("express");
const router = express.Router();
const {
    getAllUser,
    getUser,
    registerUser,
    loginUser,
} = require("../controllers/userController");

router.get('/', getAllUser);
router.get('/:id', getUser);
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router;
