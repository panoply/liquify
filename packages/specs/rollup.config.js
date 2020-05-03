import { resolve } from 'path'
import { specs } from '@liquify/cli'

export default specs.bundle({
  input: resolve(__dirname, 'variations'),
  output: resolve(__dirname, 'package')
})
