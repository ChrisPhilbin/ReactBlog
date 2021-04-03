const functions = require('firebase-functions');
const app = require('express')();

const {
    createOnePost,
    deleteOneReply,
    editOnePost,
    getAllPosts,
    getOnePost,
    getLatestPosts
} = require('./api/posts')

app.post('/posts', createOnePost);
app.get('/posts', getAllPosts);
app.get('/posts/latest', getLatestPosts);
app.get('/posts/:postId', getOnePost);
app.put('/posts/:postId', editOnePost);
app.delete('/posts/:postId', deleteOneReply);
exports.api = functions.https.onRequest(app);

const {
    getAllCategories
} = require('./api/categories')

app.get('/categories', getAllCategories);