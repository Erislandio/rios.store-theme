import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class Regions extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
    })
  }

  public async getRegionId(postalCode: string): Promise<any> {
    console.log('🚀 ~ Regions ~ getRegionId ~ postalCode:', postalCode)
    return this.http.get(
      `/api/checkout/pub/regions?country=BRA&postalCode=12922090&sc=1`,
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    )
  }
}
