## リクエスト/レスポンス

<br/>

### POST Request

- POST /api/taskManagement/tasks
- RequestBody

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

### GET Request

- GET /api/taskManagement/tasks
- QueryString
  - ?id=1&&task=survey

### GET Response

```json
{
  "result": {
    "status": "SUCCESS",
    "errorType": "",
    "message": "succeeded"
  },
  "data": [
    {
      "id": "12",
      "taskDescription": "answer survey",
      "taskStatus": "working",
      "dateOfTaskGenerated": "2022-10-12",
      "dateOfDeadline": "2022-10-22",
      "businessOrPrivateLife": "business"
    },
    {
      "id": "14",
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

HTTP ステータス バリエーション

```
200：正常終了時
400：業務例外発生時
500：システム例外発生時
```

<br/>

errorType バリエーション

```
""：正常終了時
"BusinessError"：業務例外発生時
"SystemError"：システム例外発生時
```

<br/>

## テーブル定義

| id  | task_description | task_status | date_of_task_generated   | date_of_deadline   | business_or_private_life |
| --- | ---------------- | ----------- | ------------------------ | ------------------ | ------------------------ |
| 1   | タスク内容       | タスク状況  | タスク発生タイムスタンプ | 期限タイムスタンプ | business                 |
| 2   | タスク内容       | タスク状況  | タスク発生タイムスタンプ | 期限タイムスタンプ | private                  |

task_status バリエーション
「着手」＝　 working
「未着手」＝ waiting
「完了」＝ completed
「中止」＝ discontinued
「保留」＝ pending
