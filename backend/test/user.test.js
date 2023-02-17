const {app, closeServer} = require('../src/index')
const {closePool} = require('../src/queries')
const request = require('supertest');
require('dotenv').config({path: __dirname + '/.env.test'});
process.env.NODE_ENV = 'test';
// console.log(process.env.DB_DATABASE)


describe('GET /', () => {
  it('responds with Hello World', async () => {
    const response = await request(app).get('/');
    expect(response.text).toEqual('{\"info\":\"Node.js, Express, and Postgres API\"}');
  });
});


describe('User Create, login and logout', () => {
    it('create a user', async () => {
      const response = await request(app).post('/users/create').send({
            name: 'Gordon',
            email: 'Gordon@email.com',
            password: '123456'
        });
      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty('id')
    });
/*
    user with the same email can't create
    check the new user exist after create
*/
});


describe('Task Create and Delete', () => {
    // Creat a Task
    it('allow to create a task', async () => {
      const response = await request(app).post('/tasks/1').send({
        task: 'do the laundry'
      })
      expect(response.body).toHaveProperty('taskid')
    });

    // Show users Task
    it('allow to create a task', async () => {
      const response = await request(app).get('/tasks/1');
      expect(response.body[0]).toHaveProperty('task', 'taskid', 'userid')
    });

    // Create more tasks
    it('allow to create a task', async () => {
      const response = await request(app).post('/tasks/1').send({
        task: 'go to clinic'
      })
      expect(response.body).toHaveProperty('taskid')
    });

    it('allow to create a task', async () => {
      const response = await request(app).post('/tasks/1').send({
        task: 'go shopping'
      })
      expect(response.body).toHaveProperty('taskid')
    });

    // Show users Tasks
    it('allow to create a task', async () => {
      const response = await request(app).get('/tasks/1');
      expect(response.body[0]).toHaveProperty('task', 'taskid', 'userid')
    });
});



afterAll(() => {
    closeServer();
    closePool();
})
