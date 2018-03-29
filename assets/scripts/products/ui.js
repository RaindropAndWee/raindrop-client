'use strict'

const showProductsTemplate = require('../templates/product-listing.handlebars')
const showProductDetailTemplate = require('../templates/product-detail.handlebars')
const toast = require('../templates/toast.js')
const store = require('../store')

const getProductsSuccess = function (data) {
  // console.log(data)
  $('#intro-header, #intro-see-all-products, #intro-about-raindrop').hide()
  $('#product-detail-content').html('')
  $('#all-products-content').show()
  if (data.products.length === 0) {
    $('#all-products-content').html('<div class="text-center"><br><br>No Products Match Your Search</div>')
  } else {
    const showProducts = showProductsTemplate({ products: data.products })
    $('#all-products-content').html(showProducts)
    if (store.signedIn === false) {
      $('.add-to-cart-button').hide()
    } else if (store.signedIn === true) {
      $('.sign-in-to-buy').hide()
    }
  }
  $('#search-products input').val('')
}

const getProductsFailure = function () {
  toast.failure('Server connection error. Please try again later.')
  // console.log('Failed to get all products')
  $('#search-products input').val('')
}

const getProductDetailSuccess = function (productObj) {
  // console.log('let\'s show detils for...', productObj)
  $('#product-detail-content').show()
  const showProduct = showProductDetailTemplate({ product: productObj })
  $('#product-detail-content').html(showProduct)
  if (store.signedIn === false) {
    $('.add-to-cart-button').hide()
  } else if (store.signedIn === true) {
    $('.sign-in-to-buy').hide()
  }
}

const getProductDetailFailure = function () {
  toast.failure('Server connection error. Please try again later.')
  // console.log('Failed to get product details')
}

module.exports = {
  getProductsSuccess,
  getProductsFailure,
  getProductDetailSuccess,
  getProductDetailFailure
}
