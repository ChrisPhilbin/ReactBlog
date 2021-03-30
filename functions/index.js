const functions = require('firebase-functions');
const app = require('express')();

const {
    createOnePost,
    getAllPosts,
    getOnePost
} = require('./api/posts')

app.post('/posts', createOnePost);
app.get('/posts', getAllPosts);
app.get('/posts/:postId', getOnePost);
exports.api = functions.https.onRequest(app);