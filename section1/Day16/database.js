const mongoose = require('mongoose');

async function main(params) {
    await mongoose.connect("mongodb+srv://RohitSah45:Rohit%40450987@codingadda.9k3dsmx.mongodb.net/")
}

main().then(()=>console.log("Connected to DB")).catch((err)=>console.log(err)
)