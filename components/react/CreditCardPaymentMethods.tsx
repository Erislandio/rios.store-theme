import classNames from 'classnames'
import type { FunctionComponent } from 'react'
import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'

// import './styles.css'
import { formatCurrency } from './utils/formatCurrency'
import { getDefaultSeller } from './utils/getDefaultSeller'

const CSS_HANDLES = [
  'installmentsContainer',
  'payment-methods__container',
  'payment-methods__quantity',
  'payment-methods__value',
  'payment-methods__interest',
  'payment-methods__total',
]

const CreditCardPaymentMethods: FunctionComponent = () => {
  const productContext = useProduct()

  const { handles } = useCssHandles(CSS_HANDLES)
  const [productInstallments, setProductInstallments] =
    useState<Installments[]>()

  useEffect(() => {
    const itemId = productContext?.selectedItem?.itemId

    const productsSkuSelected = productContext?.product?.items.find(
      (item) => item.itemId === itemId
    )

    const sellerSkuSelected = getDefaultSeller(productsSkuSelected)

    const skuInstallments =
      sellerSkuSelected?.commertialOffer?.Installments ?? []

    setProductInstallments(skuInstallments)
  }, [productContext])

  if (!productInstallments) {
    return null
  }

  const checkIfHasInterest = (InterestRate: number) => {
    return InterestRate > 0
  }

  const uniqueByInstallments = productInstallments.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (t) => t.NumberOfInstallments === item.NumberOfInstallments
      )
  )

  return (
    <div className={handles.installmentsContainer}>
      {uniqueByInstallments?.map((paymentCondition: Installments) => {
        return (
          <div
            key={paymentCondition?.Name}
            data-testid="payment-methods"
            className={classNames(
              'flex justify-between items-center ph2',
              handles['payment-methods__container']
            )}
          >
            <div>
              <span
                className={classNames(
                  't-heading-6 b',
                  handles['payment-methods__value']
                )}
              >
                {paymentCondition?.NumberOfInstallments}x de{' '}
                {formatCurrency(paymentCondition?.Value)}{' '}
              </span>
              <span
                className={classNames(
                  't-heading-6',
                  handles['payment-methods__interest']
                )}
              >
                {checkIfHasInterest(paymentCondition?.InterestRate)
                  ? 'Com juros'
                  : 'Sem juros'}
              </span>
            </div>
            <span
              className={classNames(
                'mr1 t-heading-6',
                handles['payment-methods__total']
              )}
            >
              {formatCurrency(paymentCondition?.TotalValuePlusInterestRate)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default CreditCardPaymentMethods
