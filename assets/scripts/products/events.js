'use strict'

const productApi = require('./api')
const productUi = require('./ui.js')
const cartParse = require('../carts/cartParse')
const store = require('../store')

const onGetProducts = function (event) {
  // console.log('Clicked see all products button')
  $('#intro-header, #intro-see-all-products, #intro-about-raindrop, #user-account').hide()
  store.currentProductCategory = 'all'

  productApi.getProducts()
    // store all product objects locally in a hash, where each item obj is
    // accessible by its product ID
    .then(cartParse.setAllProducts)
    .then(productUi.getProductsSuccess)
    .catch(productUi.getProductsFailure)
}

const onGetProductsByCategory = function (event) {
  // console.log('Clicked', this)
  $('#intro-header, #intro-see-all-products, #intro-about-raindrop, #user-account').hide()
  const category = $(this).attr('data-id')
  store.currentProductCategory = category

  productApi.getProductsByCategory(category)
    .then(productUi.getProductsSuccess)
    .catch(productUi.getProductsFailure)
}

const onGetProductDetail = function (event) {
  // console.log('Clicked .product-detail')
  $('#intro-header, #intro-see-all-products, #intro-about-raindrop, #user-account').hide()
  const productId = $(this).attr('data-id')
  // console.log(store.allProducts[productId])
  const itemObject = store.allProducts[productId]
  productUi.getProductDetailSuccess(itemObject)
}

const onSearchProducts = function (event) {
  event.preventDefault()
  const searchEntry = $('#search-products input').val()
  // console.log('searchEntry is ', searchEntry)

  productApi.getProductsBySearchEntry(searchEntry)
    .then(productUi.getProductsSuccess)
    .catch(productUi.getProductsFailure)
}

const onSortByPrice = function (event) {
  event.preventDefault()
  const sortOrder = $(this).attr('data-id')
  // console.log('sortOrder is ', sortOrder)

  productApi.getProductsSortedByPrice(sortOrder, store.currentProductCategory)
    .then(productUi.getProductsSuccess)
    .catch(productUi.getProductsFailure)
}

const productHandlers = () => {
  productApi.getProducts()
    .then(cartParse.setAllProducts)
  $('#see-all-products, #all-products-button').on('click', onGetProducts)
  $('#test-forms-button').click(function () {
    $('.test-form').toggle()
  })
  $('.products-clothing').on('click', onGetProductsByCategory)
  $('.products-electronics').on('click', onGetProductsByCategory)
  $('.products-entertainment').on('click', onGetProductsByCategory)
  $('.products-home-office').on('click', onGetProductsByCategory)
  $('.products-sports-outdoors').on('click', onGetProductsByCategory)
  $('body').on('click', '.product-detail', onGetProductDetail)
  $('body').on('click', '.all-products-breadcrumb', onGetProducts)
  $('body').on('click', '.product-category-breadcrumb', onGetProductsByCategory)
  $('#search-products').on('submit', onSearchProducts)
  $('#sort-price-ascending').on('click', onSortByPrice)
  $('#sort-price-descending').on('click', onSortByPrice)

  $('body').on('mouseover', '.product-tile', function () {
    $(this).stop().animate({ backgroundSize: '130%' }, 100)
  })
  $('body').on('mouseleave', '.product-tile', function () {
    $(this).stop().animate({ backgroundSize: '120%' }, 100)
  })
}

module.exports = {
  productHandlers
}
