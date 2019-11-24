const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single('image');

const dUri = new Datauri();

/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 */

const dataUri = request => dUri.format(path.extname(request.file.originalname).toString(), request.file.buffer);

module.exports = { multerUploads, dataUri };