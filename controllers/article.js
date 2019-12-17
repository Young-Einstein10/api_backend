const pool = require("../models/queries");
const jwt = require("jsonwebtoken");
const { createArticle_CommentsTable } = require('../models/testModels/article_comments');
const { create_Article_Table } = require('../models/testModels/articles');



create_Article_Table();
createArticle_CommentsTable();


const postArticles = (request, response) => {
	const { title, article } = request.body;

	const token = request.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
	if (!decodedToken) {
		response.status(401).json({
			status: "error",
			error: "Invalid User Token"
		});;
	} 
	const employee_id = decodedToken.userId;

	pool.query('INSERT INTO articles (title, article, employee_id, created_on) VALUES ($1, $2, $3, $4) RETURNING *', [title, article, employee_id, new Date()], (error, results) => {
	    if (error) {
	      	response.status(500).json({
				status: "error",
				error: error
			});
	    }
	    response.status(201).json({
	    	status: "success",
	    	data: results.rows
	    });
	})
}

const getArticleById = (request, response) => {
	const article_id = parseInt(request.params.id);

	pool.query('SELECT * FROM articles WHERE article_id = $1', [article_id], (error, results) => {
	   	if (error) {
			return response.status(500).json({
				status: 'error',
				error: 'Internal Database Error!'
			})
	   	}

	   	if(results.rows.length === 0) {
			return response.status(404).json({
				status: 'error',
				error: 'Article not found!'
			})
	   	}

	   	const { article_id, title, article, employee_id, created_on } = results.rows[0];
	   		
	   	pool.query('SELECT article_comment_id as "commentId", comments as "comment", author_id as"authorId", created_on as "createdOn" FROM article_comments WHERE article_id = $1', [article_id], (error, results) => {
	   		if(error) {
	   			return response.status(500).JSON({
	   				status: "error",
	   				error: error
	   			})
	   		}


	   		if (!results.rows.length) {
	   			return response.status(200).json({
	              status: 'success',
	              data: {
	                id: article_id,
	                createdOn: created_on,
	                title,
	                article,
	                employee_id,
	                comments: []
	              },
	            });
	        }
	        
	        return response.status(200).json({
		    	status: 'success',
		        data: {
			        id: article_id,
		            createdOn: created_on,
		            title,
		            article,
		            employee_id,
			        comments: results.rows
		        }       
	        });  	
	   		            
	   	})
	})
}

 
const comment = (request, response) => {
	const article_id = parseInt(request.params.id);
	
	const  { comments } = request.body;
	const token = request.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
	if (!decodedToken) {
		response.status(401).json({
			status: "error",
			error: "Invalid User Token"
		});;
	} 
	const author_id = decodedToken.userId;
	
	

	pool.query('INSERT INTO article_comments (comments, author_id, article_id, created_on) VALUES ($1, $2, $3, $4)', [comments, author_id, article_id, new Date()], (error, results) => {
	   if (error) {
	    response.status(500).json({
			status: "error",
			error: "internal server error"
		});
	   }
	   pool.query('SELECT article_comments.article_comment_id, article_comments.comments, article_comments.article_id, article_comments.created_on, articles.article, articles.title FROM article_comments, articles', (error, results) => {
	   		if(error) {
	   			response.status(500).json({
					status: "error",
					error: "internal server error"
				});
	   		}
	   		pool.query('SELECT article_comments.article_comment_id, article_comments.comments, article_comments.author_id, 				article_comments.article_id, article_comments.created_on, articles.title, articles.article FROM 			article_comments JOIN articles on article_comments.article_id = articles.article_id', 
					(error, results) => {
	   			if(error) {
		   			response.status(500).json({
		   				status: "error",
		   				error: "internal server error"
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

	pool.query('UPDATE articles SET title = $1, article = $2 WHERE article_id = $3 RETURNING *', [title, article, article_id], (error, results) => {
	    if (error) {
	    	response.status(500).json({
		   		status: "error",
		   		error: "error updating article"
		   	})
	    }
		response.status(201).json({
	    	status: 'success',
	    	data: results.rows	    	
	    });
	});
}
// select * from articles ORDER BY article_id ASC

const deleteArticle = (request, response) => {
	const article_id = parseInt(request.params.id);

	pool.query('DELETE FROM articles WHERE article_id = $1', [article_id], (error, results) => {
	    if (error) {
	      	response.status(500).json({
		   		status: "error",
		   		error: "error deleting article"
		   	})
	    }
	    response.status(200).json({
			status: "success",
			data: {
				message: `article deleted with ID: ${article_id}`
			}
		})
	});
}



module.exports = { 
	// getAllArticles,
	postArticles,
	getArticleById,
	comment,
	updateArticle,
	deleteArticle
}