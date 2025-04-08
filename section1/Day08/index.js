const express=require("express");

const app=express();


const BookStore=[
    {id:1,name:"Harry Potter",author:"DevFlux"},
    {id:2,name:"Friends",author:"Vikas"},
    {id:3,name:"Nexus",author:"Rohit"},
    {id:4,name:"DSA",author:"Maharaj"},
    {id:5,name:"PremKahani",author:"Rohan"},
    {id:6,name:"Hello",author:"Vikas"},
]

app.use(express.json());
app.get("/book",(req,res)=>{
    console.log(req.query);

    const Book=BookStore.filter(info => info.author===req.query.author);
    
    res.send(Book);
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


app.patch("/book",(req,res)=>{
    console.log(req.body);
    const Book=BookStore.find(info=>info.id===req.body.id);
    if(req.body.author)
    Book.author=req.body.author;

    if(req.body.name) Book.name=req.body.name;
    res.send("Patch Updated")
})

app.put("/book",(req,res)=>{
    const Book=BookStore.find(info=>info.id===req.body.id);
    Book.author=req.body.author;
    Book.name=req.body.name;
    res.send("Changes updated successfully");
})

app.delete("/book/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const index=BookStore.findIndex(info=>info.id===id);    
    BookStore.splice(index);
    res.send("Successfully Deleted")


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