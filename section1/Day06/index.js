const express=require("express");

const app=express();



app.use("/about/:id",(req,res)=>{
    res.send({"name":"Rohit",age:20,"money":70,"Mon":20});
})

// app.use("/contact",(req,res)=>{
//     res.send("I am yor contact page");
// })

// app.use("/detail",(req,res)=>{
//     res.send("I am yor detail page");
// })
// app.use("/",(req,res)=>{
//     res.send("I am your home page");
// })
app.listen(4000,()=>{
    console.log("Listening at port 4000");
})