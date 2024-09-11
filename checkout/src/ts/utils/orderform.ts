/**
 * @export
 * @description Get session Order Form ID.
 * @returns A promise that returns the Order Form ID.
 * @since 0.1.0
 * @version 1.0.0
 */
export const getOrderFormId = (): JQueryPromise<string> => {
  return vtexjs?.checkout?.orderFormId
    ? $.Deferred().resolve(vtexjs.checkout.orderFormId).promise()
    : vtexjs.checkout.getOrderForm().then((orderForm) => orderForm.orderFormId)
}
