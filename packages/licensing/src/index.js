// #!/usr/bin/env node

const os = require('os')
const qs = require('qs')
const { createHash } = require('crypto')

const NetLicensing = require('netlicensing-client/dist/netlicensing-client.node')

const apiKey = '59b5079f-7a84-4f35-af7f-cdedf187a6a3'
const license = 'IYV3P7V66'
const product = 'M6JGUDVU9'

const context = new NetLicensing.Context().setUsername('apiKey').setPassword(apiKey)
const params = new NetLicensing.ValidationParameters().setProductNumber(product)

const validation = async () => {

  const postData = qs.stringify({
    machineId: createHash('sha256').update(os.homedir(), 'utf8').digest('hex'),
    licenceKey: 'hello'
  })

  console.log(postData)

  const licenses = await NetLicensing.ProductService.list(context)
  const validate = await NetLicensing.LicenseeService.validate(context, license, params)

  for (let i = 0; i < licenses.length; i++) {
    console.log(licenses[i].getProperties())
  }

  console.log(validate.getValidators().M6JGUDVU9)

}
