const taskController = require('./task/task.controller');
const express = require('express');
const setupServer = () => {
  // express setting
  const app = express();
  app.use(express.json());

  // response object
  // set initial value
  // [option] commonize
  const responseObj = {
    result: {
      status: 'SUCCESS',
      errorType: '',
      message: 'succeeded',
    },
    data: {},
  };

  // POST API
  app.post('/api/taskManagement/tasks', taskController.insertOrUpdateTask);

  // GET API
  app.get('/api/taskManagement/tasks', taskController.getTask);

  // DELETE delete
  app.delete('/api/taskManagement/tasks', taskController.deleteTask);

  return app;
};

module.exports = { setupServer };
