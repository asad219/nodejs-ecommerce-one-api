const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();


const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")){
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if (err){
            res.status(401);
            throw new Error("User not authorized");
        }
        console.log(decoded);
        req.user = decoded.user;
        console.log(req.user);
        // const user = jwt.decode(token);
        next();
    });

  }
  if (!token){
    res.status(401).json({error: "Unauthorized access"})
  }
});



module.exports = validateToken;
