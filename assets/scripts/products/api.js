'use strict'

const config = require('../config')

const getProducts = function () {
  return $.ajax({
    url: config.apiUrl + '/products/',
    method: 'GET',
    headers: {
      contentType: 'application/json'
    }
  })
}

const getProductsByCategory = function (category) {
  return $.ajax({
    url: config.apiUrl + '/products?category=' + category,
    method: 'GET',
    headers: {
      contentType: 'application/json'
    }
  })
}

const getProductsBySearchEntry = function (searchEntry) {
  return $.ajax({
    url: config.apiUrl + '/products?search=true&searchEntry=' + searchEntry,
    method: 'GET',
    headers: {
      contentType: 'application/json'
    }
  })
}

const getProductsSortedByPrice = function (sortOrder, currentProductCategory) {
  return $.ajax({
    url: config.apiUrl + '/products?sortPrice=true&order=' + sortOrder + '&category=' + currentProductCategory,
    method: 'GET',
    headers: {
      contentType: 'application/json'
    }
  })
}

module.exports = {
  getProducts,
  getProductsByCategory,
  getProductsBySearchEntry,
  getProductsSortedByPrice
}
