import ruit from 'ruit'

// Store the stream the API methods to handle the plugins installation
const API_METHODS = new Set()
const UNSUBSCRIBE_SYMBOL = Symbol('stream')
const UNSUBSCRIBE_METHOD = 'off'
const CANCEL_METHOD = 'cancel'

/**
 * Factory function to create the stream generator
 * @private
 * @param {Set} modifiers - stream input modifiers
 * @returns {Generator} the stream generator
 */
function createStream (modifiers) {

  const stream = (function * stream () {
    while (true) {
      const input = yield
      yield ruit(input, ...modifiers)
    }
  })()

  // start the stream
  stream.next()
  return stream
}

/**
 * Dispatch a value to several listeners
 * @private
 * @param   {Set} callbacks - callbacks collection
 * @param   {*} value - anything
 * @returns {Set} the callbacks received
 */
function dispatch (callbacks, value) {

  callbacks.forEach(f => f(value) === UNSUBSCRIBE_SYMBOL && callbacks.delete(f))
  return callbacks

}

/**
 * Throw a panic error
 * @param {string} message - error message
 * @returns {Error} an error object
 */
function panic (message) {

  throw new Error(message)

}

/**
 * Install an stream plugin adding it to the API
 * @param   {string} name - plugin name
 * @param   {Function} fn - new stream API method
 * @returns {Function} return the stream function
 */
stream.install = function (name, fn) {
  if (!name || typeof name !== 'string') { panic('Please provide a name (as string)') }
  if (!fn || typeof fn !== 'function') { panic('Please provide a function') }

  if (API_METHODS.has(name)) {
    panic(`The ${name} is already part of the stream API, please provide a different name`)
  } else {
    stream[name] = fn
    API_METHODS.add(name)
  }

  return stream
}

// alias for ruit canel to stop a stream chain
stream.install(CANCEL_METHOD, ruit.cancel)

// unsubscribe helper
stream.install(UNSUBSCRIBE_METHOD, () => UNSUBSCRIBE_SYMBOL)

/**
 * Stream constuction function
 * @param   {...Function} fns - stream modifiers
 * @returns {Object} stream instance
 */
export default function stream (...fns) {

  const [
    success
    , error
    , end
    , modifiers
  ] = [
    new Set()
    , new Set()
    , new Set()
    , new Set(fns)

  ]

  const generator = createStream(modifiers)
  const stream = Object.create(generator)
  const addToCollection = (collection) => (fn) => collection.add(fn) && stream
  const deleteFromCollection = (collection) => (fn) => collection.delete(fn) ? stream
    : panic('Couldn\'t remove handler passed by reference')

  return Object.assign(stream, {
    on: Object.freeze({
      value: addToCollection(success),
      error: addToCollection(error),
      end: addToCollection(end)
    }),
    off: Object.freeze({
      value: deleteFromCollection(success),
      error: deleteFromCollection(error),
      end: deleteFromCollection(end)
    }),
    connect: addToCollection(modifiers),
    push (input) {
      const { value, done } = stream.next(input)
      if (!done) value.then(res => dispatch(success, res), err => dispatch(error, err))
      return stream
    },
    end () {
      generator.return()
      dispatch(end)
      ;[
        success
        , error
        , end
        , modifiers
      ].forEach(el => el.clear())

      return stream
    },
    fork () {
      return stream(...modifiers)
    },
    next (input) {
      const result = generator.next(input)
      generator.next()
      return result
    }
  })
}
