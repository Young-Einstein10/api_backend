const pool = require('../testDB');

const createAdminTable = () => {
	const queryText = `
	CREATE TABLE IF NOT EXISTS admin
		(
		    id SERIAL,
		    username text NOT NULL,
		    password text NOT NULL,
		    isAdmin BOOLEAN NOT NULL DEFAULT TRUE,
		    CONSTRAINT id PRIMARY KEY (id)
		)`;


  pool.query(queryText)
    .then((res) => {
      console.log('Admin Table Created');
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}


const dropAdminTable = () => {
	const queryText = 'DROP TABLE IF EXISTS admin';
	  pool.query(queryText)
	    .then((res) => {
	      console.log('Table dropped');
	      pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      pool.end();
	    });
}




module.exports = { createAdminTable, dropAdminTable }