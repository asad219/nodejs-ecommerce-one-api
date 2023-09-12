const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    image: {
        type: String,
    },
    countInStock: {
        type: Number,
        required: true
    },
});
module.exports = mongoose.model("Product", contactSchema);