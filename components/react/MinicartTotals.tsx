import React from 'react'
import type { OrderForm } from 'vtex.checkout-graphql'
import { OrderForm as OrderFormContext } from 'vtex.order-manager'

export default function MinicartTotals() {
  const { orderForm } = OrderFormContext.useOrderForm() as {
    orderForm: OrderForm
  }

  const discountValue =
    orderForm.totalizers.find((total) => total.id === 'Discounts')?.value ?? 0

  const totalValue = orderForm.value ?? 0

  const discountFromItems = orderForm.items.reduce((acc, item) => {
    if (!item.listPrice || !item.sellingPrice) {
      return acc
    }

    const itemDiscount =
      item.listPrice * item.quantity - item.sellingPrice * item.quantity

    return acc + itemDiscount
  }, 0)

  return (
    <div className="vtex-minicart-2-x-minicartSummary ph4 ph6-l pt5">
      <div className="vtex-checkout-summary-0-x-summarySmallContent c-on-base">
        <div className="flex w-100 c-on-base lh-copy items-center vtex-checkout-summary-0-x-summaryItemContainer mt3">
          <div
            id="shipping"
            className="vtex-checkout-summary-0-x-summaryItemLabel flex-none fw6 fw5-l"
          >
            Valor da compra:
          </div>
          <div
            id="shipping-price"
            className="flex-auto tr vtex-checkout-summary-0-x-summaryItemPrice "
          >
            <div className="vtex-checkout-summary-0-x-price">
              R${' '}
              {Math.abs(totalValue / 100)
                .toFixed(2)
                .replace('.', ',')}
            </div>
          </div>
        </div>
        <div className="flex w-100 c-on-base lh-copy items-center vtex-checkout-summary-0-x-summaryItemContainer vtex-checkout-summary-0-x-summaryItemContainer--discount mt3">
          <div
            id="discount"
            className="vtex-checkout-summary-0-x-summaryItemLabel flex-none fw6 fw5-l"
          >
            Descontos
          </div>
          <div
            id="discount-price"
            className="flex-auto tr vtex-checkout-summary-0-x-summaryItemPrice "
          >
            <div className="vtex-checkout-summary-0-x-price c-danger" />- R${' '}
            {(Math.abs(discountValue + discountFromItems) / 100)
              .toFixed(2)
              .replace('.', ',')}
          </div>
        </div>
        <div className="flex w-100 c-on-base lh-copy items-center vtex-checkout-summary-0-x-summaryItemContainer f4 mt4 pb5">
          <div
            id="total"
            className="vtex-checkout-summary-0-x-summaryItemLabel flex-none fw6 fw5-l"
          >
            Subtotal
          </div>
          <div
            id="total-price"
            className="flex-auto tr vtex-checkout-summary-0-x-summaryItemPrice fw6 fw5-l"
          >
            <div className="vtex-checkout-summary-0-x-price c-success">
              R${' '}
              {(((orderForm?.value ?? 0) - discountValue) / 100)
                .toFixed(2)
                .replace('.', ',')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
