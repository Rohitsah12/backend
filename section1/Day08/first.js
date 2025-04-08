const express=require("express");
const app=express();


//Route handler
//app.use(route,[RH,RH,RH,RH],RH,RH,RH)
//MiddleWare: mw->mw->mw->RequestHandler

// app.use("/user",(req,res,next)=>{
//     console.log("FIrst");
//     // res.send("Hello ji");
//     // console.log("First First");
//     // res.send("Mein mast huu")   yeh nhi krr skte h
//     next();   
// })
// app.use("/user",(req,res,next)=>{
//     console.log("Second");
//     // res.send("Hello I am second");
//     next();

    
// })
// app.use("/user",(req,res,next)=>{
//     console.log("Third");
//     // res.send("I am third");
//     next();
    
    
// })
// app.use("/user",(req,res)=>{
//     console.log("FOurth");
//     res.send("I am FOurth");
// })


//Maintain logs through Middle wair

app.use("/user",(req,res,next)=>{
    console.log(`${Date.now()} ${req.method} ${req.url}`);
    next();
})

app.get("/user",(req,res)=>{
    // console.log(`${Date.now()} ${req.method} ${req.url}`);
    res.send("Info about user")
})

app.post("/user",(req,res)=>{
    // console.log(`${Date.now()} ${req.method} ${req.url}`);
    res.send("Info Saved")
})
app.delete("/user",(req,res)=>{
    // console.log(`${Date.now()} ${req.method} ${req.url}`);
    res.send("Info Deleted")
})

//Request: Log ko maintain karta
//Timing: Kis type ki request thi,URL



app.listen(3000,()=>{
    console.log("Listening at 3000");
})
