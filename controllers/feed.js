const pool = require("../models/queries");


const getFeed = (request, response) => {
    pool.query(`SELECT article_id as "articleId", NULL AS gifId, employee_id as "authorId", title, article, NULL as imageurl,
	created_on as "createdOn"
	FROM articles
	UNION ALL
	SELECT NULL, 
	gif_id as "gifId", 
	employee_id, title, 
	NULL, image_url, 
	created_on as "createdOn"
	FROM gifs
	ORDER BY "createdOn" DESC`, (error, results) => {
		if(error) {
			return response.status(500).json({
				status: "error",
				error: error
			})
		}

		if (results.rows.length > 0) {
	        return response.status(200).json({
	          status: 'success',
	          data: results.rows
	        });
	    }
        return response.status(200).json({
          status: 'success',
          data: 'No Article / Gif found, kindly post one',
        });
	})
} 


module.exports = { getFeed }