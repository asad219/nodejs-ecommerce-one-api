const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const errorHandler = require('./middleware/errorHandler');


const category = require('./routes/categoryRouter');
const product = require('./routes/prouductRouter');
const order = require('./routes/orderRouter');
const user = require('./routes/userRoute');

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



//#####routes
//Category
app.use(`${api}/category`, category);

//Product
app.use(`${api}/product`, product);

//Order
app.use(`${api}/order`, order);

//User
app.use(`${api}/user`, user);

//#middleware for error handler
app.use(errorHandler);