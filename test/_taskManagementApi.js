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

  const dataTaskId1 = [
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

  // it(`POST /api/taskManagement/tasks return result obj`, async () => {
  //   const res = await request.get('/api/taskManagement/tasks');
  //   JSON.parse(res.text).result.should.deep.equal(responseResultSucceeded);
  // });

  // TEST GET API
  it(`GET /api/taskManagement/tasks?id=1 return result obj`, async () => {
    const res = await request.get('/api/taskManagement/tasks').query({ id: 1 });
    JSON.parse(res.text).result.should.deep.equal(responseResultSucceeded);
  });
  it(`GET /api/taskManagement/tasks?id=1 return data`, async () => {
    const res = await request.get('/api/taskManagement/tasks').query({ id: 1 });
    JSON.parse(res.text).data.should.deep.equal(dataTaskId1);
  });

  // it(`DELETE /api/taskManagement/tasks return result obj`, async () => {
  //   const res = await request.get('/api/taskManagement/tasks');
  //   JSON.parse(res.text).result.should.deep.equal(responseResultSucceeded);
  // });
});
