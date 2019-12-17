// const pool = require('../testDB');
const pool = require('../queries');


const createArticle_CommentsTable = () => {
	const queryText = `
		CREATE TABLE IF NOT EXISTS article_comments
		(
		    article_comment_id SERIAL,
		    comments text COLLATE pg_catalog."default" NOT NULL,
		    article_id integer NOT NULL,
		    author_id integer NOT NULL,
		    created_on timestamp NOT NULL,
		    CONSTRAINT article_comment_id PRIMARY KEY (article_comment_id),
		    CONSTRAINT article_id FOREIGN KEY (article_id)
		        REFERENCES articles (article_id) MATCH SIMPLE
		        ON UPDATE CASCADE
		        ON DELETE RESTRICT
		        NOT VALID,
		    CONSTRAINT author_id FOREIGN KEY (author_id)
		        REFERENCES employees (id) MATCH SIMPLE
		        ON UPDATE CASCADE
		        ON DELETE RESTRICT
		        NOT VALID
		)`


	pool.query(queryText)
	    .then(() => {
	      console.log('Article_comment Table Created');
	      // pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      // pool.end();
	    });	
}


const dropArticle_CommentsTable = () => {
	const queryText = 'DROP TABLE IF EXISTS article_comments';

	pool.query(queryText)
	    .then(() => {
	      console.log('Article_comment Table Dropped');
	      // pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      // pool.end();
	    });	
}

// createArticle_CommentsTable();
// dropArticle_CommentsTable();

module.exports = { createArticle_CommentsTable, dropArticle_CommentsTable }