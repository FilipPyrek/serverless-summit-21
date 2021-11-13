
'use strict';

const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB()

module.exports.handler = async (event) => {
  await dynamoDb.putItem({
    TableName: process.env.PENDING_TRANSACTIONS_TABLE,
    Item: {
      address: {
        S: event.input.address
      },
      price: {
        N: event.input.price
      },
      productId: {
        S: event.input.productId
      },
      taskToken: {
        S: event.taskToken
      },
    }
  }).promise()
};
