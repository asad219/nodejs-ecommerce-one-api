const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on port ${port}, http://localhost:${port}`);
});
const api = process.env.API_URL;
//middleware
app.use(bodyParser.json());


app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body;
    console.log(newProduct);
    res.send(newProduct);
});
