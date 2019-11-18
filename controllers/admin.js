const bcrypt = require('bcrypt');
const pool = require("../models/queries");
const jwt = require('jsonwebtoken');


// username = admin@teamwork.com, password = adminWork
const signin = (request, response) => {
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
    // Checking uniqueness of email (if email is present in DB)
    pool.query('SELECT username FROM admin', (error, results) => {
      if (error) {
        throw error
      }
      // console.log(results.rows.find(employee => employee.email == email))      
      const usersUsername = results.rows.find(admin => admin.username == username)
        // console.log(userEmail)
      if (!usersUsername) {
          return response.status(400).json({message: 'username not registered'})
      } 

        pool.query(`SELECT * FROM admin WHERE username='${usersUsername.username}'`, (error, results, next) => {  
          if(error) {
            console.log("error 1")
            return response.status(401).json({message: error})
          }     
          const [message] = results.rows;

          if(message.password !== 'adminWork') {
            return response.status(401).json({
              error: new Error('Incorrect password!')
            });
          }
          
          const token = jwt.sign({ userId: message.id }, 'RANDOM_TOKEN_SECRETKEY', { expiresIn: '24h' });
            response.status(200).json({
              userId: message.id,
              token: token
          });         
      })           
    })
    // bcrypt.compare(password, userPassword).then()
  } else {
    response.status(400).json({
      status: "error",
      error: "Username or Password cannot be blank or less than 6 characters"
    })
  }
}



module.exports = { signin }