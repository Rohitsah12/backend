const express=require("express");
const app=express();
const main=require("./database")
const User=require("./models/users")
app.use(express.json());

app.post("/register",async (req,res)=>{
    try{
        await User.create(req.body);
        res.send("user Registered Successfully")
    }
    catch(err){
        res.send("Error"+err);
    }
})

app.get("/info",async (req,res)=>{
    try{
        const result=await User.find();
        res.send(result);
    }
    catch(err){
        res.send("Error: "+err);
    }
})

app.get("/user/:id",async (req,res)=>{
    try{
        const result=await User.findById(req.params.id);
        res.send(result);
    }
    catch(err){
        res.send("Error:"+err);
    }
})

app.delete("/user/:id",async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.send("Deleted Successfully")
    }
    catch(err){
        res.send("Error:"+err);
    }
})

app.patch("/user",async (req,res)=>{
    try {
        const {_id,...update}=req.body;
        await User.findByIdAndUpdate(_id,update);
        res.send("Update Successfully");
        
    } catch (error) {
        res.send("Error:"+error);
    }
})

main()
    .then( ()=>{console.log("Connected to DB")
    app.listen(3000,()=>{
        console.log("Listening at port 3000");
    })
    
}).catch((err)=>console.log(err))









//starting with the database













// app.use("/user",(req,res)=>{
//     res.send({name:"Rohit"})
// })

//parsing krni hoti h

// app.use(express.json());

// app.get("/user",(req,res)=>{
    // console.log(req);
    
//     res.send({name:"Rohit"})
// })

// app.post("/user",(req,res)=>{
    // console.log("Data Saved Successfully");

//     console.log(req.body.age);
//     res.send("Data Saved Successfully");
    
// })

//get,post,patch,put,delete