const pool = require("../models/queries");


// GET ALL USERS
const getAllUsers = (request, response) => {
  pool.query('SELECT * FROM employees ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// // CREATE USER
// const createUser = (request, response) => {
//   const {firstname, lastname, email, password, gender, jobRole, department, address } = request.body; 

//   pool.query('INSERT INTO employees (firstname, lastname, email, password, gender, jobRole, department, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [firstname, lastname, email, password, gender, jobRole, department, address], (error, results) => {
//     if (error) {
//       throw error
//     }
//     pool.query(`SELECT * FROM employees WHERE email='${email}'`, (error, results) => {
//       if(error) {
//         throw error
//       }
//       for (value of results.rows) {
//         // console.log(value.id)
//         var userId = value.id
//         return userId
//       }
//       // console.log(results.rows)
//       response.status(201).json({id: userId})
//     })

//     response.status(201).send(`User added with ID: ${userId}`);
//   })
// }


// GET SINGLE USER
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM employees WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}




// UPDATE USER
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { firstname, lastname, email, password, gender, jobRole, department, address } = request.body

  pool.query(
    'UPDATE employees SET firstname = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}


// DELETE USER
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM employees WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  // createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
}