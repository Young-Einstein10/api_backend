const pool = require("../models/queries");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;   
const dotenv = require('dotenv');
const { dataUri } = require('../middleware/multerUploads');



dotenv.config()


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});


const postGif = (request, response, next) => {
	const { title } = request.body;
	if(request.file) {
	 const file = dataUri(request).content;
	 return cloudinary.uploader.upload(file).then((result) => {
	   	const image_url = result.url;

	   	const token = request.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
		if (!decodedToken) {
			response.status(500).json({
				status: "error",
				error: "Invalid Token"
			});
		} 
		const employee_id = decodedToken.userId;

		pool.query('INSERT INTO gifs (title, image_url, employee_id, created_on) VALUES ($1, $2, $3, $4) RETURNING *', [title, image_url, employee_id, new Date()], (error, results) => {
			if(error) {
				response.status(500).json({
					status: "error",
					error: error
				});
			}

			return response.status(201).json({
				status: 'success',
	            data: results.rows
			})
		})
	 }).catch((error) => response.status(400).json({
	   status: 'error: someting went wrong while uploading your image',
	   error
	 }))
	}
	
}

const getGifById = (request, response) => {
	const gif_id = parseInt(request.params.id);

	pool.query('SELECT * FROM gifs WHERE gif_id = $1', [gif_id], (error, results) => {
		if (error) {
			return response.status(404).json({
				status: 'error',
                error: 'GIF not found'
			})
		}

		if(results.rows.length === 0) {
			return response.status(404).json({
				status: 'error',
				error: 'GIF not found!'
			})
	   	}

		const { gif_id, title, image_url, employee_id, created_on } = results.rows[0];

		pool.query('SELECT gif_comment_id as "commentId", comments as "comment", author_id as"authorId", created_on as "createdOn" FROM gif_comments WHERE gif_id = $1', [gif_id], (error, results) => {
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
	                id: gif_id,
	                createdOn: created_on,
	                title,
	                image_url,
	                comments: []
	              },
	            });
	        }
	        
	        return response.status(200).json({
		    	status: 'success',
		        data: {
			        id: gif_id,
		            createdOn: created_on,
		            title,
		            image_url,
			        comments: results.rows
		        }       
	        });  	
	   		            
	   	})
	})
}

const comment = (request, response) => {
	const gif_id = parseInt(request.params.id);

	const  { comments } = request.body;
	const token = request.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
	if (!decodedToken) {
		response.status(401).json({
			status: "error",
			message: 'Invalid User Credentials'
		})
	} 

	const author_id = decodedToken.userId;

	pool.query('INSERT INTO gif_comments (comments, author_id, gif_id, created_on) VALUES ($1, $2, $3, $4) RETURNING *', [comments, author_id, gif_id, new Date()], (error, results) => {
		if (error) {
		   	response.status(500).json({
				status: "error",
				message: "error saving comnent in database"
			})
		}
		pool.query('SELECT gif_comments.gif_comment_id, gif_comments.comments, gif_comments.gif_id, gif_comments.created_on, gifs.image_url, gifs.title FROM gif_comments, gifs', (error, results) => {
				if(error) {
					response.status(500).json({
						status: "error",
						message: "error saving comnent in database"
					})
				}
				pool.query('SELECT gif_comments.gif_comment_id, gif_comments.comments, gif_comments.author_id, gif_comments.gif_id, gif_comments.created_on, gifs.title, gifs.image_url FROM gif_comments JOIN gifs on gif_comments.gif_id = gifs.gif_id', 
					 (error, results) => {
					if(error) {
						response.status(500).json({
							status: "error",
							message: "error saving comnent in database"
						})
					}
					console.log(results.rows);
					const res = results.rows.find(item => item.comments == request.body.comments)
					const { title, image_url, comments, created_on } = res;
					// return response.status(201).send("success")
					return response.status(201).json({
						status: "success",
						data: {	
							message: "comment successfully created",
							createdOn: created_on,
							gifTitle: title,
							image_url: image_url,
							comment: comments			    		
						}
					})
				})
		})
	})
}

const updateGif = (request, response) => {
	const gif_id = parseInt(request.params.id);
	const { title, image } = request.body;




	pool.query('UPDATE gifs SET title = $1, image_url = $2 WHERE gif_id = $3', [title, image, gif_id], (error, results) => {
	    if (error) {
	    	throw error
	    }
		// response.status(200).send(`Article modified with ID: ${article_id}`);
		response.status(201).json({
	    	status: "success",
	    	data: {
	    		message: `GIF modified with ID: ${gif_id}`,
				image_url	    		

	    	}
	    });
	});
}

const deleteGif = (request, response) => {
	const gif_id = parseInt(request.params.id);

	pool.query('DELETE FROM gifs WHERE gif_id = $1', [gif_id], (error, results) => {
	    if (error) {
	      response.status(500).json({
	      	status: "error",
	      	error
	      })
	    }
	    response.status(200).json({
			status: "success",
			data: {
				message: 'GIF successfully deleted'
			}
		})
	});
}


module.exports = { 
	postGif,
	getGifById,
	comment,
	updateGif,
	deleteGif
}