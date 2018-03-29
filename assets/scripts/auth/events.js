'use strict'

const api = require('./api')
const cartApi = require('../carts/api')
const productApi = require('../products/api')
const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')
const cartParse = require('../carts/cartParse')

const onSignUp = function (event) {
  event.preventDefault()

  const data = getFormFields(this)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()

  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .then(productApi.getProducts)
    .then(cartParse.setAllProducts)
    .then(cartApi.getCarts)
    .then(cartParse.setAllLocalCarts)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()

  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()

  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onGetAccount = function (event) {
  // console.log('hey')
  $('#user-account').show()
  $('#all-products-content, #intro-header, #intro-see-all-products, #intro-about-raindrop').hide()
}

const onBackHome = function (event) {
  // console.log('hey')
  $('#intro-header, #intro-see-all-products, #intro-about-raindrop').show()
  $('#all-products-content').hide()
  $('#product-detail-content').hide()
  $('#user-account').hide()
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#account-menu').on('click', onGetAccount)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out-menu').on('click', onSignOut)
  $('#back-home').on('click', onBackHome)
  $('.sign-in-to-buy').on('click', function () {
    $('#sign-in-modal').modal('toggle')
  })
}

module.exports = {
  addHandlers
}
