import { identity } from '@liquify/cryptographer'
import { authenticate } from './src/authenticate'
import { license } from './src/license'

export default async function (options = {
  apiKey: 'eefd0e15-e618-4808-a4fa-a64cc0fd21ce',
  product: 'P2UZIYS3A',
  license: identity()
}) {

  const auth = await authenticate(options)

  return (await license(auth))

}
