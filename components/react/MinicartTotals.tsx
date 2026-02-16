import React, { Fragment } from 'react'
import type { OrderForm } from 'vtex.checkout-graphql'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedPrice } from 'vtex.formatted-price'
import { OrderForm as OrderFormContext } from 'vtex.order-manager'
import OrderCouponProvider from './Coupon'

const OrderCouponProviderInput = OrderCouponProvider as any

const CSS_MINICART_TOTALS = [
  'minicartSummary',
  'summarySmallContent',
  'summaryItemLabel',
] as const

export default function MinicartTotals() {
  const { handles } = useCssHandles(CSS_MINICART_TOTALS)

  const { orderForm } = OrderFormContext.useOrderForm() as {
    orderForm: OrderForm
  }

  return (
    <Fragment>
      <OrderCouponProviderInput />
      <div className={handles.minicartSummary}>
        <div className={handles.summarySmallContent}>
          <span className={handles.summaryItemLabel}>Total do pedido</span>
          <FormattedPrice value={orderForm.value} />
        </div>
      </div>
    </Fragment>
  )
}
