
// @ts-nocheck
import NetLicensing from 'netlicensing-client/dist/netlicensing-client.node'

export function authenticate ({ apiKey, product, license }) {

  /**
   * Context Instance
   */
  const context = new NetLicensing.Context().setUsername('apiKey').setPassword(apiKey)

  /**
   * Validation Parameters
   */
  const params = new NetLicensing.ValidationParameters().setProductNumber(product)

  return ({

    async products () {

      await NetLicensing.ProductService.list(context)

    },

    get validate () {

      return NetLicensing.LicenseeService.validate(context, license, params)

    }

  })

}
