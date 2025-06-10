const mongoose=require("mongoose");
//importing mongoose

//aaba order ko schema
const orderSchema=new mongoose.Schema({
    //order ko properties haru
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
    date:Date,
    items:Array(mongoose.Schema.Types.Mixed),
    paymentType:String,
    address:mongoose.Schema.Types.Mixed,
    status:String
});
//model banaune 
const Order=mongoose.model("orders",orderSchema);
module.exports=Order;