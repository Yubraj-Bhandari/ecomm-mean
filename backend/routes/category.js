const express = require('express');

const router = express.Router();
const Category = require('./../db/category');
const {addCategory,updateCategory, deleteCategory,getCategories,getCategoryById} = require('../handlers/category-handler');

//for adding the category
router.post("",async(req,res)=>{
    console.log("Category post request received");
let model=req.body;
 let result=await addCategory(model)
    res.send(result);
    }
);

//route for gettting the categories ko data
router.get("",async(req,res)=>{
    
 let result=await getCategories()
    res.send(result);
    }
);

router.get("/:id",async(req,res)=>{
     let id=req.params['id'];
 let result=await getCategoryById(id)
    res.send(result);
    }
);



//for updating category
router.put("/:id",async(req,res)=>{
    let model=req.body;
    let id=req.params['id'];
    await updateCategory(id,model);
    res.send({message:"Category updated successfully"});
    }

);

//for deleting route
router.delete("/:id",async(req,res)=>{
    let id=req.params['id'];
    await deleteCategory(id);
    res.send({message:"Category deleted successfully"});
    }
);

module.exports=router;