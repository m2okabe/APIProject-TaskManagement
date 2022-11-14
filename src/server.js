const taskController = require('./task/task.controller');
const express = require('express');
const bodyParser = require('body-parser');
const { check } = require('express-validator/check');

const setupServer = () => {
  // express setting
  const app = express();
  app.use(express.json());
  app.use(express.static('web'));

  // needed to receive request body of post api
  app.use(bodyParser.urlencoded({ extended: true }));

  // POST API
  app.post(
    '/api/taskManagement/tasks',
    [check('id').isLength({ min: 1, max: 4 }).isNumeric().exists()],
    taskController.insertOrUpdateTask
  );

  // GET API
  app.get(
    '/api/taskManagement/tasks',
    [check('id').isLength({ min: 1, max: 4 }).isNumeric().exists()],
    taskController.getTask
  );

  // DELETE delete
  app.delete('/api/taskManagement/tasks', taskController.deleteTask);

  return app;
};

module.exports = { setupServer };
