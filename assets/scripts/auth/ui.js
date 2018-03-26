'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  $('#sign-up-modal').modal('hide')
  $('#sign-up').get(0).reset()
  console.log('Sign Up Success')
}

const signUpFailure = function () {
  $('#sign-up').get(0).reset()
  console.log('Sign Up Error')
}

const signInSuccess = function (data) {
  store.user = data.user
  console.log('User data is: ', data.user)
  $('#sign-in').get(0).reset()
  console.log('Sign In Success')
}

const signInFailure = function (error) {
  $('#sign-in').get(0).reset()
  console.error(error)
  console.log('Sign In Error')
}

const changePasswordSuccess = function (data) {
  $('#change-password-modal').modal('hide')
  $('#change-password').get(0).reset()
  console.log('Change Password Success')
}

const changePasswordFailure = function () {
  $('#change-password').get(0).reset()
  console.log('Change Password Error')
}

const signOutSuccess = function (data) {
  console.log('Sign Out Success')
}

const signOutFailure = function () {
  console.log('Sign Out Error')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
