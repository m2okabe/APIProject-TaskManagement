const pokeData = require('./data');
const express = require('express');
const setupServer = () => {
  // express setting
  const app = express();
  app.use(express.json());

  // response object
  // set initial value
  const responseObj = {
    result: {
      status: 'SUCCESS',
      errorType: '',
      message: 'succeeded',
    },
    data: {},
  };

  // POST API
  app.post('/api/taskManagement/tasks', (req, res) => {
    // [option] validation check

    // insert or update 1task record
    // get reqest body

    // set response
    res.json(responseObj);
  });

  // GET API
  app.get('/api/taskManagement/tasks', (req, res) => {
    // [option] validation check

    // select task records
    // delete task records

    // set response
    // set selected data
    res.json(responseObj);
  });

  // DELETE delete
  app.delete('/api/taskManagement/tasks', (req, res) => {
    // [option] validation check

    // delete task records
    // get query string

    // set response
    res.json(responseObj);
  });

  return app;
};

module.exports = { setupServer };
