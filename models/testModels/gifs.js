// const pool = require('../testDB');
const pool = require('../queries');



const createGifsTable = () => {
	const queryText = `
	CREATE TABLE IF NOT EXISTS gifs
		(
		    "gif_id" SERIAL,
		    title text COLLATE pg_catalog."default" NOT NULL,
		    "image_url" text COLLATE pg_catalog."default" NOT NULL,
		    "employee_id" integer NOT NULL,
		    "created_on" timestamp with time zone NOT NULL,
		    CONSTRAINT "gif_id" PRIMARY KEY ("gif_id"),
		    CONSTRAINT "employee_id" FOREIGN KEY ("employee_id")
		        REFERENCES employees (id) MATCH SIMPLE
		        ON UPDATE CASCADE
		        ON DELETE RESTRICT
		        NOT VALID
		)`;

	pool.query(queryText)
	    .then(() => {
	      console.log('GIFs Table Created');
	      // pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      // pool.end();
	    });
}


const dropGifsTable = () => {
	const queryText = 'DROP TABLE IF EXISTS gifs';

	pool.query(queryText)
	    .then(() => {
	      console.log('GIFs Table Dropped');
	      // pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      // pool.end();
	    });	
}

// createGifsTable();
// dropGifsTable();

module.exports = { createGifsTable, dropGifsTable }
