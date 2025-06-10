// for handling the logic of the routes
const Category = require("./../db/category");

async function addCategory(model){
   let category= new Category(
    {
        name: model.name,
  }
    );
await    category.save();
// Return the saved category as an object ra model ley accept garxa
    return category.toObject();
}

async function getCategories(){
    let categories= await Category.find();
    return categories.map(category => category.toObject());
}

async function getCategoryById(id){
    let category= await Category.findById(id);
    return category.toObject();
}


async function updateCategory(id,model){

await  Category.findOneAndUpdate({_id: id},model);

return;
}
//handler for delete category
async function deleteCategory(id,){
await  Category.findByIdAndDelete(id);
return;
}


module.exports = {addCategory,updateCategory,deleteCategory,getCategories,getCategoryById};