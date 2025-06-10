const mongoose = require("mongoose");

// Wishlist Schema
const wishListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  productsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products"
  }
});

// Wishlist Model
const Wishlist = mongoose.model("wishlists", wishListSchema);
module.exports = Wishlist;
