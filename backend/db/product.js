const mongoose=require("mongoose");
//importing mongoose
const {Schema}=mongoose;
//aaba product table create garne table ko schema
const productSchema=new mongoose.Schema({
    //product ko properties haru
    name:String,
    description:String,
    shortDescription:String,
    price:Number,
    discount:Number,

    images:Array(String),
    //categoryID ko lagi foreign relation banaune
    categoryId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categories"
    }],
    brandId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"brands"
    }],
    isFeatured:Boolean,
    isNewProduct:Boolean,

});
//model banaune 
const Product=mongoose.model("products",productSchema);
module.exports=Product;