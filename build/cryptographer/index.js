import crypto from 'crypto'

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

/**
 * Creates hash of an string based on available hashes of platform
 * @param {string} input
 * @param {number} iv
 * @param {string} hash
 * @returns {*}
 */
const hash = (input, iv = 0, hash = 'md5') => {

  if (crypto.getHashes().indexOf(hash) !== -1) {
    const key = crypto.createHash(hash).update(input).digest('hex')
    return iv > 0 ? { key, iv: key.substr(iv) } : key
  } else {
    throw new Error('hash ' + hash + ' not found in your platform')
  }
}

/**
 * State Config - provides model of each cipher
 */
const state = (function (keychain) {

  let auth,
    secret,
    master

  return {
    /**
     * Get Master key - Returns the master key encode
     *
     * @returns {string}
     */
    get reveal () {
      return master
    },

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
     * 1 time, on initialisation.
     *
     * @param {string} key The master password
     */
    set master (key) {
      master = hash(key, 16)
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
      return keychain
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
      secret = hash(value, 16)
    },

    /**
     * Key hash getter - MD5 by default, (see `hash()`)
     *
     * @returns {String}
     */
    get key () {
      return secret.key
    },

    /**
     * IV hash getter - Partial slice from `key`
     *
     * @example '123456789' > '6789'
     * @returns {String}
     */
    get iv () {
      return secret.iv
    },

    /**
     * Encryption algorithm
     *
     * @type {string}
     */
    algorithm: 'aes-256-ctr',

    /**
     * Empty options object - passed to crypto
     *
     * @type {string}
     */
    options: Object.create(null)
  }

})(new Map())

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
 * @return {(input: string) => string}
 */
const encode = ({ algorithm, key, iv, options }) => input => {
  input = normalizeInput(input)
  const cipher = crypto.createCipheriv(algorithm, key, iv, options)
  return cipher.update(input, 'utf8', 'hex') + cipher.final('hex')
}

/**
 * Decode string
 * @param input
 * @return {(input: string) => string}
 */
const decode = ({ algorithm, key, iv, options }) => input => {

  input = normalizeInput(input)

  const decipher = crypto.createDecipheriv(algorithm, key, iv, options)
  const decoded = decipher.update(input, 'hex', 'utf8') + decipher.final('utf8')
  return normalizeOutput(decoded)

}

const matchSecret = () => {

}

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

  for (const k in keys) {
    state.key = encode(state)(k)
    for (const p of keys[k]) {
      state.keychain.set(encode(state)(p), state.key)
    }
  }

}

/**
 * Cryptographer
 */
export const authenticate = (key, algorithm = undefined) => {

  // Required
  if (typeof key !== 'string') throw new Error('required an string key')

  // Not Empty
  if (key === '') throw new Error('key cannot be empty')

  if (typeof algorithm === 'string') {
    if (algorithm !== state.algorithm && algorithms.indexOf(algorithm) < 0) {
      throw new Error(`"${algorithm}" is not supported, use:\n${algorithms.join(',\n')}`)
    } else state.algorithm = algorithm
  }

  state.key = key
  key = encode(state)(key)

  if (state.keychain.has(key)) {
    state.key = state.keychain.get(key)
  }
  // state.key = key
  // const get = encode(state)(state.key = key)
  console.log(state.key, state.keychain)
  const options = Object.freeze(state)

  return {
    encode: encode(options),
    decode: decode(options),
    hash,
    get ciphers () {

      return crypto.getCiphers()

    }

  }

}
