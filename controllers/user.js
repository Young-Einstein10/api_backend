const pool = require("../models/queries");


// GET ALL USERS
const getAllUsers = (request, response) => {
  pool.query('SELECT * FROM employees ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({
      status: "success",
      data: results.rows[0]
    })
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
    response.status(200).json({status: "success", data: results.rows[0]})
  })
}


// UPDATE USER
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { firstname, lastname, email, password, gender, jobrole, department, address } = request.body

  pool.query(
    `UPDATE employees SET firstname = $1, lastname = $2, email = $3, password = $4, gender = $5, jobrole = $6, department = $7, address = $8 WHERE id = ${id}`,
    [firstname, lastname, email, password, gender, jobrole, department, address],
    (error, results) => {
      if (error) {
        console.error(error)
        return response.status(500).json({
          status: "error",
          error
        })
      }
      response.status(200).json({
        status: "success",
        message: `user successfully updated with ${id}`
      })
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
    response.status(200).json({
      status: "success",
      message: `user successfully deleted with ${id}`
    })
  })
}

module.exports = {
  // createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
}