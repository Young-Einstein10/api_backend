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


// GET SINGLE USER
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM employees WHERE id = $1', [id], (error, results) => {
    if (error) {
      return response.status(500).json({
        status: "error",
        error
      })
    }
    response.status(200).json({status: "success", data: results.rows})
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
        return response.status(500).json({
          status: "error",
          error
        })
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
      return response.status(500).json({
        status: "error",
        error
      })
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