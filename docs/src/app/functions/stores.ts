const store = require('@liquify/schema-stores');
const { basename } = require('path');

/**
 * @type {Netlify.Lambda}
 */
exports.handler = async (event, context, callback) => {

  const name = basename(event.path, '.json');

  const json = {
    fail: 'failed',
    liquidrc: 'liquidrc',
    specification: 'liquid-specs',
    settings: 'shopify-settings',
    sections: 'shopify-sections',
    locales: 'shopify-locales'
  }[name || 'fail'];

  if (!json) {
    return callback(
      null
      , {
        statusCode: 200
        , body: JSON.stringify({ error: 'No stores exists for ' + name + '.json' })
      }
    );
  }

  const schema = store(json);

  try {

    return callback(
      null
      , {
        statusCode: 200
        , body: JSON.stringify(schema)
        , headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {

    return callback(
      error
      , {
        statusCode: 500
        , body: error.message
      }
    );

  }
};
