// for handling the logic of the routes
const Brand = require("./../db/brand");

async function addBrand(model){
   let brand= new Brand(
    {
        name: model.name,
  }
    );
await    brand.save();
// Return the saved brand as an object ra model ley accept garxa
    return brand.toObject();
}

async function getBrands(){
    let brands= await Brand.find();
    return brands.map(brand => brand.toObject());
}

async function getBrandById(id){
    let brand= await Brand.findById(id);
    return brand.toObject();
}


async function updateBrand(id,model){

await  Brand.findByIdAndUpdate({_id: id},model);

return;
}
//handler for delete brand
async function deleteBrand(id,){
await  Brand.findByIdAndDelete(id);
return;
}


module.exports = {addBrand,updateBrand,deleteBrand,getBrands,getBrandById};