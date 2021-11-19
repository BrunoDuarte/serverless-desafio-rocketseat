import { APIGatewayProxyHandler } from 'aws-lambda'
import { document } from '../utils/dynamodbClient'

export const handle: APIGatewayProxyHandler = async (event) => {

  const { userid } = event.pathParameters

  const response = await document.query({
    TableName: 'todo_list',
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": userid
    }
  }).promise()

  console.log(response.Items[0])

  return {
    statusCode: 201,
    body: JSON.stringify(response.Items[0]),
    headers: {
      "Content-Type": "application/json"
    }
  }
}