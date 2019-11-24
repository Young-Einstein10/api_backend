const bcrypt = require('bcrypt');
const pool = require("../models/queries");
const jwt = require('jsonwebtoken');


// username = admin@teamwork.com, password = adminWork
const adminSignin = (request, response) => {
	const { username, password } = request.body;

  // Check if valid username and password was entered
  function validateUser(user) {
    const validUsername = typeof user.username == 'string' && user.username.trim() != '';
    const validPassword = typeof user.password == 'string' && 
                          user.password.trim() != '' && 
                          user.password.trim().length >= 6;

    return validUsername && validPassword;
  }

  if (validateUser(request.body)) {
    pool.query('SELECT * FROM admin WHERE username=$1', [username], (error, results) => {  
          if(error) {
            return response.status(401).json({status: "error", error})
          }     

          if(results.rows[0].password !== 'adminWork') {
            return response.status(401).json({
              status: 'error',
              error: new Error('Incorrect password!')
            });
          }
          
    const token = jwt.sign({ userId: results.rows[0].id, isAdmin: results.rows[0].isadmin }, 'ADMIN_TOKEN_SECRETKEY', { expiresIn: '24h' });
      response.status(200).json({
        userId: results.rows[0].id,
        token: token
      });              
    })       
     
    // bcrypt.compare(password, userPassword).then()
  } else {
    response.status(400).json({
      status: "error",
      error: "Username or Password cannot be blank or less than 6 characters"
    })
  }
}



module.exports = { adminSignin }