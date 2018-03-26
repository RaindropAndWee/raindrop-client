'use strict'
/* global StripeCheckout */

const checkoutApi = require('./api')
const $script = require('scriptjs')
// const checkoutUi = require('./ui.js')
// const getFormFields = require('../../../lib/get-form-fields')

// stripe script that adds modal to html and allows for ajax request
// to get a users token to be stored for their order

// Configures the stripe API to enable token generation and checkout processing
// Stripe generates a token based on given user/price data, which we then send
// to our API. Then in our API, a checkout request is made with the token to
// Stripe's API.
// Also adds an event listener to the submit-purchase-stripe button, so that when
// clicked, opens the stripe modal for checkout

const checkout = function () {
  const handler = StripeCheckout.configure({
    key: 'pk_test_AFBOWpYyewj4wYgQD8iUWg2i',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function (token) {
      // This data is used by Stripe to generat a token
      const tokenData = {
        token: {
          token_id: token.id,
          // currently total is just hard-coded. TODO make it actual cart total
          total: 500
        }
      }
      // now make a Token post request to our API with the token generated by
      // Stripe
      checkoutApi.createToken(tokenData)
        .then((data) => {
          console.log('Payment Sent', data)
          return data
        })
        .catch((err) => {
          console.error('Error is', err)
        })
    }
  })

  // adds an event listener to the submit-purchase-stripe button, so that when
  // clicked, opens the stripe modal for checkout
  document.getElementById('submit-purchase-stripe').addEventListener('click', function (event) {
    // Open Checkout with further options:
    handler.open({
      // These values are what the user sees in the checkout modal
      // `name` is the shop name, `description` is currently hard-coded
      // TODO maybe make description reference actual cart items
      name: 'RAINDROP',
      description: '2 DROPS',
      // currently amount is hard-coded TODO make it ref cart total
      amount: 500
    })
    event.preventDefault()
  })
  // Close Checkout on page navigation:
  window.addEventListener('popstate', function () {
    handler.close()
  })
}

$script('https://checkout.stripe.com/checkout.js', checkout)

// This handler connects this whole file to index.js file. This allows the above functions to run
const checkoutHandlers = () => {
}

module.exports = {
  checkoutHandlers
}
