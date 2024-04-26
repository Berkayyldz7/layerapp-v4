
const mongoose = require("mongoose")
const { type } = require("./product.validation")

const productSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : [true, "must be provided a product name"],
        trim : true,
        maxLength : [45, "product name cannot be longer than 45 characters."]
    },
    productPrice : {
        type : String,
        required : [true, "product must included a price value"],
        trim : true,
    },
    productImageUrl : {
        type : String,
        required : [true, "product must had an image url's "],
        trim : true
    },
    productDescription : {
        type : String,
        required : [true, "product must be had an description"],
        trim :true
    }
})

module.exports = mongoose.model("Products", productSchema)