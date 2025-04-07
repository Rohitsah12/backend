const express=require("express");

const app=express();


const BookStore=[
    {id:1,name:"Harry Potter",author:"DevFlux"},
    {id:2,name:"Friends",author:"Vikas"},
    {id:3,name:"Nexus",author:"Rohit"},
    {id:4,name:"DSA",author:"Maharaj"},
    {id:5,name:"PremKahani",author:"Rohan"}
]

app.use(express.json());
app.get("/book",(req,res)=>{
    res.send(BookStore);
})

app.get("/book/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const Book=BookStore.find(info=>info.id===id);
    res.send(Book);
})


app.post("/book",(req,res)=>{
    BookStore.push(req.body);
    res.send("Data Saved Successfully");
})

















app.listen(5000,()=>{
    console.log("Listening at port 5000");
})





//route match honge: app.use

//app.get app.post app.patch app.put app.delete

















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