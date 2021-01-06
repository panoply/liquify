const cryptographer = require('@brixtol/cryptographer')

exports.handler = async (event, context, callback) => {

  try {

    const response = await centra.products.Get(productId, queryStringParameters.license)

    return callback(
      null
      , {
        statusCode: 200
        , headers: shared.headers
        , body: JSON.stringify({
          status: 'ok',
          secret: '09147839e0fe9d5c117309d89419f472ccfff13ef7483308168ed1490e'
        })
      }
    )

  } catch (error) {

    return callback(
      error
      , {
        statusCode: 500
        , headers: shared.headers
        , body: error.message
      }
    )

  }
}
