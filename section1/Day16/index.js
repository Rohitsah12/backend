const express=require("express");
const app=express();
const main=require("./database")
const User=require("./models/users")
app.use(express.json());

app.get("/info",async (req,res)=>{
    const ans=await User.find({});
    res.send(ans);
})

app.post("/info",async (req,res)=>{

    // const ans=new User(req.body);
    // await ans.save();
    // res.send("successfully updates")

    try{
        await User.create(req.body);
        res.send("Successfully Updated");
    }
    catch(err){
        res.send(err);
    }
})

app.delete("/info",async (req,res)=>{
    await User.deleteOne({name:"Vishal"})
    res.send("Deleted")
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