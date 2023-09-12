const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");


const category = require('./routes/categoryRouter');

const app = express();
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on port ${port}, http://localhost:${port}`);
});
const api = process.env.API_URL;

//Connect to database
const connectDb = require("./config/dbConnection");
connectDb();

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('tiny'));


//routes
app.use(`${api}/category`, category);