const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");

//Connect to database
const connectDb = require("./config/dbConnection");
connectDb();

const Product = require("../ecommerce-one/models/productModel");

const app = express();
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on port ${port}, http://localhost:${port}`);
});
const api = process.env.API_URL;
//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));


app.post(`${api}/products`, (req, res) => {
    const { name, image, countInStock } = req.body;
    const contact = Product.create({
        name,
        image,
        countInStock
      });
    
      res.status(201).json( contact );
});
