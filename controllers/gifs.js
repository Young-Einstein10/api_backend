const pool = require("../models/queries");
const cloudinary = require("cloudinary").v2;   
const dotenv = require('dotenv');
const dataUri = require('../middleware/multerUploads')

dotenv.config()


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});




const postGif = (request, response) => {
	if(request.file) {
	 const file = dataUri(request).content;
	 return cloudinary.uploader.upload(file).then((result) => {
	   const imageUrl = result.url;
	   return response.status(200).json({
		messge: 'Your image has been uploded successfully to cloudinary',
			data: {
			imageUrl
			}
	   })
	 }).catch((error) => response.status(400).json({
	   messge: 'someting went wrong while processing your request',
	   data: {
		 error
	   }
	 }))
	}
}

const getGifById = (request, response) => {}

const comment = (request, response) => {}

const updateGif = (request, response) => {}

const deleteGif = (request, response) => {}


module.exports = { 
	postGif,
	getGifById,
	comment,
	updateGif,
	deleteGif
}