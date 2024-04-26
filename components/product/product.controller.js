const ProductDal = require("./product.dal")

const getAllProducts = async (req,res)=>{
    const products = await new ProductDal().getAllProducts()
    res.status(200).send({products})
}

const createProduct = async (req, res)=>{
    const product = await new ProductDal(req.body).createProduct()
    res.status(201).send({product})
}

const updateProduct = async (req, res)=>{
    const updatedProduct = await new ProductDal(req).updateProduct()
    if(!updateProduct){
        return res.status(404).send({"msg":`there is no product with id : ${req.body?.productName}`})
    }
    res.status(200).send({updatedProduct})
}

const deleteProduct = async (req,res)=>{
    const deletedProduct = await new ProductDal(req.params).deleteProduct()
    if(!deleteProduct){
        return res.status(404).send({"msg":`there is no product with id : ${req.params?.id}`})
    }
    res.status(200).send({deletedProduct})
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}