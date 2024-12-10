import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class Regions extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
    })
  }

  public async getRegionId(
    postalCode: string,
    country: string,
    sc: string
  ): Promise<any> {
    return this.http.get(
      `/api/pub/checkout/regions?country=${country}&postalCode=${postalCode}&sc=${sc}`,
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    )
  }
}
