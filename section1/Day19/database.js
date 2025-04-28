const mongoose = require('mongoose');
const {Schema}=mongoose;

async function main(params) {
    await mongoose.connect("mongodb+srv://RohitSah45:Rohit%40450987@codingadda.9k3dsmx.mongodb.net/Instagram");
}



module.exports=main;