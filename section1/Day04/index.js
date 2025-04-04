const http=require('http')

const server=http.createServer((req,res)=>{
    // res.end("Hello coder army");
    if(req.url=="/"){
        res.end("Hello coder army");
    }
    else if(req.url=="/contact"){
        res.end("This is our contact page")
    }
    else if(req.url=="/about"){
        res.end("this is our about page");
    }
    else{
        res.end("Error not found");
    }
});

server.listen(4000,()=>{
    console.log("I am listening at port number 4000");
    
})  