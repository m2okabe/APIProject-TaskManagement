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
    console.log(responseObj);
    res.json(responseObj);
  },
};
