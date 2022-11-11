const taskModel = require('./task.model');
const response = require('../response');
// [option] replaceNullWithEmpty array/obj
// const replaceNullWithEmpty = (obj) => {
//   for (let i in obj) {
//     if (obj[i] === null) {
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
    const responseObj = new response();

    // [option] validation check

    // select task records
    // get query string
    // [option] multiple keys

    let task;
    if (req.query.id === undefined) {
      task = await taskModel.getAll();
      responseObj.data = task;
    } else {
      const id = parseInt(req.query.id);
      task = await taskModel.getById(id);
      responseObj.data = [task];
    }

    // set response
    // set selected data
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
    // get query string
    const id = parseInt(req.query.id);
    await taskModel.deleteTask(id);

    // set response
    res.json(responseObj);
  },
};
