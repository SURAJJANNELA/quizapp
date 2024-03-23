const exp=require('express')
const userapp=exp.Router()

//app.use(test1)
//to handle get request
userapp.get('/users',async(req,res)=>{
    const usercollectionobject=req.app.get('usercollectionobject')
    let dbusers=await usercollectionobject.find().toArray()
    res.send({message:"the users are",payload:dbusers})

})

//to handle post request 
userapp.get('/user/:user_name',async(req,res)=>{
   const usercollectionobject=req.app.get('usercollectionobject')
   let useridfromurl=req.params.user_name
   //console.log(useridfromurl)
   //finding the user
   let dbuser= await usercollectionobject.findOne({user_name:useridfromurl})
   
    res.send({message:"user found",payload:dbuser})

})
 userapp.use(exp.json())
userapp.post('/new_user',async(req,res)=>{
    const usercollectionobject=req.app.get('usercollectionobject')
    //getting the data
    let newuser=req.body
   // console.log(modifieduser)
    await usercollectionobject.insertOne({newuser})
    //if(acknowledged==true){
    res.send({message:"user inserted"})
    //}
})
//to handle put request 
userapp.put('/users',async(req,res)=>{
    const usercollectionobject=req.app.get('usercollectionobject')
    let modifieduser=req.body
    await usercollectionobject.updateOne({user_name:modifieduser.user_name},{$set:{...modifieduser}})
    res.send({message:"user modified"})
})
//to handle delete request
userapp.delete('/users/:user_name',async(req,res)=>{
    const usercollectionobject=req.app.get('usercollectionobject')
    let deleteuser=req.params.user_name
    //console.log(deleteuser)
    let dbres=await usercollectionobject.deleteOne({user_name:deleteuser})
    if(dbres.deletedCount==1){
        res.send({message:"user deleted"})
    }
})

module.exports=userapp