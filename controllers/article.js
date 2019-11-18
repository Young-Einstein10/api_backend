const pool = require("../models/queries");

const postArticles = (request, response) => {
	const { title, article, employee_id, createdon } = request.body;

	pool.query('INSERT INTO articles (title, article, employee_id, createdon) VALUES ($1, $2, $3, $4)', [title, article, employee_id, createdon], (error, results) => {
	    if (error) {
	      throw error
	    }

	    // pool.query(`SELECT * FROM articles WHERE article = '${article}';`, (error, results) => {
	    // 	if (error) {
	    //   		throw error
	    // 	}
	    // 	// const articleId = results.rows.map(user => user.articleId);
	    // 	var articleId = results.rows[0].articleId;

	    // 	console.log(articleId);
	    // 	return articleId;
	    // })

	    response.status(201).json({
	    	status: "success",
	    	data: {
	    		message: "Article successfully posted",
	    		articleId: "Integer", // dont know how to access articleID FROM DB???...will come back to it
	    		createdon, 
	    		title
	    	}
	    });
	})
}

const getArticleById = (request, response) => {
	// console.log(request.params)
	const article_id = parseInt(request.params.id);

	pool.query('SELECT * FROM articles WHERE article_id = $1', [article_id], (error, results) => {
	   if (error) {
	      throw error
	   }
	   response.status(200).json(results.rows)
	})
}

const getAllArticles = (request, response ) => {
	pool.query('select * from articles ORDER BY article_id ASC', (error, results) => {
	    if (error) {
	      throw error
	    }
	    response.status(200).json(results.rows)
	})
}
 
const comment = (request, response) => {
	const article_id = parseInt(request.params.id);
	const  { comments, author_id, created_on } = request.body;

	pool.query('INSERT INTO article_comments (comments, author_id, article_id, created_on) VALUES ($1, $2, $3, $4)', [comments, author_id,article_id, created_on], (error, results) => {
	   if (error) {
	      throw error
	   }
	   pool.query('SELECT article_comments.article_comment_id, article_comments.comments, article_comments.article_id, article_comments.created_on, articles.article, articles.title FROM article_comments, articles', (error, results) => {
	   		if(error) {
	   			throw error
	   		}
	   		pool.query('SELECT article_comments.article_comment_id, article_comments.comments, article_comments.author_id, 				article_comments.article_id, article_comments.created_on, articles.title, articles.article FROM 			article_comments JOIN articles on article_comments.article_id = articles.article_id', 
					(error, results) => {
	   			if(error) {
		   			response.status(500).json({
		   				status: "error",
		   				message: "internal server error"
		   			})
		   		}
		   		const res = results.rows.find(item => item.comments == request.body.comments)
		   		// console.log(res);

		   		const { title, article, comments, created_on } = res;
		   		// return response.status(201).send("success")
		   		return response.status(201).json({
		   			status: "success",
			    	data: {
			    		message: "comment successfully created",
			    		createdOn: created_on,
			    		articleTitle: title,
			    		article: article,
			    		comment: comments			    		
			    	}
		   		})
	   		})
	   })
	})
}

const updateArticle = (request, response) => {
	const article_id = parseInt(request.params.id);
	const { title, article } = request.body;

	pool.query('UPDATE articles SET title = $1, article = $2 WHERE article_id = $3', [title, article, article_id], (error, results) => {
	    if (error) {
	    	throw error
	    }
	    response.status(200).send(`Article modified with ID: ${article_id}`);
	});
}
// select * from articles ORDER BY article_id ASC

const deleteArticle = (request, response) => {
	const article_id = parseInt(request.params.id);

	pool.query('DELETE FROM articles WHERE article_id = $1', [article_id], (error, results) => {
	    if (error) {
	      throw error
	    }
	    response.status(200).send(`article deleted with ID: ${article_id}`)
	});
}



module.exports = { 
	getAllArticles,
	postArticles,
	getArticleById,
	comment,
	updateArticle,
	deleteArticle
}