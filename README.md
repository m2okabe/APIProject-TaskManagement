# ToDo Management App

## how start this app

`npm i`
<br/>
`npm run start`
<br/>
open browser and navigate to `localhost:3000`
<br/>
<br/>

## request / response

### GET Request - get all tasks

- GET /api/taskManagement/tasks

### GET Response - get all tasks

```json
{
  "result": {
    "status": "SUCCESS",
    "errorType": "",
    "message": "succeeded"
  },
  "data": [
    {
      "id": 1,
      "taskDescription": "answer survey",
      "taskStatus": "working",
      "dateOfTaskGenerated": "2022-10-12",
      "dateOfDeadline": "2022-10-22",
      "businessOrPrivateLife": "business"
    },
    {
      "id": 2,
      "taskDescription": "review API test ducument",
      "taskStatus": "waiting",
      "dateOfTaskGenerated": "2022-10-14",
      "dateOfDeadline": "2022-10-24",
      "businessOrPrivateLife": "business"
    }
  ]
}
```

<br/>

### GET Request - ID selection

- GET /api/taskManagement/tasks
  - ?id=1

### GET Response - ID selection

```json
{
  "result": {
    "status": "SUCCESS",
    "errorType": "",
    "message": "succeeded"
  },
  "data": [
    {
      "id": 1,
      "taskDescription": "answer survey",
      "taskStatus": "working",
      "dateOfTaskGenerated": "2022-10-12",
      "dateOfDeadline": "2022-10-22",
      "businessOrPrivateLife": "business"
    }
  ]
}
```

<br/>

### POST Request

- POST /api/taskManagement/tasks
- RequestBody

```json
{
  "id": 5,
  "taskDescription": "descriptionTest5",
  "taskStatus": "waiting",
  "dateOfTaskGenerated": "2022-10-05",
  "dateOfDeadline": "2022-10-15",
  "businessOrPrivateLife": "private"
}
```

### POST Response

```json
{
  "result": {
    "status": "SUCCESS",
    "errorType": "",
    "message": "succeeded"
  },
  "data": {}
}
```

<br/>

### DELETE Request

- DELETE /api/taskManagement/tasks
- QueryString
  - ?id=1

### DELETE Response

```json
{
  "result": {
    "status": "SUCCESS",
    "errorType": "",
    "message": "succeeded"
  },
  "data": {}
}
```

<br/>

### HTTP status variations

```
200：succeeded
400：BusinessError occurred
500：SystemError occurred
```

<br/>

### ErrorType variations

```
""：succeeded
"BusinessError"：BusinessError occurred
"SystemError"：SystemError occurred
```

<br/>

## table defenition

| id  | task_description | task_status | date_of_task_generated | date_of_deadline | business_or_private_life |
| --- | ---------------- | ----------- | ---------------------- | ---------------- | ------------------------ |
| 1   |                  |             |                        |                  |                          |
| 2   |                  |             |                        |                  |                          |
