const Pool = require('pg').Pool
const dotenv = require('dotenv');
// const { createArticle_CommentsTable, dropArticle_CommentsTable } = require('./testModels/article_comments');
// const { create_Article_Table, drop_Article_Table } = require('./testModels/articles');
// const { createGif_Comments_Table, dropGif_Comments_Table } = require('./testModels/gif_comments');
// const { createGifsTable, dropGifsTable } = require('./testModels/gifs');
// const { createEmployeeTable, dropEmployeeTable } = require('./testModels/employees');


dotenv.config();

  if (process.env.NODE_ENV === 'testing') {
    pool = new Pool({
	  user: process.env.TEST_DB_USER,
	  host: process.env.TEST_DB_HOST,
	  database: process.env.TEST_DB_NAME,
	  password: process.env.TEST_DB_PASS,
	  port: process.env.TEST_DB_PORT
	});

    // createArticle_CommentsTable(); 
    // dropArticle_CommentsTable();

    // create_Article_Table();
    // drop_Article_Table();

    // createGif_Comments_Table();
    // dropGif_Comments_Table();

    // createGifsTable(); 
    // dropGifsTable();

    // createEmployeeTable(); 
    // dropEmployeeTable();

	pool.on('connect', () => {
	  console.log('connected to the Test Database');
	});
  } else {
    pool = new Pool({
	  user: process.env.DB_USER,
	  host: process.env.DB_HOST,
	  database: process.env.DB_NAME,
	  password: process.env.DB_PASS,
	  port: process.env.DB_PORT
	});

	pool.on('connect', () => {
	  console.log('connected to the Database');
	});
  }

module.exports = pool;