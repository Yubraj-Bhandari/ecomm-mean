const {model} = require("mongoose");
const Product= require("../db/product");

async function addProduct(model) {
    let product = new Product(model);
    await product.save();
    return product.toObject();
}
//to add product in database
async function updateProduct(id,model){
    Product.findByIdAndUpdate(id,model);
}

async function deleteProduct(id){
    await Product.findByIdAndDelete(id);
}

async function getAllProducts(){
    let products = await Product.find();
    return products.map(product => product.toObject());
    //return ma aayeko mongoose object lai Object garera normal plain object ma convert garne
}

async function getProduct(id){
let product = await Product.findById(id);
return product.toObject();
}

async function getNewProducts(){
    let newProducts = await Product.find({
        isNewProduct: true
    });
    return newProducts.map(product => product.toObject());
}

async function getFeaturedProducts(){
    let featuredProducts = await Product.find({
        isFeatured: true
    });
    return featuredProducts.map(product => product.toObject());
}
async function getCategories() {
    const categories = await Product.distinct("category");
    return categories;
}
// async function getProductForListing(searchTerm,categoryId,page,pagesize,sortBy,sortOrder,brandId)
// {
//    if(!sortBy){
//        sortBy="price";
//    }if(!sortOrder){
//     sortOrder=-1;
//    }

//     let queryFilter={};
//     if(searchTerm){
//         queryFilter.$or=[
//             {
//                 name:{$regex:'.*'+searchTerm+'.*'}
//             },{
//                 shortDescription:{$regex:'.*'+searchTerm+'.*'}
//             }
//         ]
//     }
//     // if(categoryId){
//     //     queryFilter.categoryId=categoryId;
//     // }
//     if (categoryId && categoryId.length === 24) {
//         queryFilter.categoryId = categoryId;
//     }

//     // if(brandId){
//     //     queryFilter.brandId=brandId;
//     // }
//     if (brandId && brandId.length === 24) {
//         queryFilter.brandId = brandId;
//     }

//     const product=await Product.find(queryFilter).sort({
//         [sortBy]:+sortOrder,
//     }).skip((+page-1)*+pagesize).limit(+pagesize);
//     return product.map(product => product.toObject());
// }
async function getProductForListing(searchTerm, categoryId, page, pagesize, sortBy, sortOrder, brandId) {
    if (!sortBy) {
        sortBy = "price";
    }
    if (!sortOrder) {
        sortOrder = -1;
    }

    let queryFilter = {};
    if (searchTerm) {
        queryFilter.$or = [
            {
                name: { $regex: '.*' + searchTerm + '.*', $options: 'i' } // Case-insensitive search
            },
            {
                shortDescription: { $regex: '.*' + searchTerm + '.*', $options: 'i' }
            }
        ];
    }
    // Updated categoryId filter to handle array
    if (categoryId && categoryId.length === 24) {
        queryFilter.categoryId = { $in: [categoryId] }; // Use $in to match categoryId in array
    }
    if (brandId && brandId.length === 24) {
        queryFilter.brandId = { $in: [brandId] }; // Similarly for brandId, if it's an array
    }
console.log("🔍 Query Filter:", JSON.stringify(queryFilter)); // Debug log
    const products = await Product.find(queryFilter)
        .sort({
            [sortBy]: +sortOrder,
        })
        .skip((+page - 1) * +pagesize)
        .limit(+pagesize);
    return products.map(product => product.toObject());
}


module.exports={
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
    getNewProducts,
    getFeaturedProducts,
    getCategories,
    getProductForListing
}