const mongoose = require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50
    },
    lastName:{
        type:String
    },
    age:{
        type:Number,
        min:14,
        max:70
    },
    gender:{
        type:String,
        // enum:["male","female","others"]
        validate(value){
            if(!["male","female","others"].includes)
                throw new Error("Invalid Gender");
        }
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String
    },
    photo:{
        type:String,
        default:"This is the default photo"
    }
},{timestamps:true})

const User=mongoose.model("user",userSchema);    


module.exports=User;