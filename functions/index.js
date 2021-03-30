const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllPosts,
    getOnePost
} = require('./api/posts')

app.get('/posts', getAllPosts);
app.get('/posts/:postId', getOnePost);
exports.api = functions.https.onRequest(app);