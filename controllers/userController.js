const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Get All User
const getAllUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get All User API working fine" });
});

//Get Single User
const getUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get Single User API working fine" });
});

//RegisterUser
const registerUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        passwordHash = req.body.password,
        phone,
        isAdmin,
        street,
        apartment,
        zip,
        city,
        country,
    } = req.body;
    const hashedPassword = bcrypt.hashSync(passwordHash, 10);
    if (!name) return res.status(400).json({ error: "Name is required" });

    if (!email) return res.status(400).json({ error: "Email is required" });

    if (!passwordHash)
        return res.status(400).json({ error: "Password is required" });

    if (!phone) return res.status(400).json({ error: "Phone is required" });

    const _user = await User.findOne({ email: email });
    if (_user) return res.status(400).json({ message: "Email already exist" });

    const user = await User.create({
        name,
        email,
        passwordHash: hashedPassword,
        phone,
        isAdmin,
        street,
        apartment,
        zip,
        city,
        country,
    });
    if (!user)
        return res.status(500).json({
            message:
                "Oops! something wrong please contact to system administrator",
        });

    return res.status(201).json({ message: "User created", user });
});

//LoginUser
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter email and password");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compareSync(password, user.passwordHash))) {
        const token = jwt.sign(
            {
                user: {
                    userId: user.id,
                    isAdmin: user.isAdmin,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" },
        );
        return res.status(200).json({ user: user.email, token: token });
    } else {
        res.status(401).json({ error: "email and password does not match" });
    }
});

//user count
const getUserCount = asyncHandler(async (req, res) => {
    if (!req.user.isAdmin)
    return res.status(500).json({message: 'Unauthorized Access'});
    const cnt = await User.countDocuments();
    if (!cnt)
    return res.status(500).json({ success: false });
    return res.status(200).json({ userCount: cnt });
});

module.exports = { getAllUser, getUser, registerUser, loginUser, getUserCount };
