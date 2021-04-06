const { db } = require('../util/admin');

exports.getOneStaticPage = (request, response) => {
	db
		.doc(`/static/${request.params.pageName}`)
		.get()
		.then((doc) => {
            if (!doc.exists) {
                return response.status(404).json()
            }
            staticPageData = doc.data();
			staticPageData.pageId = doc.id;
			return response.json(staticPageData);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};