const express =require("express");
const mongoose = require("mongoose");
const app = express();

const port = 3000;
const cors = require("cors");

const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");    
const authRoutes= require("./routes/auth")
const {verifyToken,isAdmin}= require("./middleware/auth-middleware")
app.use(cors()); //to allow cross-origin requests
app.use(express.json()); //to parse json data

//api create bhayo
app.get("/",(req,res)=>{
    res.send("Server is Running ");
})

//pipeline add garne
app.use("/category",verifyToken,isAdmin,categoryRoutes);
app.use("/brand",verifyToken,isAdmin,brandRoutes);
app.use("/orders",verifyToken,isAdmin,orderRoutes);
app.use("/product",verifyToken,productRoutes);
app.use("/customer",verifyToken,customerRoutes);
app.use("/auth",authRoutes);

//mongodb sanga connect garne
async function connectDb() {
 await   mongoose.connect ("mongodb://localhost:27017/e-com-store-db", {
        dbName:"e-com-store-db"

})
console.log("Connected to MongoDB successfully");
}
//error handling for connection
connectDb().catch((err)=>{
    console.log("Error connecting to MongoDB:", err);
});



app.listen(port,()=>{
    console.log("Server is running in Port",port);
})