const { MongoClient, ServerApiVersion, Collection } = require("mongodb");

// Replace the placeholder with your Atlas connection string
//@==%40
const uri = "mongodb+srv://RohitSah45:Rohit%40450987@codingadda.9k3dsmx.mongodb.net/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const dbName = "CoderArmy";

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        // Send a ping to confirm a successful connection
        const db= client.db(dbName);
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const collection=db.collection('user')
        // const findresult= collection.find({});
        // const ans=await findresult.toArray();
        // console.log('Found documents =>',ans);

        // for await (const doc of findresult){
        //     console.log(doc);
            
        // }

        // const insertResult = await collection.insertOne({"name":"Soveerr",age:40});
        const insertResult = await collection.insertMany([{a:1},{b:2},{c:3}]);
        console.log('Inserted document => ',insertResult);
        
        
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);



//agr database exist na krta ho, what will happen will it create DB for you or thorow an error