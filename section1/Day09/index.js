const express=require("express");
const app=express();
const {Auth} = require("./middleware/Auth")

//crud => create read update delete

//Database: array

const FoodMenu=[
    {id:1,food:"Chowmein",category:"veg",price:500},
    {id:2,food:"Butter Naan",category:"veg",price:100},
    {id:3,food:"Chicken",category:"non-veg",price:1000},
    {id:4,food:"Mutton",category:"non-veg",price:1500},
    {id:5,food:"Momo",category:"veg",price:300},
    {id:6,food:"Chai",category:"veg",price:50},
    {id:7,food:"Rajma",category:"veg",price:300},
    {id:8,food:"Roti",category:"veg",price:20},
    {id:9,food:"Lolipop",category:"non-veg",price:700},
    {id:10,food:"Kebab",category:"non-veg",price:400},
    {id:11,food:"Paneer",category:"veg",price:800},
    {id:12,food:"Egg curry",category:"non-veg",price:300},
    {id:13,food:"Salad",category:"veg",price:100},
    {id:14,food:"Swarma",category:"veg",price:300},
    {id:15,food:"Butter chicken",category:"non-veg",price:900},
    {id:16,food:"Mushroom",category:"veg",price:700},
]

app.use(express.json());

const AddToCart=[];//user ka jo bhi food hoga woh idhrr jayega
app.get("/food",(req,res)=>{
    res.status(200).send(FoodMenu);
})

// app.use("/admin",Auth)

app.post("/admin",Auth,(req,res)=>{
    //Add item into food menu 
    //Authenticate: verify Krna padega ki kya yeh admin hi hai
    //Authorization: power hai

    //dummy code
    // const token="ABCDEF"
    // const Access=token==="ABCDEF"?1:0;

  
        FoodMenu.push(req.body);
        res.status(201).send("Item added Successfully");

})
 
app.delete("/admin/:id",Auth,(req,res)=>{
    // const token="ABCDEF"
    // const Access=token==="ABCDEF"?1:0;
   
        const id=parseInt(req.params.id);
        const index=FoodMenu.findIndex(item=>item.id===id);
        if(index===-1){
            res.send("Item doesnot exist");
        }
        else{
            FoodMenu.splice(index,1);
            res.send("Successfully deleted")
        }

})

app.patch("/admin",Auth,(req,res)=>{
    // const token="ABCDEF"
    // const Access=token==="ABCDEF"?1:0;
  
        const id=req.body.id;
        const fooddata=FoodMenu.find(item=>item.id===id);
        if(fooddata){
            if(req.body.food){
                fooddata.food=req.body.food;
            }
            if(req.body.category) fooddata.category=req.body.category
            if(req.body.price) fooddata.price=req.body.price
            res.send("Successfully updated")
        }
        else{
            res.send("Item Not exist")
        }
  
})


app.post("/user/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const foodItem=FoodMenu.find(item=>item.id===id);
    if(foodItem){
        AddToCart.push(foodItem);
        res.status(200).send("Item added successfully")
    }
    else{
        res.send("Item out of stock");
    }
})

app.delete("/user/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const index=AddToCart.findIndex(item=>item.id===id);
    if(index!=-1){
        AddToCart.splice(index,1);
        res.send("Item removed successfully")
    }
    else{
        res.send("Item is not present in cart")
    }
})

app.get("/user",(req,res)=>{
    if(AddToCart.length==0){
        res.send("cart is empty");
    }
    res.send(AddToCart);
})

app.listen(3000,()=>{
    console.log("Listening at port 3000");
})



















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