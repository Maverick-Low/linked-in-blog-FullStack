import express from "express";
import {db, connectToDb} from './db.js';

const app = express();
app.use(express.json());

// Retrieve article from database based on name
app.get('/api/articles/:name', async (req, res) => {
    const {name} = req.params;

    // Make a query
    const article = await db.collection('articles').findOne({name}); // articles is the collection, we are retrieving one document within this collection
    
    if(article) {
        res.json(article);
    } 
    else { res.sendStatus(404); }
});

// Upvoting - PUT requests for updates
app.put('/api/articles/:name/upvote', async (req, res) => {

    const {name} = req.params;


    // Update the upvotes in the database
    await db.collection('articles').updateOne({name}, {
        $inc: {upvotes: 1} // $inc means increment -> increment upvotes by 1
    })
    
    // Retrieve the article
    const article = await db.collection('articles').findOne({name}); 

    if(article) {
        res.json(article);
    }
    else {
        res.send('That article doesn\'t exist');
    }
});

// Commenting - POST request for creates
app.post('/api/articles/:name/comments', async (req, res) => {

    const {name} = req.params;
    const {postedBy, text} = req.body;

    // Update the database with new comments
    await db.collection('articles').updateOne({name}, {
        $push: {comments: {postedBy, text}} // $push means array.push() in mongoDB
    })

    // Retrieve the article and send it
    const article = await db.collection('articles').findOne({name}); 

    if(article) {
        res.json(article);
    }
    else {
        res.send('That article doesn\'t exist');
    }
});

connectToDb( () => {
    console.log('Succesfully connected to database');
    app.listen(3000, () => {
        console.log('Server is listening on port 3000');
    });
})
