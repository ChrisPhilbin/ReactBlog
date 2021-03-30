const { db } = require('../util/admin');

exports.getAllPosts = (request, response) => {
	db
		.collection('posts')
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let posts = [];
			data.forEach((doc) => {
				posts.push({
                    postId: doc.id,
                    title: doc.data().title,
					body: doc.data().body,
					createdAt: doc.data().createdAt,
				});
			});
			return response.json(posts);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.getOnePost = (request, response) => {
	db
		.doc(`/posts/${request.params.postId}`)
		.get()
		.then((doc) => {
            if (!doc.exists) {
                return response.status(404).json()
            }
            postData = doc.data();
			postData.postId = doc.id;
			return response.json(postData);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};