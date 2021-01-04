import { createHash, createDecipheriv, createCipheriv, getCiphers, getHashes } from 'crypto'
import os from 'os'

/**
 * Creates hash of an string based on available hashes of platform
 * @param {string} input
 * @param {string} hash
 * @returns {string}
 */
const hash = (input, hash = 'md5') => {

  if (getHashes().indexOf(hash) !== -1) {
    return createHash(hash).update(input).digest('hex')
  }

  throw new Error('hash ' + hash + ' not found in your platform')

}

/**
 * Generate IV
 *
 * @param {string} key
 * @param {number} [length=16]
 * @returns {string}
 */
const iv = (key, length = 16) => {

  return key.substr(length)

}

/**
 * Normalize string
 *
 * @param input
 * @returns {*}
 */
const normalizeInput = input => {

  if (input === null || typeof input === 'undefined') throw new Error('required origin')
  if (typeof input === 'object') input = JSON.stringify(input)
  if (typeof input !== 'string') input = input.toString()

  return input
}

/**
 * If is JSON string then parse
 *
 * @param input
 * @returns {*}
 */
const normalizeOutput = input => {

  try {
    return JSON.parse(input)
  } catch (e) {
    return input
  }
}

/**
 * Encode string
 * @param input
 * @return {string}
 */
function encode (input) {

  input = normalizeInput(input)

  const cipher = createCipheriv(this.algorithm, this.key, this.iv, this.options)
  return cipher.update(input, 'utf8', 'hex') + cipher.final('hex')

}

/**
 * Decode string
 * @param input
 * @return {string}
 */
function decode (input) {

  input = normalizeInput(input)

  const decipher = createDecipheriv(this.algorithm, this.key, this.iv, this.options)
  const decoded = decipher.update(input, 'hex', 'utf8') + decipher.final('utf8')

  return normalizeOutput(decoded)

}

/**
 * State Config - provides model of each cipher
 */
const state = (

  function (keychain) {

    /**
     * Supported Encryption algorithms
     */
    const algorithms = [
      'aes-256-cbc',
      'aes-256-cbc-hmac-sha1',
      'aes-256-cbc-hmac-sha256',
      'aes-256-cfb',
      'aes-256-cfb1',
      'aes-256-cfb8',
      'aes-256-ctr',
      'aes-256-ofb',
      'aes256',
      'camellia-256-cbc',
      'camellia-256-cfb',
      'camellia-256-cfb1',
      'camellia-256-cfb8',
      'camellia-256-ofb',
      'camellia256'
    ]

    /* -------------------------------------------- */
    /*                    PRIVATE                   */
    /* -------------------------------------------- */

    /**
     * Secret
     *
     * @type {object}
     */
    let secret

    /**
     * Master
     *
     * @type {string}
     */
    let master

    /**
     * Algorithm
     *
     * @type {string}
     */
    let algorithm = 'aes-256-ctr'

    /* -------------------------------------------- */
    /*                    CLOSURE                   */
    /* -------------------------------------------- */

    return {

      /**
       * Get Master key - Returns the master key encode
       *
       * @returns {string}
       */
      get master () {

        return master

      },

      /**
       * Master key hash and IV setter, master keys
       * remains in cache, setter for master assigns
       * 1 time, on initialization.
       *
       * @param {string} key The master password
       */
      set master (key) {

        master = hash(key)

      },

      /**
       * Keychain model - Saves the keychain
       *
       * - Left value is encoded secret key
       * - Right value is encoded value
       *
       * @example ['password', 'name']
       */
      get keychain () {

        // @ts-ignore
        return keychain

      },

      /**
       * Keychain model - Saves the keychain
       *
       * - Left value is encoded secret key
       * - Right value is encoded value
       *
       * @example ['password', 'name']
       * @param {string} value
       */
      set keychain (value) {

        secret = hash(value)

        if (!keychain.has(secret)) {
          keychain.set(secret, {
            iv: this.iv,
            key: encode.bind(this)(secret),
            secret: ''
          })
        }

      },

      /**
       * Key hash and IV setter
       *
       * - Left value is encoded variation name
       * - Right value is encoded secret key
       *
       * @example ['standard', 'password']
       */
      set key (value) {

        secret = hash(value)

      },

      /**
       * Key hash getter - MD5 by default, (see `hash()`)
       *
       * @returns {String}
       */
      get key () {

        return secret

      },

      /**
       * IV hash getter - Partial slice from `key`
       *
       * @example '123456789' > '6789'
       * @returns {String}
       */
      get iv () {

        return iv(this.key)

      },

      /**
       * Set Encryption algorithm
       *
       * @type {string}
       */
      set algorithm (value) {

        if (value !== algorithm && algorithms.indexOf(algorithm) < 0) {
          throw new Error(`"${algorithm}" is not supported`)
        }

        algorithm = value

      },

      /**
       * Get Encryption algorithm
       *
       * @returns {string}
       */
      get algorithm () {

        return algorithm

      },
      /**
       * Empty options object - passed to crypto
       *
       * @type {object}
       */
      options: Object.create(null)

    }
  }

)(new Map())

export const identity = () => createHash('sha256').update(os.homedir(), 'utf8').digest('hex')

/**
 * Keychain Supplier - Used for public exposed keychains
 *
 * @param {string} master The master key, unlocks all variations
 * @param {object} keys Access keys, unlocks on a per-varation basis
 */
export const keychain = (master, keys = undefined) => {

  if (!master || !keys) throw new Error('Empty keychain passed')

  if (Object.isFrozen(state)) {
    throw new Error('Keychain exists, modifications are prohibited')
  }

  state.master = master

  for (const key in keys) {
    state.keychain = key
    console.log(key, encode.bind(state)(key))
    for (const password of keys[key]) {
      state.keychain.get(state.key).secret = encode.bind(state)(password)
    }
  }

  console.log(state.keychain)
}

/**
 * Cryptographer
 */
export const secret = (key, algorithm = undefined, options = undefined) => {

  if (typeof key !== 'string' || key === '') throw new Error('required an string key')
  if (typeof algorithm === 'string') state.algorithm = algorithm
  if (typeof options === 'object') Object.assign(state.options, options)

  state.key = key

  console.log(state, encode.bind(state)(key))

  return {
    encode: encode.bind(state),
    decode: decode.bind(state)
  }

}
