const specs = require('./package/index')

specs('sissel siv').then(v => {

  console.log(v.shopify())

}).catch(console.error)
