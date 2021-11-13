'use strict';

const generateAddress = () => `${Math.round(Math.random() * 10**16)}`

module.exports.handler = async (event) => {
  const { productId, price } = event

  const destinationAddress = generateAddress()

  console.log(`Payment must arrive to address: "${destinationAddress}"`)

  return {
    address: destinationAddress,
    price,
    productId
  };
};
