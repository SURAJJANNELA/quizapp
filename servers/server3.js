const exp=require('express')
const  app=exp()
const bcrypt=require('bcryptjs')
//error handler
function errorhandler(err,req,res,next){
    res.send({errMessage:err.message})
}
app.use(errorhandler)
//exporting the userapi
const userapp=require('./apis/userlogin')
//mongclient connection
const mongoclient=require('mongodb').MongoClient
mongoclient.connect('mongodb://localhost:27017')
.then(client=>{
    let dbobj=client.db('userlogin')
    let usercollobj=dbobj.collection('users')
    app.set('usercollobj',usercollobj)
    console.log("Db connection success")
})
.catch(err=>console.log("DB connection error!"))
//link the server to the apis
app.use('/user-api',userapp)
//listen
app.listen(5000,()=>console.log("server running on the port no 5000.."))