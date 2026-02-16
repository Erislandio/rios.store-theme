import React from 'react'
import type { OrderForm as OrderFormType } from 'vtex.checkout-graphql'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { OrderForm } from 'vtex.order-manager'

const cssHandles = [
  'customShippingBar',
  'customShippingBar__progress',
  'customShippingBar__message',
  'customShippingBar__remaining',
  'customShippingBar__total',
  'customShippingBar__progress_price',
  'customShippingBarItemsPrice',
] as const

const CustomShippingBar: StoreFrontFC<{
  shippingValue: number
  shippingLabel: string
}> = ({ shippingValue = 279 }) => {
  const { orderForm } = OrderForm.useOrderForm() as { orderForm: OrderFormType }
  const { handles } = useCssHandles(cssHandles)

  const totalFull = orderForm.totalizers.find(
    (totalizer) => totalizer.id === 'Items'
  )?.value

  if (!totalFull) return null

  const total = totalFull / 100

  const threshold = shippingValue

  if (!threshold || threshold <= 0) return null

  const currencySymbol = orderForm.storePreferencesData?.currencySymbol ?? '$'

  const formatPrice = (value: number) => `${currencySymbol}${value.toFixed(2)}`

  const remaining = Math.max(threshold - total, 0)
  const percentage = Math.min(
    100,
    threshold ? Math.round((total / threshold) * 100) : 100
  )

  return (
    <div className={handles.customShippingBar}>
      <div className={handles.customShippingBar__message}>
        {remaining <= 0 ? (
          <div className={handles.customShippingBar__remaining}>
            Parabéns, você ganhou{' '}
            <b
              className={applyModifiers(
                handles.customShippingBar__remaining,
                'bold'
              )}
            >
              frete grátis
            </b>
          </div>
        ) : (
          <div className={handles.customShippingBar__remaining}>
            Faltam{' '}
            <b
              className={applyModifiers(
                handles.customShippingBar__remaining,
                'bold'
              )}
            >
              {formatPrice(remaining)}
            </b>{' '}
            para ganhar frete grátis
          </div>
        )}
      </div>
      <div className={handles.customShippingBarItemsPrice}>
        {formatPrice(total)}
      </div>
      <div className={handles.customShippingBar__progress}>
        <div
          className={handles.customShippingBar__total}
          style={{ width: `${percentage}%` }}
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        />
        <div
          className={handles.customShippingBarItemsPrice}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>{formatPrice(threshold)}</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  )
}

CustomShippingBar.schema = {
  title: 'Barra de FRETE',
  description: 'Componente de Barra de frete',
  type: 'object',
  properties: {
    shippingLabel: {
      type: 'string',
      title: 'Label da Barra de Frete',
      default: '',
    },
    shippingValue: {
      type: 'number',
      title: 'Valor da Barra de Frete',
      default: 279,
    },
  },
}

export default CustomShippingBar
