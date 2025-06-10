const jwt=require("jsonwebtoken");

function verifyToken(req,res,next){
   const token = req.header('Authorization');
if (!token) {
    return res.status(401).send({ error: "Access Denied" });
}
    try{
        const decode=jwt.verify(token,"secret");
        console.log(decode);
        req.user=decode;
        next();
    }catch(err){
        res.status(401).send({
            error:"Invalid Token",
        });
    }
}
function isAdmin(req,res,next){
if(req.user && req.user.isAdmin){
    next()
}else{
    return res.status(403).send({
        error:"Forbidden Access"
    })
}
}
module.exports={verifyToken,isAdmin};