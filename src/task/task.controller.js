const taskModel = require('./task.model');
const response = require('../response');
const fdateFnsTimezone = require('date-fns-timezone');

const FORMAT = 'YYYY-MM-DD HH:mm:ss';
const TIME_ZONE_TOKYO = 'Asia/Tokyo';
// [option] replaceNullWithEmpty array/obj
// const replaceNullWithEmpty = (obj) => {
//   for (let i in obj) {
//     if (obj[i] === null) {
//       obj[i] = '';
//     }
//   }
//   return obj;
// };

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

module.exports = {
  //[option] add getAll
  //[option] add querystring
  async getTask(req, res) {
    // response object
    // set initial value
    const responseObj = new response();

    // [option] validation check

    // select task records
    // [option] multiple keys
    let task;
    if (req.query.id === undefined) {
      task = await taskModel.getAll();
      // utc→jst
      // set selected data
      const taskConverted = [];
      for (let i = 0; i < task.length; i++) {
        taskConverted.push(convertUtcToJst(task[i]));
      }
      //responseObj.data = task;
      responseObj.data = taskConverted;
    } else {
      const id = parseInt(req.query.id);
      task = await taskModel.getById(id);
      // utc→jst
      task = convertUtcToJst(task);
      // set selected data
      responseObj.data = [task];
    }

    // set response
    res.json(responseObj);
  },

  async insertOrUpdateTask(req, res) {
    // [option] validation check

    // response object
    // set initial value
    const responseObj = new response();

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
      await taskModel.insertTask(payload);
    } else {
      // [option] unique check
      await taskModel.updateTask(req.body.id, payload);
    }

    // set response
    res.json(responseObj);
  },

  async deleteTask(req, res) {
    // response object
    // set initial value
    const responseObj = new response();

    // [option] validation check

    // delete task records
    const id = parseInt(req.query.id);
    await taskModel.deleteTask(id);

    // set response
    res.json(responseObj);
  },
};
