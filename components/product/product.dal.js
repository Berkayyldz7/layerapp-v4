const ProductModel = require("./product.model");
const { id } = require("./product.validation");

class ProductDal{
    constructor(products){
        this.products = products // this.products; req.body eşittir.
        console.log(products)
    }
    findOneProduct(){
        //
    }
    getAllProducts(){
        return ProductModel.find({})
    }
    createProduct(){
        const {productName, productPrice, productImageUrl, productDescription} = this.products 
        const createdProduct = ProductModel.create({productName, productPrice, productImageUrl, productDescription})
        return createdProduct
    }
    updateProduct(){

        const { id : productId } = this.products.params; // Controller'dan constructor'a req aldığımız için this.products; req eşittir.
        const {productName, productPrice, productImageUrl, productDescription} = this.products.body 
        const update = {productName : productName ,productPrice : productPrice, productImageUrl : productImageUrl, productDescription : productDescription}
        const updateProduct = ProductModel.findByIdAndUpdate({_id : productId}, update, {new:true, runValidators:true,})
        return updateProduct

        // const {productName, productPrice, productImageUrl, productDescription} = this.products 
        // const update = {productPrice : productPrice, productImageUrl : productImageUrl, productDescription : productDescription}
        // const updatedProduct = ProductModel.findOneAndUpdate({productName}, update, {new:true,upsert:true})
        // return updatedProduct
        
    
    }
    deleteProduct(){
        const { id : productId } = this.products;
        const deletedProduct = ProductModel.findByIdAndDelete({_id : productId})
        return deletedProduct
    }
}

module.exports = ProductDal