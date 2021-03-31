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

exports.createOnePost = (request, response) => {
	cors(request, response, () => {
		if (request.body.message.trim() === '') {
			return response.status(400).json({ message: 'Must not be empty' });
		}
			
		const newPost = {
			title: request.body.title,
			body: request.body.body,
			createdAt: new Date().toISOString()
		}
		db
			.collection('posts')
			.add(newPost)
			.then((doc)=>{
				const responsePost = newPost;
				responsePost.id = doc.id;
				return response.json(responsePost);
			})
			.catch((err) => {
				response.status(500).json({ error: 'Something went wrong' });
				console.error(err);
			});
	})
}

exports.editOnePost = (request, response) => {
	console.log(request.body, "request body")
	if (request.body.body.trim() === '' || request.body.title.trim() === '') {
		return response.status(403).json({ message: 'Must not be empty' });
	}
	if(request.body.postId || request.body.createdAt){
        response.status(403).json({message: 'Not allowed to edit'});
    }
	let document = db.collection('posts').doc(`${request.params.postId}`);
    document.update(request.body)
    .then(()=> {
        response.status(200).json({post: 'Updated successfully'});
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ 
                error: err.code 
        });
    });
}