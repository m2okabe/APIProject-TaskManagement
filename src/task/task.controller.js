const taskModel = require('./task.model');

// [option] replaceNullWithEmpty array/obj
// const replaceNullWithEmpty = (obj) => {
//   for (let i in obj) {
//     if (obj[i] === null) {
//       console.log(obj[i]);
//       obj[i] = '';
//     }
//   }
//   return obj;
// };

module.exports = {
  //[option] add getAll
  //[option] add querystring
  async getTask(req, res) {
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

    // [option] validation check

    // select task records
    // get query string
    // [option] multiple keys, get all
    const id = parseInt(req.query.id);
    const task = await taskModel.getById(id);

    // set response
    // set selected data
    responseObj.data = [task];
    res.json(responseObj);
  },

  async insertOrUpdateTask(req, res) {
    // [option] validation check

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
      await taskModel.updateTask(req.body.id, payload);
    }

    // set response
    res.json(responseObj);
  },
};
