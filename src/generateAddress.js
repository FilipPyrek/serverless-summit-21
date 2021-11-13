'use strict';

const generateAddress = () => `${Math.round(Math.random() * 10**16)}`

module.exports.handler = async (event) => {
  const { productId, price } = event

  console.log(`Ordering product: "${productId}"`)

  return {
    address: generateAddress(),
    price,
    productId
  };
};
