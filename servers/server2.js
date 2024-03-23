const exp=require('express')
const app=exp()


function errorhandler(err,req,res,next){
    res.send({errMessage: err.message })
}
app.use(errorhandler)
const userapp=require('./apis/userapiwithmongo')
const prodapp=require('./apis/productapiwithmongo')

const mongoclient=require('mongodb').MongoClient
mongoclient.connect('mongodb://localhost:27017')
.then(client=>{
    const dbobj=client.db('ecommercedb')
    const usercollectionobject=dbobj.collection('usercollection')
    const prodcollectionobject=dbobj.collection('productcollection')
    
    app.set('usercollectionobject',usercollectionobject)
    app.set('productcollectionobject',prodcollectionobject)
    console.log("DB connection success")
    
})
.catch(err=>console.log("DB connection error",err))

//acknowledging the user api requests
app.use('/user-api',userapp)   //using the execute middleware for a specific path
app.use('/product-api',prodapp)

app.listen(5000,()=>console.log("port number 5000 assigned successfully"))

