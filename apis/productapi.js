const exp=require('express')
const prodapp=exp.Router()
let products=[
    {
        id:1,
        name:"clothes"
    },
    {
        id:2,
        name:"shoes"
    },
    {
        id:3,
        name:"watches"
    }
]
prodapp.get('/products',(req,res)=>{
    res.send({message:"all products",payload:products})
})
prodapp.get('/products/:id',(req,res)=>{
    let id=Number(req.params.id);
    let product=products.find((prodobj)=>prodobj.id===id)
     if(product==undefined){
        res.send({message:"No such product found"})
     }else{
         res.send({message:"product:",payload:product})
     }
})
prodapp.use(exp.json())
prodapp.post('/create_new',(req,res)=>{
    let newprod=req.body
    products.push(newprod)
    res.send({message:"new product addes",payload:products})
})
prodapp.put('/product_user/:id',(req,res)=>{
    let modifiedprod=req.body
    let index=products.findIndex(prodobj=>prodobj.id==modifiedprod)
    if(index==-1){
        res.send({message:"No product found"})
    }else{
        products.splice(index,1,modifiedprod)
        res.send({message:"product updated",payload:products})
    }
})
prodapp.delete('/delete_prod/:id',(req,res)=>{
    let id=Number(req.params.id)
    let index=products.findIndex((prodobj)=>prodobj.id==id)
    if(index==-1){
        res.send({message:"product not found"})

    }else{
        products.splice(index,1);
        res.send({message:"product deleted",payload:products})
    }
})

module.exports=prodapp