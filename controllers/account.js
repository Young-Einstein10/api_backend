const bcrypt = require('bcrypt');
const pool = require("../models/queries");
const jwt = require('jsonwebtoken');


// CREATE USER
const signup = (request, response) => {
  const {firstname, lastname, email, password, gender, jobrole, department, address } = request.body; 

  // Check if valid email and password was entered
  function validateUser(user) {
    const validEmail = typeof user.email == 'string' && user.email.trim() != '';
    const validPassword = typeof user.password == 'string' && 
                          user.password.trim() != '' && 
                          user.password.trim().length >= 6;

    return validEmail && validPassword;
  }  

  if(validateUser(request.body)) {
    // Checking uniqueness of email (if email is present in DB)
    pool.query('SELECT email FROM employees', (error, results) => {
      if (error) {
        throw error
      }
      // console.log(results.rows)
      results.rows.filter((value) => {
        if(email == value.email) {
          return response.status(400).json({
            message: "User email already exists"
          })
        }
        return email;
      })
    })

    // Hashing password and saving in DB
    bcrypt.hash(password, 8).then(
      (hash) => {
        pool.query('INSERT INTO employees (firstname, lastname, email, password, gender, jobrole, department, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [firstname, lastname, email, hash, gender, jobrole, department, address], (error, results) => {
            if (error) {
              throw error
            }
            // console.log(results)
            // const [message] = results.rows;

            pool.query(`SELECT * FROM employees WHERE email='${email}'`, (error, results) => {
              if(error) {
                throw Error
              }
              console.log(results.rows);

              const token = jwt.sign({ userId: results.rows[0].id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });

              return response.status(201).json({
                status: "success",
                data: {
                  message: "User Account successfully created",
                  token,
                  userId: results.rows[0].id                     
                }
              });
            })      
        })
      }
    ).catch((error) => {
      response.status(500).json({
        status: "error",
        error: error
      })
    })    
  } else {
    response.status(400).json({
      status: "error",
      error: "Email or Password cannot be blank or less than 6 characters"
    })
  }  
}

const signin = (request, response) => {
  const { email, password } = request.body;

  // Check if valid email and password was entered
  function validateUser(user) {
    const validEmail = typeof user.email == 'string' && user.email.trim() != '';
    const validPassword = typeof user.password == 'string' && 
                          user.password.trim() != '' && 
                          user.password.trim().length >= 6;

    return validEmail && validPassword;
  }  

  if (validateUser(request.body)) {
    // Checking uniqueness of email (if email is present in DB)
    pool.query('SELECT email FROM employees', (error, results) => {
      if (error) {
        throw error
      }
      // console.log(results.rows.find(employee => employee.email == email))      
      const userEmail = results.rows.find(employee => employee.email == email)
        // console.log(userEmail)
      if (!userEmail) {
          return response.status(400).json({message: 'email not registered'})
      } 

        pool.query(`SELECT * FROM employees WHERE email='${userEmail.email}'`, (error, results, next) => {  
          if(error) {
            return response.status(401).json({message: error})
          }     
          const [message] = results.rows;
   
          bcrypt.compare(request.body.password, message.password).then(
            (valid) => {
              if (!valid) {
                return response.status(401).json({
                  error: new Error('Incorrect password!')
                });
              }
              const token = jwt.sign({ userId: message.id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
              response.status(200).json({
                userId: message.id,
                token: token
              });
            }
          ).catch((error) => {
            response.status(500).json({
              error: next(new Error(error))
            });
          })

          // return response.status(201).json({
          //   message: results.rows                       
          // })

        })           
    })
    // bcrypt.compare(password, userPassword).then()
  } else {
    response.status(400).json({
      status: "error",
      error: "Email or Password cannot be blank or less than 6 characters"
    })
  }
}


module.exports = { signup, signin }