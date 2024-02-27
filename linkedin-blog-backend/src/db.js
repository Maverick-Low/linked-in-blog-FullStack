import { MongoClient } from "mongodb";

let db;


async function connectToDb(cb) {

    // Connect to MongoDB
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.wgu5uxg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    await client.connect();

    // Update the upvotes in the database
    db = client.db('react-blog-db'); 
    cb();
}

export {
    db,
    connectToDb,
}