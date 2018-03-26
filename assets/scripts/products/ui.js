'use strict'

const showProductsTemplate = require('../templates/product-listing.handlebars')

const getProductsSuccess = function (data) {
  console.log(data)
  const showProducts = showProductsTemplate({ products: data.products })
  $('#all-products-content').html(showProducts)
}

const getProductsFailure = function () {
  console.log('Failed to get all products')
}

const getCartsSuccess = function (data) {
  console.log('cart data is: ', data)
}

const getCartsFailure = function () {
  console.log('Failed to get all products')
}

const getOneCartSuccess = function (data) {
  console.log('cart data is: ', data)
}

const getOneCartFailure = function () {
  console.log('Failed to get all products')
}

module.exports = {
  getProductsSuccess,
  getProductsFailure,
  getCartsSuccess,
  getCartsFailure,
  getOneCartSuccess,
  getOneCartFailure
}
