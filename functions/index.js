const functions = require('firebase-functions');
const app = require('express')();

const {
    createOnePost,
    editOnePost,
    getAllPosts,
    getOnePost
} = require('./api/posts')

app.post('/posts', createOnePost);
app.get('/posts', getAllPosts);
app.get('/posts/:postId', getOnePost);
app.put('/posts/:postId', editOnePost)
exports.api = functions.https.onRequest(app);