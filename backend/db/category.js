const mongoose=require("mongoose");
//importing mongoose

//aaba category ko table create garne table ko schema
const categorySchema=new mongoose.Schema({
    //category ko properties haru
    name:String,
   
});
//model banaune 
const Category=mongoose.model("categories",categorySchema);
module.exports=Category;