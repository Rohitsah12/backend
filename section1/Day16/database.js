const mongoose = require('mongoose');
const {Schema}=mongoose;

async function main(params) {
    await mongoose.connect("mongodb+srv://RohitSah45:Rohit%40450987@codingadda.9k3dsmx.mongodb.net/Bookstore");
    
    // const userSchema=new Schema({
    //     name:String,
    //     age:Number,
    //     city:String,
    //     gender:String,
    // })

    //Model ko create krte h:=Collection Create krna (Table ko create karna)
    //Class create Kari hai

    // const User=mongoose.model("user",userSchema);    

    //Document ko create kiya hai or object ko create kiya h
    // const User1 = new User({name:"Rohit",age:20,city:"Jogbani",gender:"Male"})
    // await  User1.save();

    // await User.create({name:"Mohan",city:"pakistan",age:30})


    // await User.insertMany([{name:"ipsita",age:18},{age:25,gender:"Male"}]);

    // const ans=await User.find({});
    // console.log(ans);
    
    // const ans2=await User.find({name:"Rohit"})
    // console.log(ans2);
    

}

// main().then(()=>console.log("Connected to DB")).catch((err)=>console.log(err)
// )

module.exports=main;