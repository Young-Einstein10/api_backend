// const pool = require('../testDB');
const pool = require('../queries');



const createGif_Comments_Table = () => {
	const queryText = `
		CREATE TABLE IF NOT EXISTS gif_comments
		(
		    "gif_comment_id" SERIAL,
		    comments text COLLATE pg_catalog."default" NOT NULL,
		    "gif_id" integer NOT NULL,    
		    "author_id" integer NOT NULL,
		    "created_on" timestamp NOT NULL,
		    CONSTRAINT "gif_comment_id" PRIMARY KEY ("gif_comment_id"),
		    CONSTRAINT "gif_id" FOREIGN KEY ("gif_id")
		        REFERENCES gifs ("gif_id") MATCH SIMPLE
		        ON UPDATE CASCADE
		        ON DELETE RESTRICT
		        NOT VALID,
		    CONSTRAINT "author_id" FOREIGN KEY ("author_id")
		        REFERENCES employees (id) MATCH SIMPLE
		        ON UPDATE CASCADE
		        ON DELETE RESTRICT
		        NOT VALID
		)`;

	pool.query(queryText)
	    .then(() => {
	      console.log('GIF_comments Table Created');
	      // pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      // pool.end();
	    });	
}


const dropGif_Comments_Table = () => {
	const queryText = 'DROP TABLE IF EXISTS gif_comments';

	pool.query(queryText)
	    .then(() => {
	      console.log('GIF_comments Table Dropped');
	      // pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      // pool.end();
	    });	
}

// createGif_Comments_Table();
// dropGif_Comments_Table();

module.exports = { createGif_Comments_Table, dropGif_Comments_Table }