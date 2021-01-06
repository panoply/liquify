import { createHash, createDecipheriv, createCipheriv, getHashes } from 'crypto'

/**
 * Creates hash of an string based on available hashes of platform
 *
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

  if (input === null || typeof input === 'undefined') {
    throw new Error('required origin')
  }

  if (typeof input === 'object') {
    input = JSON.stringify(input)
  }

  if (typeof input !== 'string') {
    input = input.toString()
  }

  return input

}

/**
 * If is JSON string then parse, else just return
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
 * Cryptographer
 */
export default (key, algorithm = 'aes-256-ctr', options = {}) => {

  const state = {}

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

  if (typeof key !== 'string' || key === '') {
    throw new Error('required an string key')
  }

  if (algorithm !== 'aes-256-ctr' && algorithms.indexOf(algorithm) < 0) {
    throw new Error(`"${algorithm}" is not supported`)
  }

  state.algorithm = algorithm
  state.key = hash(key)
  state.iv = iv(state.key)
  state.options = options

  // console.log(state, encode.bind(state)(key))

  return {
    encode: encode.bind(state),
    decode: decode.bind(state)
  }

}
