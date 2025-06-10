const express = require('express');

const router = express.Router();

const brand = require('../db/brand');
const { addBrand,getBrands,getBrandById,updateBrand,deleteBrand } = require('../handlers/brand-handler');
    
//for adding the brand
router.post("",async(req,res)=>{
    console.log("Brand post request received");
let model=req.body;
 let result=await addBrand(model)
    res.send(result);
    }
);

//route for gettting the brands ko data
router.get("",async(req,res)=>{

 let brands=await getBrands()
    res.send(brands);
    }
);

router.get("/:id",async(req,res)=>{
     let id=req.params['id'];
 let brand=await getBrandById(id)
    res.send(brand);
    }
);



//for updating brand
router.put("/:id",async(req,res)=>{
    let model=req.body;
    let id=req.params['id'];
    await updateBrand(id,model);
    res.send({message:"Brand updated successfully"});
    }

);

//for deleting route
router.delete("/:id",async(req,res)=>{
    let id=req.params['id'];
    await deleteBrand(id);
    res.send({message:"Brand deleted successfully"});
    }
);

module.exports=router;