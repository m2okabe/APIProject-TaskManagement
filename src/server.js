const taskController = require('./task/task.controller');
const express = require('express');
const bodyParser = require('body-parser');

const setupServer = () => {
  // express setting
  const app = express();
  app.use(express.json());
  app.use(express.static('web'));

  // needed to receive request body of post api
  app.use(bodyParser.urlencoded({ extended: true }));

  // POST API
  app.post('/api/taskManagement/tasks', taskController.insertOrUpdateTask);

  // GET API
  app.get('/api/taskManagement/tasks', taskController.getTask);

  // DELETE delete
  app.delete('/api/taskManagement/tasks', taskController.deleteTask);

  return app;
};

module.exports = { setupServer };
