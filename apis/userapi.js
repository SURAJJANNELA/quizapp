const exp=require('express')
const userapp=exp.Router()
let users=[
    {
        id:1,
        name:"suraj"
    },
    {
        id:2,
        name:"uday"
    }
]
//app.use(test1)
//to handle get request
userapp.get('/users',(req,res)=>{
    res.send({message:"All users", payload: users})
});
//to handle post request 
userapp.get('/user/:id',(req,res)=>{
    let id=Number(req.params.id);
    let user=users.find((userobj)=>userobj.id===id);
    if(user == undefined){
        res.send({message:"NO such user found"})
    }else {
        res.send({message:"a user",payload: user})
    }
})
 userapp.use(exp.json())
userapp.post('/new_user',(req,res)=>{
    let newuser=req.body;
    users.push(newuser)
    res.send({message:"new user created",payload:users})
    

})
//to handle put request 
userapp.put('/users',(req,res)=>{
    let modifieduser=req.body;
    let index=users.findIndex(userobj=>userobj.id==modifieduser.id)
    if(index==-1){
        res.send({message:"NO user found"});
    }else{
        users.splice(index,1,modifieduser);
        res.send({message:"user modified"})
    }
})
//to handle delete request
userapp.delete('/users/:id',(req,res)=>{
    let id=Number(req.params.id)
    let index=user.findIndex((userobj)=>userobj.id==id)
    if(index==-1){
        res.send({message:"no such user found"});
    }else{
        users.splice(index,1);
        res.send({message:"user deleted"})
    }
})

module.exports=userapp