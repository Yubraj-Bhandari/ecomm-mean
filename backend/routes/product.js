// // const express = require('express');
// // const router = express.Router();
// // const { addProduct, updateProduct, deleteProduct, getAllProducts, getProduct } = require('../handlers/product-handler');
// // // Route for getting all products

// // // router.post("/",async(req,res)=>{
// // //     model=req.body;
// // //   let product= await addProduct(model);
// // //   res.send(product);
// // // })
// // router.post("/", async (req, res) => {
    
// //         let model = req.body;
// //         let product = await addProduct(model);
// //         res.send(product);
  
// // });

// // router.put("/:id", async (req, res) => {
// //     let model = req.body;
// //     let id = req.params['id'];
// //     let product = await updateProduct(id, model);
// //     res.send({ message: "Product updated successfully" });
// // });

// // router.delete("/:id", async (req, res) => {
// //     let id = req.params['id'];
// //     await deleteProduct(id);
// //     res.send({ message: "Product deleted successfully" });
// // });

// // router.get("/:id", async (req, res) => {
// //     let id = req.params['id'];
// //     let product = await getProduct(id);
// //     res.send(product);
// // });

// // router.get("/", async (req, res) => {
// //     let products = await getAllProducts();
// //     res.send(products);
// // });
// // // Add this new route
// // router.get("/listing", async (req, res) => {
// //     const { searchTerm, categoryId, page = 1, pagesize = 6, sortBy, sortOrder, brandId } = req.query;
// //     console.log("📡 Received query:", { searchTerm, categoryId, page, pagesize, sortBy, sortOrder, brandId }); // Debug log
// //     const products = await getProductForListing(searchTerm, categoryId, page, pagesize, sortBy, sortOrder, brandId);
// //     res.send(products);
// // });

// // module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { addProduct, updateProduct, deleteProduct, getAllProducts, getProduct, getProductForListing } = require('../handlers/product-handler');

// router.post("/", async (req, res) => {
//     let model = req.body;
//     let product = await addProduct(model);
//     res.send(product);
// });

// router.put("/:id", async (req, res) => {
//     let model = req.body;
//     let id = req.params['id'];
//     await updateProduct(id, model); // Fixed: Ensure updateProduct returns something if needed
//     res.send({ message: "Product updated successfully" }); // Fixed: Correct message
// });

// router.delete("/:id", async (req, res) => {
//     let id = req.params['id'];
//     await deleteProduct(id);
//     res.send({ message: "Product deleted successfully" });
// });
// router.get("/", async (req, res) => {
//     let products = await getAllProducts();
//     res.send(products);
// });

// router.get("/listing", async (req, res) => {
//     const { searchTerm, categoryId, page = 1, pagesize = 6, sortBy, sortOrder, brandId } = req.query;
//     console.log("📡 Received query:", { searchTerm, categoryId, page, pagesize, sortBy, sortOrder, brandId }); // Debug log
//     const products = await getProductForListing(searchTerm, categoryId, page, pagesize, sortBy, sortOrder, brandId);
//     res.send(products);
// });

// router.get("/:id", async (req, res) => {
//     let id = req.params['id'];
//     let product = await getProduct(id);
//     res.send(product);
// });




// module.exports = router;


const express = require('express');
const router = express.Router();
const { addProduct, updateProduct, deleteProduct, getAllProducts, getProduct, getProductForListing } = require('../handlers/product-handler');

router.post('/', async (req, res) => {
    try {
        let model = req.body;
        let product = await addProduct(model);
        res.status(201).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to add product' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        let model = req.body;
        let id = req.params.id;
        await updateProduct(id, model);
        res.send({ message: 'Product updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to update product' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        await deleteProduct(id);
        res.send({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to delete product' });
    }
});

router.get('/', async (req, res) => {
    try {
        let products = await getAllProducts();
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to fetch products' });
    }
});

// Move /listing before /:id to avoid route conflict
router.get('/listing', async (req, res) => {
    try {
        const { searchTerm, categoryId, page = 1, pagesize = 6, sortBy, sortOrder, brandId } = req.query;
        console.log('📡 Received query:', { searchTerm, categoryId, page, pagesize, sortBy, sortOrder, brandId });
        const products = await getProductForListing(searchTerm, categoryId, page, pagesize, sortBy, sortOrder, brandId);
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to fetch product listing' });
    }
});

// Place /:id after /listing
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let product = await getProduct(id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to fetch product' });
    }
});

module.exports = router;