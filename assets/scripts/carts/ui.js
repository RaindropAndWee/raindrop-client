'use strict'

const store = require('../store')

const showActiveCartTemplate = require('../templates/active-cart-listing.handlebars')

const getActiveCartSuccess = function () {
  const showActiveCart = showActiveCartTemplate({ cartProducts: store.activeCart.cartProducts })
  $('#active-cart-content').html(showActiveCart)
  $('#active-cart-total').html(`<h2>Total: ${store.activeCart.total}</h2>`)
}

const getActiveCartFailure = function (error) {
  console.log('Failed to get active cart')
  console.log(error)
}

const getCartsSuccess = function (data) {
  console.log('retrieved carts data is: ', data)
}

const getCartsFailure = function (error) {
  console.log('Failed to get all carts')
  console.log(error)
}

const getOneCartSuccess = function (data) {
  console.log('retrieved cart data is: ', data)
}

const getOneCartFailure = function (error) {
  console.log('Failed to get one cart')
  console.log(error)
}

const createCartSuccess = function (data) {
  console.log('created cart data is: ', data)
}

const createCartFailure = function (error) {
  console.log('Failed to create a cart')
  console.log(error)
}

const updateCartSuccess = function (data) {
  console.log('Successfully updated cart')
}

const updateCartFailure = function (error) {
  console.log('Failed to update a cart')
  console.log(error)
}

const addToCartSuccess = function (data) {
  console.log('Added product cart')
}

const addToCartFailure = function (error) {
  console.log('Failed to add product to cart')
  console.log(error)
}

const deleteCartSuccess = function (data) {
  console.log('Successfully deleted cart')
}

const deleteCartFailure = function (error) {
  console.log('Failed to delete a cart')
  console.log(error)
}

module.exports = {

  getActiveCartSuccess,
  getActiveCartFailure,
  getCartsSuccess,
  getCartsFailure,
  getOneCartSuccess,
  getOneCartFailure,
  createCartSuccess,
  createCartFailure,
  updateCartSuccess,
  updateCartFailure,
  addToCartSuccess,
  addToCartFailure,
  deleteCartSuccess,
  deleteCartFailure
}
