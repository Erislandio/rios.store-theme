import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class Regions extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
    })
  }

  public async getRegionId(postalCode: string): Promise<RegionResponse[]> {
    return this.http.get(
      `/api/checkout/pub/regions?country=BRA&postalCode=${postalCode}&sc=1`,
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    )
  }

  public async getUserAddress(
    postalCode: string
  ): Promise<VtexPostalCodeResponse> {
    return this.http.get(`/api/checkout/pub/postal-code/BRA/${postalCode}`, {
      headers: {
        'Content-type': 'application/json',
      },
    })
  }
}
