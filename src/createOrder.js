'use strict';

const AWS = require('aws-sdk')

const stepFunctions = new AWS.StepFunctions()

const getPrice = (productId) => `${Math.round(Math.random() * 100) / 100}`

module.exports.handler = async (event) => {
  const { productId } = JSON.parse(event.body)

  await stepFunctions.startExecution({
    stateMachineArn: process.env.PROCESS_ORDER_SM,
    input: JSON.stringify({
      productId,
      price: getPrice(productId)
    })
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Order created'
      }
    ),
  };
};
