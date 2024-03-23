const http=require('http')
const server=http.createServer((req,res)=>
{
   // res.end("the server is working")
   //console.log(req)
//    console.log("the request type is",req.method)
//    console.log("the url path is",req.url)
    if(req.method=="GET"){
        if(req.url=="/users"){
             res.end("all users")
        }
        if(req.url=="/products"){
            res.end("All prodcuts")
        }
    }
    if(req.method=="POST"){
        if(req.url=="/create_user"){
            res.end("user created")
        }
        if(req.url=="/create_product")
        {
            res.end("product created")
        }
    }
    if(req.method=="PUT"){
        res.end("user modified")
    }
    if(req.method=="DELETE"){
        res.end("user deleted")
    }
})
server.listen(5000,()=>console.log("server running on port number 5000..."))