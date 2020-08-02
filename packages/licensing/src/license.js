
import { identity } from '@liquify/cryptographer'

/**
 *
 */
export async function license (auth) {

  let pricing = 'M2Z6DZP3X'

  let leasing = 'MWJRTSK9G'

  const licenses = (await auth.validate).getValidators()

  return ({

    get license () {

      pricing = licenses[pricing]
      leasing = licenses[leasing]

      const filter = Object.values(licenses).find(({ valid }) => valid)

      for (const prop in filter) {
        if (!Array.isArray(filter[prop])) continue
        Object.assign(filter, {
          [prop]: filter[prop][0].type === 'QUOTA'
            ? filter[prop][0].quota
            : filter[prop][0].valid
        })
      }

      return filter

    }

  })
}
