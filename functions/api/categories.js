const { db } = require('../util/admin');

exports.getAllCategories = (request, response) => {
	db
		.collection('categories')
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let categories = [];
			data.forEach((doc) => {
				categories.push({
                    categoryId: doc.id,
                    name: doc.data().name,
					createdAt: doc.data().createdAt,
				});
			});
			return response.status(200).json(categories);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};