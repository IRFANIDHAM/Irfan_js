const {MongoClient} = require('mongodb');


const drivers =[
   {
     name: "John Doe",
     vehicletype: "Sedan",
     isAvailable: true,
     rating: 4.8
   },
   {
    name: "Alice Smith",
    vehicletype: "SUV",
    isAvailable: false,
    rating: 4.5
   },
   {
    name: "Afiq Yap",
    vehicletype: "SUV",
    isAvailable: true,
    rating: 3.0
   }
];

//show the data in the console
console.log(drivers);

//TODO: show the all the drivers name in the console
 
//TODO: add additional driver to the drivers array

async function main(){
    //Replace <connection-string> with your MongoDB URI
    const uri = "mongodb://localhost:27017"
    const client = new MongoClient(uri);

    try{
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("testDB");
        const collection = db.collection("users");

    // Insert a document
        await collection.insertOne({ name: "Irfan", age: 25});
        console.log("Document inserted!");
    
    //Query the document
        const result = await collection.findOne({name: "Irfan"});
        console.log("Query result:", result);
    }catch (err) {
        console.error("Error:", err);
    } finally{
        await client.close();
    }
}

main();