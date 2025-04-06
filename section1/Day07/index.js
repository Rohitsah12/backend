const express=require("express");

const app=express();


// app.use("/user",(req,res)=>{
//     res.send({name:"Rohit"})
// })

app.get("/user",(req,res)=>{
    // console.log(req);
    
    res.send({name:"Rohit"})
})

app.post("/user",(req,res)=>{
    console.log("Data Saved Successfully");
    res.send("Data Saved Successfully");
    
})

//get,post,patch,put,delete

app.listen(4000,()=>{
    console.log("Listening at port 4000");
})