// #!/usr/bin/env node
/*
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

validation() */

export class License {}


 if (start <= offset[0] && end >= offset[offset.length - 1]) {

      ast.splice(i, 1)
      console.log('removed start or singular', name)
      continue

    } else if (offset.length <= 2) {

      if (start <= offset[0] && end > offset[0] && end < offset[1]) {

        ast.splice(i, 1)
        console.log('{% or {{ left delimeter', name)
        continue

      } else if (start >= offset[0] && start < offset[1] && end >= offset[1]) {

        ast.splice(i, 1)
        console.log('%} or }}, rightdelimeter removed', name)
        continue

      }
    } else if (start <= offset[0] && end >= offset[3]) {

      ast.splice(i, 1)
      console.log('removed block tag', name)
      continue

    } else if (start < offset[2] && end > offset[2] && end < offset[3]) {

      ast.splice(i, 1)
      console.log('{%, left delimeter:', name)
      continue

    } else if (start > offset[2] && start < offset[3] && end >= offset[3]) {

      ast.splice(i, 1)
      console.log('%}, right delimeter:', name)
      continue

    } else if (start <= offset[2] && end > offset[3]) {

      ast.splice(i, 1)
      console.log('removed end block', name)
      continue

    }
