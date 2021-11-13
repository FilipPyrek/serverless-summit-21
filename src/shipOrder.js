
'use strict';

const shipProduct = (productId) => console.log(`Shipping: "${productId}"`)

module.exports.handler = async (event) => {
  const { productId, price, address } = event

  shipProduct(productId)

  return {
    status: 'shipped',
    address,
    price,
    productId
  };
};
