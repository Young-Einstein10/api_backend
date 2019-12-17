// const pool = require('../testDB');
const pool = require('../queries');


const create_Article_Table = () => {
	const queryText = `
		CREATE TABLE IF NOT EXISTS articles
		(
		    article_id SERIAL,
		    title text COLLATE pg_catalog."default" NOT NULL,
		    article text COLLATE pg_catalog."default" NOT NULL,
		    employee_id integer NOT NULL,
		    created_on timestamp NOT NULL,
		    CONSTRAINT articles_pkey PRIMARY KEY (article_id),
		    CONSTRAINT "articles_employee_id_fkey" FOREIGN KEY (employee_id)
		        REFERENCES employees (id) MATCH SIMPLE
		        ON UPDATE CASCADE
		        ON DELETE RESTRICT
		        NOT VALID
		)`;

	pool.query(queryText)
	    .then(() => {
	      console.log('Articles Table Created');
	      // pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      // pool.end();
	    });	

}



const drop_Article_Table = () => {
	const queryText = 'DROP TABLE IF EXISTS articles';

	pool.query(queryText)
	    .then(() => {
	      console.log('Articles Table Dropped');
	      // pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      // pool.end();
	    });	
}

// create_Article_Table();
// drop_Article_Table();

module.exports = { create_Article_Table, drop_Article_Table }