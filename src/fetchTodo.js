const AWS = require('aws-sdk');

const fetchTodo = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    
    const { id } = event.pathParameters

    let todo;

    try {
        const result = dynamodb.get({ 
            TableName: 'TodoTable',
            Key: { id } 
        }).promise();

        todo = (await result).Item

    } catch(error) {
        console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(todo)
    }
}

module.exports = {
    handler: fetchTodo
}