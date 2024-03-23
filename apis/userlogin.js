const exp=require('express')
const userapp=exp.Router()
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
//to handle the login(post) request
userapp.use(exp.json())
userapp.post('/login',async(req,res)=>{
    let usercollobj=req.app.get('usercollobj')
    let newuser=req.body
    let dbuser=await usercollobj.findOne({username:newuser.username})
    if(dbuser==null){
        res.send({message:"user already existed"})
    }else{
        let status=await bcryptjs.compare(newuser.password,dbuser.password)
        if(status==false){
            res.send({message:"Invalid password"})
        }
        else{
        let encodedtoken=jwt.sign({username:dbuser.username},'abcdef',{expiresIn:100,})
        res.send({message:"login success",token:encodedtoken,user:dbuser})

        }
        // newuser.password=newpwd
        // await usercollobj.insertOne(newuser)
        // res.send({message:"new user created"})
    }
})
userapp.get('/test-portected',verifytoken,async(req,res)=>{
    console.log(req.headers)
})
module.exports=userapp;