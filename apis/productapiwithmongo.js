const exp=require('express')
const prodapp=exp.Router()

prodapp.get('/products',async(req,res)=>{
  const prodcollectionobject=req.app.get('productcollectionobject')
  let users=await prodcollectionobject.find().toArray()
  res.send({message:"products",payload:users})
})
prodapp.get('/products/:prodname',async(req,res)=>{
   const prodcollectionobject=req.app.get('productcollectionobject')
   let prodnamefromurl=req.params.prodname
   let product=await prodcollectionobject.findOne({prod_name:prodnamefromurl})
   res.send({message:"user found",payload:product})
})
prodapp.get('/products/:id',async(req,res)=>{
    const prodcollectionobject=req.app.get('productcollectionobject')
    let prod_id=req.params.id
    console.log(prodid)
    let product1=await prodcollectionobject.findOne({prod_id:prodid})
    res.send({message:"product found",payload:product1})
})
prodapp.use(exp.json())
prodapp.post('/create_product',async(req,res)=>{
    const prodcollectionobject=req.app.get('productcollectionobject')
    let newuser=req.body
    await prodcollectionobject.insertOne({newuser})
    res.send({message:"new product created"})
})
prodapp.put('/product_user',async(req,res)=>{
    const prodcollectionobject=req.app.get('productcollectionobject')
    let modifieduser=req.body
    await prodcollectionobject.updateOne({prod_name:modifieduser.prod_name},{$set:{...modifieduser}})
     res.send({message:"prod updated"})
})
prodapp.delete('/delete_prod/:prod_name',async(req,res)=>{
    const prodcollectionobject=req.app.get('productcollectionobject')
    let product_id=req.params.prod_name
    let dbres=await prodcollectionobject.deleteOne({prod_id:product_name})
    if(dbres.deletedCount==1){
        res.send({message:"product deleted successfully"})
    }
})

module.exports=prodapp