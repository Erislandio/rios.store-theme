/* eslint-disable @typescript-eslint/no-explicit-any */

interface VtexJsCheckout {
  /**
   * The Order Form ID from session.
   */
  orderFormId?: string

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#getorderformexpectedorderformsections
   */
  getOrderForm(
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#addtocartitems-expectedorderformsections-saleschannel
   */
  addToCart(
    items: ProductItem[],
    expectedOrderFormSections?: ExpectedOrderFormSections,
    salesChannel?: SalesChannel = 1
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#updateitemsitems-expectedorderformsections
   */
  updateItems(
    items: ProductItem[],
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#removeallitemsexpectedorderformsections
   */
  removeItems(
    items: ProductItem[],
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#getorderformexpectedorderformsections
   */
  removeAllItems(
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#cloneitemitemindex-newitemsoptions-expectedorderformsections
   */
  cloneItem(
    itemIndex: number,
    newItemsOptions?: object[],
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#calculateshippingaddress
   */
  calculateShipping(
    address: Pick<CheckoutAddress, 'postalCode' | 'country'> &
      Partial<CheckoutAddress>
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#simulateshippingshippingdata-orderformid-country-saleschannel
   */
  simulateShipping(
    shippingData: Pick<ShippingData, 'logisticsInfo' | 'selectedAddresses'>,
    orderFormId: string,
    country: string,
    salesChannel?: SalesChannel = 1
  ): JQueryPromise<any>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#getaddressinformationaddress
   */
  getAddressInformation(address: Address): JQueryPromise<any>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#getprofilebyemailemail-saleschannel
   */
  getProfileByEmail(
    email: string,
    salesChannel?: SalesChannel = 1
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#removeaccountidaccountid-expectedorderformsections
   */
  removeAccountId(
    accountId: string,
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<any>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#adddiscountcouponcouponcode-expectedorderformsections
   */
  addDiscountCoupon(
    couponCode: string,
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#removediscountcouponexpectedorderformsections
   */
  removeDiscountCoupon(
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#removegiftregistryexpectedorderformsections
   */
  removeGiftRegistry(
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#addofferingofferingid-itemindex-expectedorderformsections
   */
  addOffering(
    offeringId: string | number,
    itemIndex: number,
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#removeofferingofferingid-itemindex-expectedorderformsections
   */
  removeOffering(
    offeringId: string | number,
    itemIndex: number,
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#additemattachmentitemindex-attachmentname-content-expectedorderformsections-splititem
   */
  addItemAttachment(
    itemIndex: number,
    attachmentName: string,
    content: Record<string, any>,
    expectedOrderFormSections?: ExpectedOrderFormSections,
    splitItem = true
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#removeitemattachmentitemindex-attachmentname-content-expectedorderformsections
   */
  removeItemAttachment(
    itemIndex: number,
    attachmentName: string,
    content: Record<string, any>,
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#addbundleitemattachmentitemindex-bundleitemid-attachmentname-content-expectedorderformsections
   */
  addBundleItemAttachment(
    itemIndex: number,
    bundleItemId: string | number,
    attachmentName: string,
    content: Record<string, any>,
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#removebundleitemattachmentitemindex-bundleitemid-attachmentname-content-expectedorderformsections
   */
  removeBundleItemAttachment(
    itemIndex: number,
    bundleItemId: string | number,
    attachmentName: string,
    content: Record<string, any>,
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#sendlocalelocale
   */
  sendLocale(locale: string): JQueryPromise<any>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#clearmessagesexpectedorderformsections
   */
  clearMessages(
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<any>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#getlogouturl
   */
  getLogoutURL(): string

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#getordersordergroupid
   */
  getOrders(orderGroupId: string): JQueryPromise<any>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#changeitemsordinationcriteria-ascending-expectedorderformsections
   */
  changeItemsOrdination(
    criteria: string,
    ascending: boolean,
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#replaceskuitems-expectedorderformsections-splititem
   */
  replaceSKU(
    items: ProductItem[],
    expectedOrderFormSections?: ExpectedOrderFormSections,
    splitItem = true
  ): JQueryPromise<OrderForm>

  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#finishtransactionordergroupid-expectedorderformsections
   */
  finishTransaction(
    orderGroupId: string,
    expectedOrderFormSections?: ExpectedOrderFormSections
  ): JQueryPromise<OrderForm>
}

/**
 * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout#expectedorderformsections
 */
type ExpectedOrderFormSections = Record<string, any>

type ProductItem = Pick<OrderFormItem, 'id' | 'quantity' | 'seller'>

type SalesChannel = string | number
