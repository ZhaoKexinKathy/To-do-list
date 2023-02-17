const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const jwt = require('jsonwebtoken');
const { request, response } = require('express');
const cors = require('cors');
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors({
  origin: '*'
}));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// User function
app.post('/users/create', db.createUser)
app.post('/users/login', db.authenUser)
// login
app.get('/tasks/:userid', db.getTaskByUserId)
app.post('/tasks/:userid', db.createTask)
app.delete('/tasks/:taskid', db.DeleteTask)

// Admin function
app.get('/users', db.getUsers)
// app.get('/usage/:userid', db.getUsageByUserId)
// app.get('/translation/:userid', db.getTranslation)

app.get('/users/:id', db.getUserById)

app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

const server = app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

const closeServer = () => {
    server.close()
}

module.exports = {app,closeServer};