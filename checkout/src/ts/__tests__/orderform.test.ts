// Import jQuery from __mocks__
import $ from 'jquery'

// eslint-disable-next-line jest/no-mocks-import
import { EMPTY_ORDER_FORM } from '../__mocks__/order-form'
import { getOrderFormId } from '../utils/orderform'

function ajaxResponse<T>(response: T): JQueryPromise<T> {
  return $.Deferred().resolve(response).promise()
}

describe('Order Form Example', () => {
  beforeAll(() => {
    window.$ = $
    window.vtexjs = {
      checkout: {
        getOrderForm: () => ajaxResponse<OrderForm>(EMPTY_ORDER_FORM),
      } as VtexJsCheckout,
    }
  })

  it('Should returns an Order Form ID', async () => {
    const orderFormId = await getOrderFormId()

    expect(orderFormId).toBe('test')
  })

  it('Should returns an Order Form ID from cache', async () => {
    window.vtexjs.checkout.orderFormId = 'cacheId'

    const orderFormId = await getOrderFormId()

    expect(orderFormId).toBe('cacheId')
  })
})
