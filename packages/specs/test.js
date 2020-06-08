const specs = require('./package/index')

specs('sissel siv').then(v => {

  console.log(v)

}).catch(console.error)
