const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { setupServer } = require('../src/server');
//this enables us to use .should assertions instead of expecct. Personal Preference
chai.should();

/*
 * This sprint you will have to create all tests yourself, TDD style.
 * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
 * The same kind of structure that you encountered in lecture.express will be provided here.
 */
const server = setupServer();

describe('TaskManagement API Server', () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  const responseResultSucceeded = {
    status: 'SUCCESS',
    errorType: '',
    message: 'succeeded',
  };

  const expectDataTask1 = [
    {
      id: 1,
      taskDescription: 'descriptionTest1',
      taskStatus: 'completed',
      // [option] remove timezone, change UTC→JST
      dateOfTaskGenerated: '2022-09-30T15:00:00.000Z',
      // [option] replace null with empty
      dateOfDeadline: null,
      businessOrPrivateLife: 'business',
    },
  ];

  const expectDataTask4 = [
    {
      id: 4,
      taskDescription: 'descriptionTest4',
      taskStatus: 'waiting',
      // [option] remove timezone, change UTC→JST
      dateOfTaskGenerated: '2022-10-33T15:00:00.000Z',
      // [option] replace null with empty
      dateOfDeadline: null,
      businessOrPrivateLife: 'private',
    },
  ];

  const dataTaskId4 = {
    id: 4,
    taskDescription: 'descriptionTest4',
    taskStatus: 'waiting',
    // [option] remove timezone, change UTC→JST
    dateOfTaskGenerated: '2022-10-04',
    // [option] replace null with empty
    dateOfDeadline: null,
    businessOrPrivateLife: 'private',
  };

  const dataTaskId4Update = {
    id: 4,
    taskDescription: 'descriptionTest4Update',
    taskStatus: 'completed',
    // [option] remove timezone, change UTC→JST
    dateOfTaskGenerated: '2022-10-04',
    // [option] replace null with empty
    dateOfDeadline: null,
    businessOrPrivateLife: 'private',
  };

  const emptyObj = {};

  // TEST POST API INSERT
  // [option] confirm table data
  it(`POST /api/taskManagement/tasks return result and empty data`, async () => {
    const res = await request
      .post('/api/taskManagement/tasks')
      .send(dataTaskId4);
    JSON.parse(res.text).result.should.deep.equal(responseResultSucceeded);
    JSON.parse(res.text).data.should.deep.equal(emptyObj);
  });

  // TEST POST API UPDATE
  // [option] confirm table data
  it(`POST /api/taskManagement/tasks return result and empty data`, async () => {
    const res = await request
      .post('/api/taskManagement/tasks')
      .send(dataTaskId4Update);
    JSON.parse(res.text).result.should.deep.equal(responseResultSucceeded);
    JSON.parse(res.text).data.should.deep.equal(emptyObj);
  });

  // TEST GET API
  it(`GET /api/taskManagement/tasks?id=1 return result obj and data`, async () => {
    const res = await request.get('/api/taskManagement/tasks').query({ id: 1 });
    JSON.parse(res.text).result.should.deep.equal(responseResultSucceeded);
    JSON.parse(res.text).data.should.deep.equal(expectDataTask1);
  });

  it(`DELETE /api/taskManagement/tasks return result obj`, async () => {
    const res = await request.get('/api/taskManagement/tasks');
    JSON.parse(res.text).result.should.deep.equal(responseResultSucceeded);
  });
});
