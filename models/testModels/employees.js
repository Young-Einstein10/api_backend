// const pool = require('../testDB');
const pool = require('../queries');


/**
 * Create Employees Tables
 */
const createEmployeeTable = () => {
  const queryText =
      `CREATE TABLE IF NOT EXISTS employees
		(
		    address text COLLATE pg_catalog."default" NOT NULL,
		    department text COLLATE pg_catalog."default" NOT NULL,
		    email text COLLATE pg_catalog."default" NOT NULL,
		    firstname text COLLATE pg_catalog."default" NOT NULL,
		    gender text COLLATE pg_catalog."default" NOT NULL,
		    id SERIAL,
        is_admin boolean NOT NULL DEFAULT false,
		    jobrole text COLLATE pg_catalog."default" NOT NULL,
		    lastname text COLLATE pg_catalog."default" NOT NULL,
		    password text COLLATE pg_catalog."default" NOT NULL,
		    CONSTRAINT employees_pkey PRIMARY KEY (id),
		    CONSTRAINT "employeeid" UNIQUE (id)

		)`;

  pool.query(queryText)
    .then(() => {
      console.log('Employees Table Created');
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      // pool.end();
    });
};

/**
 * Drop Employees Tables
 */
const dropEmployeeTable = () => {
  const queryText = 'DROP TABLE IF EXISTS employees';
  pool.query(queryText)
    .then((res) => {
      console.log('Table dropped');
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      // pool.end();
    });
};

// createEmployeeTable();
// dropEmployeeTable();

module.exports = { createEmployeeTable, dropEmployeeTable }