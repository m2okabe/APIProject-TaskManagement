const taskModel = require('./task.model');
const response = require('../response');
const fdateFnsTimezone = require('date-fns-timezone');
const { validationResult } = require('express-validator/check');

//constant
const FORMAT = 'YYYY-MM-DD HH:mm:ss';
const TIME_ZONE_TOKYO = 'Asia/Tokyo';
const RESULT_STATUS_ERROR = 'ERROR';
const RESULT_MESSAGE_SYSTEM_ERROR = 'system error has occured';
const RESULT_ERROR_TYPE_BUSINESS_ERROR = 'BusinessError';
const RESULT_ERROR_TYPE_SYSTEM_ERROR = 'SystemError';

// utility
const replaceEmptyWithNull = (obj) => {
  for (let i in obj) {
    if (obj[i] === '') {
      obj[i] = null;
    }
  }
  return obj;
};

const convertUtcToJst = (obj) => {
  const dateOfTaskGenerated = new Date(obj.dateOfTaskGenerated);
  obj.dateOfTaskGenerated = fdateFnsTimezone.formatToTimeZone(
    dateOfTaskGenerated,
    FORMAT,
    {
      timeZone: TIME_ZONE_TOKYO,
    }
  );
  let dateOfDeadline;
  if (obj.dateOfDeadline !== null) {
    dateOfDeadline = new Date(obj.dateOfDeadline);
    obj.dateOfDeadline = fdateFnsTimezone.formatToTimeZone(
      dateOfDeadline,
      FORMAT,
      {
        timeZone: TIME_ZONE_TOKYO,
      }
    );
  }
  return obj;
};

const setSystemErrorResponse = (responseObj) => {
  responseObj.result.status = RESULT_STATUS_ERROR;
  responseObj.result.errorType = RESULT_ERROR_TYPE_SYSTEM_ERROR;
  responseObj.result.message = RESULT_MESSAGE_SYSTEM_ERROR;
};

module.exports = {
  //[option] add getAll
  //[option] add querystring
  async getTask(req, res) {
    // response object
    // set initial value
    const responseObj = new response();

    // select task records
    // [option] multiple keys
    let task;
    if (req.query.id === undefined || req.query.id === '') {
      task = await taskModel.getAll();
      // utc→jst
      // set selected data
      const taskConverted = [];
      for (let i = 0; i < task.length; i++) {
        taskConverted.push(convertUtcToJst(task[i]));
      }
      //responseObj.data = task;
      responseObj.data = taskConverted;
      res.status(200);
      res.json(responseObj);
    } else {
      // validation check
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        responseObj.result.status = RESULT_STATUS_ERROR;
        responseObj.result.errorType = RESULT_ERROR_TYPE_BUSINESS_ERROR;
        console.log({ errors: errors.array() });
        responseObj.result.message =
          'ID is required item. Please enter a 1-4 digit number';
        res.status(400);
        res.json(responseObj);
      } else {
        const id = parseInt(req.query.id);
        try {
          task = await taskModel.getById(id);
          // utc→jst
          task = convertUtcToJst(task);
          // set selected data
          responseObj.data = [task];
          res.status(200);
        } catch (e) {
          setSystemErrorResponse(responseObj);
          res.status(500);
        } finally {
          res.json(responseObj);
        }
      }
    }
  },

  async insertOrUpdateTask(req, res) {
    // response object
    // set initial value
    const responseObj = new response();

    // replace empty with null
    req.body = replaceEmptyWithNull(req.body);

    // validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseObj.result.status = RESULT_STATUS_ERROR;
      responseObj.result.errorType = RESULT_ERROR_TYPE_BUSINESS_ERROR;
      console.log({ errors: errors.array() });
      responseObj.result.message =
        'ID is required item. Please enter a 1-4 digit number';
      res.status(400);
      res.json(responseObj);
    } else {
      // refill
      const {
        id,
        taskDescription,
        taskStatus,
        dateOfTaskGenerated,
        dateOfDeadline,
        businessOrPrivateLife,
      } = req.body;
      const payload = {
        id: id,
        task_description: taskDescription,
        task_status: taskStatus,
        date_of_task_generated: dateOfTaskGenerated,
        date_of_deadline: dateOfDeadline,
        business_or_private_life: businessOrPrivateLife,
      };

      // insert or update
      const task = await taskModel.getById(req.body.id);
      if (task === undefined) {
        try {
          await taskModel.insertTask(payload);
          res.status(200);
        } catch (e) {
          setSystemErrorResponse(responseObj);
          res.status(500);
        } finally {
          res.json(responseObj);
        }
      } else {
        // [option] unique check
        try {
          await taskModel.updateTask(req.body.id, payload);
          res.status(200);
        } catch (e) {
          setSystemErrorResponse(responseObj);
          res.status(500);
        } finally {
          res.json(responseObj);
        }
      }
    }
  },

  async deleteTask(req, res) {
    // response object
    // set initial value
    const responseObj = new response();

    // validation check
    if (Number.isNaN(parseInt(req.query.id))) {
      responseObj.result.status = RESULT_STATUS_ERROR;
      responseObj.result.errorType = RESULT_ERROR_TYPE_BUSINESS_ERROR;
      responseObj.result.message = 'specify the ID in numbers';
      res.status(400);
      res.json(responseObj);
    } else {
      // delete task records
      const id = parseInt(req.query.id);
      try {
        await taskModel.deleteTask(id);
        res.status(200);
      } catch (e) {
        setSystemErrorResponse(responseObj);
        res.status(500);
      } finally {
        res.json(responseObj);
      }
    }
  },
};
