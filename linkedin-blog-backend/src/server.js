import express from "express";
import {db, connectToDb} from './db.js';
import fs from 'fs';
import admin from 'firebase-admin';

// Firebase setup
const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const app = express();
app.use(express.json());

// Express middleware, next function called when middleware processing finished
app.use( async(req, res, next) => {

    const {authtoken} = req.headers;  // Get auth token from client side
    if(authtoken) {
        try {
            const user = await admin.auth().verifyIdToken(authtoken); // Load corresponding firebase user from auth token
            req.user = user;
        } catch (error) {
            return res.sendStatus(400);
        }  
    }

    req.user = req.user || {};

    next(); // Move onto route handlers below
});

// Retrieve article from database based on name
app.get('/api/articles/:name', async (req, res) => {
    const {name} = req.params;
    const {uid} = req.user;

    // Make a query
    const article = await db.collection('articles').findOne({name}); // articles is the collection, we are retrieving one document within this collection
    
    if(article) {
        const upvoteIds = article.upvoteIds || []; // Default value = empty array
        article.canUpvote = uid && !upvoteIds.includes(uid); // Check if user has already upvoted
        res.json(article);
    } 
    else { res.sendStatus(404); }
});

// Middleware to prevent the user from accessing the comment and upvote routes if they are not logged in
app.use( (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.sendStatus(401);
    }
})

// Upvoting - PUT requests for updates
app.put('/api/articles/:name/upvote', async (req, res) => {

    const {name} = req.params;
    const {uid} = req.user;

    const article = await db.collection('articles').findOne({name});  // Retrieve the article
    
    if(article) {
        const upvoteIds = article.upvoteIds || []; // Retrieve array of userIds that have upvoted the article
        const canUpvote = uid && !upvoteIds.includes(uid); // Check if user has already upvoted the article
     
        if(canUpvote) {
            // Update the upvotes in the database
            await db.collection('articles').updateOne( {name}, {
                $inc: {upvotes: 1}, // $inc means increment -> increment upvotes by 1
                $push: {upvoteIds: uid}, // Add user's id to the array of users that have upvoted the article
            });
        }

        // Send back article with user upvote information included
        const updatedArticle = await db.collection('articles').findOne({name}); 
        res.json(updatedArticle);

    } else {
        res.send('That article doesn\'t exist');
    }
});

// Commenting - POST request for creates
app.post('/api/articles/:name/comments', async (req, res) => {

    const {name} = req.params;
    const {text} = req.body;
    const {email} = req.user;

    // Update the database with new comments
    await db.collection('articles').updateOne({name}, {
        $push: {comments: {postedBy: email, text}}
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
