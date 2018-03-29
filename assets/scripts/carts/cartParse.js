'use strict'

const store = require('../store')

// store all product objects locally in a hash, where each item obj is
// accessible by its product ID
// takes the API product data as an argument, and returns the same so it can be
// promise chained
const setAllProducts = function (data) {
  store.allProducts = {}
  data.products.forEach((product) => {
    store.allProducts[product._id] = product
  })
  // console.log(store.allProducts)
  return data
}

// store all cart data locally, sort past carts, set cart totals
// takes the API cart data as an argument, and returns the same so it can be
// promise chained
const setAllLocalCarts = function (data) {
  // saves all of a user's carts from the API to local store
  store.allMyCarts = data.carts
  // sets all of the cart totals
  setAllCartTotals()
  // console.log('store.allMyCarts is ', store.allMyCarts)
  // parses past purchase carts out from all of a users carts and stores locally
  setPastPurchases()
  // set the active cart, if there's more than one, set the most recent
  setNewestActiveCart()
  // console.log('store.pastPurchases is ', store.pastPurchases)
  return data
}

// If there are more than one active carts (due to some internal error or
// malicious injection), choose the newest one
const setNewestActiveCart = function () {
  const activeCarts = store.allMyCarts.filter((cart) => cart.purchased === false)
  // sorts all the active carts by date
  activeCarts.sort(function (a, b) {
    return Date.parse(b.createdAt) - Date.parse(a.createdAt)
  })
  // console.log('sorted activeCarts are ', activeCarts)
  store.activeCart = activeCarts[0]
  // console.log('activeCart is ', store.activeCart)
}

// parses past purchase carts out from all of a users carts and stores locally
const setPastPurchases = function () {
  store.pastPurchases = store.allMyCarts.filter((cart) => cart.purchased === true)
}

// sets all local cart totals
const setAllCartTotals = function () {
  // iterates through all local carts and runs a callback to calculate and set
  // that cart's total cost
  store.allMyCarts.forEach(setCartTotal)
}

// adds up the prices of all the items in a cart, and sets a `total` value in
// the cart object
const setCartTotal = function (cart) {
  let total = 0
  cart.cartProducts.forEach((cartProduct) => {
    total += cartProduct.price
  })
  // console.log('total before rounding is ', total)
  // console.log('total after rounding is ', total.toFixed(2))
  cart.total = total.toFixed(2)
}

// package a locally stored cart (which contains products in the form of
// objects) into the format accepted by the API's update method (with an array
// of product IDs instead of an array of product objects)
const packageCartDataForAPI = function (cart) {
  const packagedCart = {
    id: cart.id,
    data: {
      cart: {
        purchased: cart.purchased,
        cartProducts: []
      }
    }
  }
  cart.cartProducts.forEach((product) => {
    packagedCart.data.cart.cartProducts.push(product._id)
  })
  return packagedCart
}

// adds selected item to activeCart in `store`, then packages the updated cart
// data and returns it to be sent to the API
// If no activeCart exists, return 'new cart needed', so the event will call a
// POST request instead of a PATCH
const addItemToCart = function (productId) {
  if (store.activeCart === undefined) {
    return 'new cart needed'
  } else {
    const product = store.allProducts[productId]
    store.activeCart.cartProducts.push(product)
    return packageCartDataForAPI(store.activeCart)
  }
}

// finds a given product in the activeCart and removes it, returning packaged
// data for an AJAX request
const deleteItemFromCart = function (productId) {
  // if removed item is last item in cart, cart must be destroyed, because API
  // won't accept empty carts, so end fucntion and return 'marked for deletion'
  if (store.activeCart.cartProducts.length === 1) {
    return 'marked for deletion'
  } else {
    // Otherwise, find and delete the given product
    // console.log('activeCart before splice is: ', store.activeCart.cartProducts.length)
    const product = store.activeCart.cartProducts.find((product) => {
      return product._id === productId
    })
    // console.log('product obj is ', product)
    const index = store.activeCart.cartProducts.indexOf(product)
    // console.log('index of product is ', index)
    store.activeCart.cartProducts.splice(index, 1)
    // console.log('activeCart after splice is: ', store.activeCart.cartProducts.length)
    return packageCartDataForAPI(store.activeCart)
  }
}

// accepts an array of product objects (from a cart) and returns a new array of
// product objects, replacing all duplicates with a quantity attribute
const setCartProductQuantities = function (cartProducts) {
  // initialize the array we'll be pushing into and returning at the end
  const packagedCartArray = []
  // iterate through every product in the argument array
  cartProducts.forEach((product) => {
    // if current product is already in packagedCartArray, returns that product obj
    // if not, returns undefined
    const productInPackagedArray = packagedCartArray.find((pushedProduct) => {
      return pushedProduct._id === product._id
    })
    // if current product is not yet in packagedCartArray, give it a quantity attribute
    // with value 1, and push it into packagedCartArray
    if (productInPackagedArray === undefined) {
      const objectToPush = {
        _id: product._id,
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
        quantity: 1
      }
      packagedCartArray.push(objectToPush)
      // if current product is already in packagedCartArray, find that obj in
      // packagedCartArray and increase its quantity counter by 1
    } else {
      const productIndex = packagedCartArray.indexOf(productInPackagedArray)
      packagedCartArray[productIndex].quantity += 1
    }
  })
  // console.log('cartProducts after setCartProductQuantities is ', cartProducts)
  // now return our packaged cart product array for handlebars
  return packagedCartArray
}

// accepts an array of pastPurchases, iterates through it and runs setCartProductQuantities
// on each one's cartProducts array. Returns the packaged data for handlebars
const setPastPurchaseProductQuantities = function (pastPurchases) {
  const packagedPastPurchases = []
  for (let i = 0; i < pastPurchases.length; i++) {
    const purchase = pastPurchases[i]
    // console.log('purchase.cartProducts is ', purchase.cartProducts)

    const parsedDate = new Date(purchase.updatedAt)
    const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'}
    // console.log('parsed date is ', parsedDate.toLocaleString([], dateOptions))

    const objToPush = {
      cartProducts: setCartProductQuantities(purchase.cartProducts),
      updatedAt: parsedDate.toLocaleString([], dateOptions),
      total: purchase.total,
      id: purchase.id
    }
    packagedPastPurchases.push(objToPush)
  }
  return packagedPastPurchases
}

module.exports = {
  setAllLocalCarts,
  setAllProducts,
  addItemToCart,
  deleteItemFromCart,
  setCartProductQuantities,
  setPastPurchaseProductQuantities
}
