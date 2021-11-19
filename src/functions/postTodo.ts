import { document } from '../utils/dynamodbClient'

interface ICreateTodo {
  id: string
  title: string
  deadline: string
}

export const handle = async (event) => {

  const { id, title, deadline } = JSON.parse(event.body) as ICreateTodo
  const { userid } = event.pathParameters

  const data = {
    id: userid, 
    title, 
    done: false,
    deadline: new Date(deadline).toUTCString().toString(),
    created_at: new Date().toUTCString().toString()
  }

  await document.put({
    TableName: "todo_list",
    Item: data
  }).promise()
  
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "New ToDo Created"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}