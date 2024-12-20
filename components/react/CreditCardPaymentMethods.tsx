import React, { useEffect, useState } from 'react'

import classNames from 'classnames'
import type { FunctionComponent } from 'react'
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
  console.log('🚀 ~ productContext:', productContext)
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

  // const installmentsFiltered =
  //   productInstallments?.filter(
  //     (installment: Installments) => installment.PaymentSystemName === 'Visa'
  //   ) ?? []

  const checkIfITHasInterest = (InterestRate: number) => {
    return InterestRate > 0
  }

  const installmentsFiltered = [
    {
      Value: 1000,
      InterestRate: 0,
      TotalValuePlusInterestRate: 1000,
      NumberOfInstallments: 1,
      Name: 'Installment 1',
      PaymentSystemName: 'Credit Card',
    },
    {
      Value: 500,
      InterestRate: 0,
      TotalValuePlusInterestRate: 1000,
      NumberOfInstallments: 2,
      Name: 'Installment 2',
      PaymentSystemName: 'Credit Card',
    },
    {
      Value: 333.33,
      InterestRate: 0,
      TotalValuePlusInterestRate: 1000,
      NumberOfInstallments: 3,
      Name: 'Installment 3',
      PaymentSystemName: 'Credit Card',
    },
    {
      Value: 250,
      InterestRate: 0,
      TotalValuePlusInterestRate: 1000,
      NumberOfInstallments: 4,
      Name: 'Installment 4',
      PaymentSystemName: 'Credit Card',
    },
    {
      Value: 200,
      InterestRate: 0,
      TotalValuePlusInterestRate: 1000,
      NumberOfInstallments: 5,
      Name: 'Installment 4',
      PaymentSystemName: 'Credit Card',
    },
    {
      Value: 166.66,
      InterestRate: 0,
      TotalValuePlusInterestRate: 1000,
      NumberOfInstallments: 6,
      Name: 'Installment 5',
      PaymentSystemName: 'Credit Card',
    },
    {
      Value: 142.85,
      InterestRate: 0,
      TotalValuePlusInterestRate: 1000,
      NumberOfInstallments: 7,
      Name: 'Installment 6',
      PaymentSystemName: 'Credit Card',
    },
    {
      Value: 125,
      InterestRate: 0,
      TotalValuePlusInterestRate: 1000,
      NumberOfInstallments: 8,
      Name: 'Installment 7',
      PaymentSystemName: 'Credit Card',
    },
    {
      Value: 111.11,
      InterestRate: 0.2,
      TotalValuePlusInterestRate: 1000,
      NumberOfInstallments: 9,
      Name: 'Installment 8',
      PaymentSystemName: 'Credit Card',
    },
    {
      Value: 100,
      InterestRate: 0.2,
      TotalValuePlusInterestRate: 1000,
      NumberOfInstallments: 10,
      Name: 'Installment 9',
      PaymentSystemName: 'Credit Card',
    },
  ]

  return (
    <div className={handles.installmentsContainer}>
      {installmentsFiltered?.map((paymentCondition: Installments) => {
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
                {checkIfITHasInterest(paymentCondition?.InterestRate)
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
