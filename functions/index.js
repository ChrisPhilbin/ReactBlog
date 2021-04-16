const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');

const {
    createOnePost,
    deleteOneReply,
    editOnePost,
    getAllPosts,
    getOnePost,
    getLatestPosts
} = require('./api/posts')

app.post('/posts', auth, createOnePost);
app.get('/posts', getAllPosts);
app.get('/posts/latest', getLatestPosts);
app.get('/posts/:postId', getOnePost);
app.put('/posts/:postId', auth, editOnePost);
app.delete('/posts/:postId', auth, deleteOneReply);
exports.api = functions.https.onRequest(app);

const {
    createOneCategory,
    getAllCategories,
    getAllPostsInCategory
} = require('./api/categories')

app.get('/categories', getAllCategories);
app.post('/categories', auth, createOneCategory);
app.get('/categories/:categoryName', getAllPostsInCategory)

const {
    createOneStaticPage,
    getOneStaticPage
} = require('./api/static')

app.get('/static/:pageName', getOneStaticPage)
app.post('/static', auth, createOneStaticPage)

const {
    loginUser,
    getUserDetail
} = require('./api/users')

app.post('/login', loginUser)
app.get('/user', auth, getUserDetail)