
// @ts-nocheck

import NetLicensing from 'netlicensing-client/dist/netlicensing-client.node'
import { identity } from '@liquify/cryptographer'
import qs from 'qs'

const apiKey = 'eefd0e15-e618-4808-a4fa-a64cc0fd21ce'
const product = 'P2UZIYS3A'
const licensee = '9e4f2410-886f-4ddc-a087-48b7288d942c'

const context = new NetLicensing.Context().setUsername('apiKey').setPassword(apiKey)
const params = new NetLicensing.ValidationParameters().setProductNumber(product)
const licensed = new NetLicensing.License()
// licence types

const individual = 'M5IKJVSPY'
const agency = 'M7K92CJFZ'
const corporate = 'MCQATPQ47'

export default async (license = identity()) => {

  const products = await NetLicensing.ProductService.list(context)
  const validate = await NetLicensing.LicenseeService.validate(context, license, params)

  return {

    getLicense () {

      const licenses = Object.values(validate.getValidators())

      return licenses.find(({ valid }) => valid)
      // licenses.filter(license => license.getProperties())

    }

  }

}
