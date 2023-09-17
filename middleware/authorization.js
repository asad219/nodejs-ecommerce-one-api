const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();


const authorization = asyncHandler(async (req, res, next) => {
    let isAdmin;
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")){
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode)=>{
        if (err){
            res.status(401);
            throw new Error("User not authorized");
        }
        const decoded = jwt.decode(token);
        isAdmin = decoded.isAdmin;
        if (!isAdmin)
        res.status(401).json({error: "Only admin can access"})
        next();
    });

  }

});



module.exports = authorization;
