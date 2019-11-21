const pool = require("../models/queries");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;   
const dotenv = require('dotenv');
const dataUri = require('../middleware/multerUploads');



dotenv.config()


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// const postGif = (request, response) => {
// 	let filename = request.files.dataFile.path;

// 	cloudinary.uploader.upload(filename, {tags: "gotemps", resource_type: "auto"})
// 		.then(file => console.log(file.public_id, file.url))
// 		.catch(error => console.warn(error))
// }


const postGif = (request, response, next) => {
	const { title } = request.body;
	if(request.file) {
	 const file = dataUri(request).content;
	 return cloudinary.uploader.upload(file).then((result) => {
	   const image_url = result.url;
	   return image_url;
	 }).catch((error) => response.status(400).json({
	   message: 'someting went wrong while processing your request',
	   data: {
		 error
	   }
	 }))
	}

	const token = request.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
	if (!decodedToken) {
		throw 'Invalid Token';
	} 
	const employee_id = decodedToken.userId;

	pool.query('INSERT INTO gifs (title, image_url, employee_id, created_on) VALUES ($1, $2, $3, $4) RETURNING *', [title, image_url, employee_id, new Date()], (error, result) => {
		if(error) {
			throw Error
		}

		return response.status(201).json({
			status: 'success',
            data: {
				gif_id,
				message: "GIF message successfully posted",
				// created_on: ,
				// title: ,
				image_url
			}
		})
	})
}

const getGifById = (request, response) => {
	const gif_id = parseInt(request.params.id);

	pool.query('SELECT * FROM gifs WHERE gif_id = $1', [gif_id], (error, result) => {
		if (error) {
			return response.status(400).json({
				status: 'error',
                error: error
			})
		}
		response.status(200).json({
			status: "success",
			data: results.rows
		});
	})
}

const comment = (request, response) => {
	const gif_id = parseInt(request.params.id);

	const  { comments } = request.body;
	const token = request.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
	if (!decodedToken) {
		throw 'Invalid Token';
	} 
	const author_id = decodedToken.userId;


	pool.query('INSERT INTO gif_comments (comments, author_id, article_id, created_on) VALUES ($1, $2, $3, $4)', [comments, author_id, article_id, new Date()], (error, results) => {
		if (error) {
		   throw error
		}
		pool.query('SELECT gif_comments.article_comment_id, gif_comments.comments, gif_comments.article_id, gif_comments.created_on, articles.article, articles.title FROM gif_comments, articles', (error, results) => {
				if(error) {
					throw error
				}
				pool.query('SELECT gif_comments.article_comment_id, gif_comments.comments, gif_comments.author_id, gif_comments.article_id, gif_comments.created_on, articles.title, articles.article FROM gif_comments JOIN articles on gif_comments.article_id = articles.article_id', 
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

	pool.query('DELETE FROM articles WHERE gif_id = $1', [gif_id], (error, results) => {
	    if (error) {
	      throw error
	    }
	    response.status(200).json({
			status: "success",
			data: {
				message: `GIF deleted with ID: ${gif_id}`
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