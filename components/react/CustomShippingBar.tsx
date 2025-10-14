import React from 'react'
import { useQuery } from 'react-apollo'

import { OrderForm as OrderFormType } from 'vtex.checkout-graphql'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { OrderForm } from 'vtex.order-manager'
import SHIPPING_BAR from './graphql/getShippingBar.gql'

const cssHandles = [
  'customShippingBar',
  'customShippingBar__progress',
  'customShippingBar__message',
  'customShippingBar__remaining',
  'customShippingBar__total',
  'customShippingBar__progress_price',
  'customShippingBarItemsPrice',
] as const

export default function CustomShippingBar() {
  const { orderForm } = OrderForm.useOrderForm() as { orderForm: OrderFormType }
  const { handles } = useCssHandles(cssHandles)

  const { data, loading } = useQuery<{ getShippingBar: number }>(SHIPPING_BAR, {
    ssr: false,
    fetchPolicy: 'no-cache',
  })

  if (loading) {
    return (
      <div className={handles.customShippingBar}>
        <div className={handles.customShippingBar__message}>
          <span>Carregando...</span>
        </div>
        <div className={handles.customShippingBar__progress}>
          <div
            className={handles.customShippingBar__total}
            style={{ width: '0%' }}
            aria-valuenow={0}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
          />
        </div>
      </div>
    )
  }

  if (!data?.getShippingBar) {
    return null
  }

  const total = orderForm.totalizers.find(
    (totalizer) => totalizer.id === 'Items'
  )?.value

  if (!total) return null

  const threshold = data.getShippingBar * 100

  if (!threshold || threshold <= 0) return null

  const currencySymbol = orderForm.storePreferencesData?.currencySymbol ?? '$'
  const formatPrice = (value: number) =>
    `${currencySymbol}${(value / 100).toFixed(2)}`

  const remaining = Math.max(threshold - total, 0)
  const percentage = Math.min(
    100,
    threshold ? Math.round((total / threshold) * 100) : 100
  )

  const isShippingBarFree = remaining <= 0

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
            <span
              className={applyModifiers(
                handles.customShippingBar__remaining,
                'disclaimer'
              )}
            >
              *Apenas para fretes para o estado do Ceará
            </span>
          </div>
        ) : (
          <div className={handles.customShippingBar__remaining}>
            Faltam apenas{' '}
            <b
              className={applyModifiers(
                handles.customShippingBar__remaining,
                'bold'
              )}
            >
              {formatPrice(remaining)}
            </b>{' '}
            para ganhar{' '}
            <b
              className={applyModifiers(
                handles.customShippingBar__remaining,
                'bold'
              )}
            >
              frete grátis
            </b>
            <span
              className={applyModifiers(
                handles.customShippingBar__remaining,
                'disclaimer'
              )}
            >
              *Apenas para fretes para o estado do Ceará
            </span>
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
      </div>
      <span className={handles.customShippingBar__progress_price}>
        {isShippingBarFree ? null : formatPrice(remaining)}
      </span>
    </div>
  )
}
