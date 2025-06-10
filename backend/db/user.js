const mongoose=require("mongoose");
//importing mongoose

//aaba table create garne table ko schema
const userSchema=new mongoose.Schema({
    //user ko properties haru
    name:String,
    email:String,
    password:String,
    isAdmin:Boolean
});
//model banaune 
const User=mongoose.model("users",userSchema);
module.exports=User;