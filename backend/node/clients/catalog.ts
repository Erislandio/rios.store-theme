import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'
import { ProductCompreJunto } from '../typings/product-compre-junto'

export default class Catalog extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
    })
  }

  public async getComplements(
    productId: string
  ): Promise<ProductCompreJunto[]> {
    return this.http.get(
      `/api/catalog_system/pub/products/crossselling/showtogether/${productId}`,
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    )
  }
}
