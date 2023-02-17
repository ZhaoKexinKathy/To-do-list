const { response } = require('express')
const dotenv = require('dotenv');

dotenv.config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const authenUser = (request, response) => {
  console.log("authen")
  const {email, password} = request.body
  pool.query('SELECT * FROM users WHERE email=$1', [email], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      response.status(400).send({error: "User doesn't exist"})
    } else if (results.rows.length !== 1) {
      response.status(400).send({error: "Server error"})
    } else if(results.rows[0].password === password) {
      response.status(200).json({token: "user token"})
    } else {
      response.status(400).send({error: "Email and password doesn't match"})
    }
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTaskByUserId = (request, response) => {
  console.log("get")
    const id = parseInt(request.params.userid)
  
    pool.query('SELECT * FROM tasks WHERE userid = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const DeleteTask = (request, response) => {
const id = parseInt(request.params.taskid)

pool.query('DELETE FROM tasks WHERE id = $1', [id], (error, results) => {
    if (error) {
    throw error
    }
    response.status(200).json(results.rows)
})
}

const createUser = (request, response) => {
  const { username, email, password } = request.body

  pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rows.length > 0) {
      return response.status(400).send({error:'User with the email address exist'});
    } else {
        pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id', [username, email, password], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).json({id: results.rows[0].id})
      })
    }
    })


}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const createTask = (request, response) => {
    // const userid = parseInt(request.params.userid)
    const userid = 1
    const {task} = request.body
    const done = false
    pool.query('INSERT INTO tasks (userid, task, done) VALUES ($1, $2, $3) RETURNING id', [userid, task, done], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).json({taskid: results.rows[0].id})
      })
}

const closePool = () => {
    pool.end();
}

module.exports = {
  createTask,
  getUsers,
  authenUser,
  getUserById,
  getTaskByUserId,
  DeleteTask,
  createUser,
  updateUser,
  deleteUser,
  closePool
}

