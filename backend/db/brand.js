const mongoose=require("mongoose");
//importing mongoose ORM

//aaba brand ko table create garne table ko schema
const brandSchema=new mongoose.Schema({
    //brand ko properties haru
    name:String,
   
});
//model banaune for data access
const Brand=mongoose.model("brands",brandSchema);
module.exports=Brand;