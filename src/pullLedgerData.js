'use strict';

const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const stepFunctions = new AWS.StepFunctions()

module.exports.handler = async (event) => {
  console.log('Pulling ledger data...')
  const { Items: blocks = [] } = await dynamoDb.scan({
    TableName: process.env.BITCOIN_LEDGER,
  }).promise()

  for(const block of blocks) {
    console.log('Processing block...')

    for(const transaction of block.transactions) {
      const { Item: pendingTransaction } = await dynamoDb.get({
        TableName: process.env.PENDING_TRANSACTIONS_TABLE,
        Key: {
          address: transaction.destination
        }
      }).promise()

      if (pendingTransaction && pendingTransaction.price === transaction.amount) {
        console.log('Transaction found...')
        
        await stepFunctions.sendTaskSuccess({
          taskToken: pendingTransaction.taskToken,
          output: JSON.stringify({
            price: pendingTransaction.price,
            address: pendingTransaction.address,
            productId: pendingTransaction.productId
          })
        }).promise()

        await dynamoDb.delete({
          TableName: process.env.PENDING_TRANSACTIONS_TABLE,
          Key: {
            address: pendingTransaction.address
          }
        }).promise()

        console.log('Transaction processed...')
      }
    }

    await dynamoDb.delete({
      TableName: process.env.BITCOIN_LEDGER,
      Key: {
        blockHash: block.blockHash
      }
    }).promise()
    console.log('Block processed...')
  }
};
