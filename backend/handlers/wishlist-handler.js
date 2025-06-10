// const Wishlist=require("../db/wishlist");

// async function addToWishlist(userId,productId){
//     const wishlist=new Wishlist({
//         userId:userId,
//         productsId:productId
//     })
//     await wishlist.save();
//     return wishlist.toObject();
// }

// async function removeFromWishlist(userId,productId){
    
//     await Wishlist.deleteMany({
//         userId:userId,
//         productsId:productId});
    
// }

// async function getWishlist(userId){
//     const wishlists=await Wishlist.find({userId:userId});//.populate("productsId");
//     return wishlists.map(result=>result.toObject());
// }
// module.exports = {
//   addToWishlist,
//   removeFromWishlist,
//   getWishlist
// };

const Wishlist = require("../db/wishlist");

async function addToWishlist(userId, productId) {
  const wishlist = new Wishlist({
    userId: userId,
    productsId: productId
  });

  await wishlist.save();

  // Return raw mongoose document instead of .toObject()
  return wishlist;
}

async function removeFromWishlist(userId, productId) {
  await Wishlist.deleteMany({
    userId: userId,
    productsId: productId
  });
}

async function getWishlist(userId) {
  const wishlists = await Wishlist.find({ userId: userId }).populate('productsId');
  return wishlists.map((result)=>result.toObject().productsId); // Return array of raw documents
}

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist
};

