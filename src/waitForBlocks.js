
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
      taskToken: {
        S: event.taskToken
      },
      price: {
        N: event.input.price
      }
    }
  }).promise()
};
