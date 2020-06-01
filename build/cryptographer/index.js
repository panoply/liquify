import crypto from 'crypto'

/**
 * Normalize string
 *
 * @param input
 * @returns {*}
 */
const normalizeInput = input => {

  if (input === null || typeof input === 'undefined') throw new Error('required origin')
  if (typeof input === 'object') input = JSON.stringfy(input)
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
const encode = ({ algorithm, key, iv, options }) => input => {
  input = normalizeInput(input)
  const cipher = crypto.createCipheriv(algorithm, key, iv, options)
  return cipher.update(input, 'utf8', 'hex') + cipher.final('hex')
}

/**
 * Decode string
 * @param input
 * @return {string}
 */
const decode = ({ algorithm, key, iv, options }) => input => {
  input = normalizeInput(input)
  const decipher = crypto.createDecipheriv(algorithm, key, iv, options)
  const decoded = decipher.update(input, 'hex', 'utf8') + decipher.final('utf8')
  return normalizeOutput(decoded)
}

/**
 * Get available ciphers
 * @return {array}
 */
const ciphers = () => crypto.getCiphers()

/**
 * Creates hash of an string based on available hashes of platform
 * @param input
 * @param hash
 * @returns {*}
 */
const hash = (input, hash) => {
  if (crypto.getHashes().indexOf(hash) !== -1) {
    return crypto.createHash(hash).update(input).digest('hex')
  } else {
    throw new Error('hash ' + hash + ' not found in your platform')
  }
}

/**
 * Cryptographer
 */
export default (key, algorithm = 'aes-256-ctr') => {

  // Required
  if (typeof key !== 'string') throw new Error('required an string key')

  // Not Empty
  if (key === '') throw new Error('key cannot be empty')

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

  if (!algorithms.includes(algorithm)) {
    throw new Error(`algorithm ${algorithm} not supported, use: ${algorithms.join(', ')}`)
  }

  const options = {
    key: hash(key, 'md5')
    , iv: key.substr(16)
    , options: {}
    , algorithm
  }

  return {
    encode: encode(options),
    decode: decode(options),
    ciphers,
    hash
  }

}
