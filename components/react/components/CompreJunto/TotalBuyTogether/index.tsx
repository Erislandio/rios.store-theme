import React, { useEffect, useState } from 'react'
import { FormattedCurrency } from 'vtex.format-currency'

import { AddToCartButton } from '../AddToCartButton'

export const useProductSimulation = (products: any[]) => {
  const [simulation, setSimulation] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const simulate = async () => {
      const response = await fetch(
        `/api/checkout/pub/orderForms/simulation?RnbBehavior=0`,
        {
          method: 'POST',
          body: JSON.stringify({
            items: products,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data = (await response.json()) as any

      setSimulation(data)
      setLoading(false)
    }

    try {
      simulate()
    } catch (error) {
      setLoading(false)
    }
  }, [products])

  return {
    loading,
    simulation,
  }
}

export const TotalBuyTogether = ({
  product,
  currentSku,
  selectedProducts,
}: any) => {
  const textTitle = 'Compre junto'
  const textButton = 'Comprar junto'

  const { loading, simulation } = useProductSimulation([
    {
      seller: '1',
      quantity: 1,
      id: currentSku.itemId,
    },
    {
      id: selectedProducts[0].items[0].itemId,
      quantity: selectedProducts[0].items[0].sellers[0].sellerId,
      seller: selectedProducts[0].items[0].unitMultiplier,
    },
  ])

  if (loading) {
    return (
      <div className="buytogether__total loading">
        <div className="buytogether__total-title">{textTitle}</div>
        <button className="buytogether__total-button">Carregando</button>
      </div>
    )
  }

  if (simulation) {
    let totalprice =
      simulation.totals.find((total: any) => total.id.toLowerCase() === 'items')
        ?.value || 0

    const discount = simulation.totals.find(
      (item: any) => item.id.toLowerCase() === 'discounts'
    )

    const oldPrice = discount ? totalprice : ''

    if (discount) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      totalprice += discount.value
    }

    const installments = simulation.paymentData.installmentOptions.find(
      (installment: any) =>
        installment.paymentName.toLowerCase().includes('visa')
    )

    const installment = installments?.installments.pop()

    if (installment) {
      const totalPerInstallments = installment?.total / installment?.count / 100

      return (
        <>
          <div className="buytogether__total">
            <div className="buytogether__total-title">{textTitle}</div>
            <div className="buytogether__total-price-wrapper">
              <span className="buytogether__total-price-total">
                {oldPrice ? (
                  <span className="buytogether__old-price-total">
                    <span className="de">de </span>
                    <FormattedCurrency value={oldPrice / 100} />
                    <span className="por"> por</span>
                  </span>
                ) : (
                  ''
                )}
                <FormattedCurrency value={totalprice / 100} />
              </span>
              <span className="buytogether__total-price-installments">
                {installment.count}x de{' '}
                <FormattedCurrency value={totalPerInstallments || 0} />
              </span>
            </div>
            {simulation.messages.length ? (
              <span className="buytogether__total-price-total-disclaimer">
                {simulation.messages.map((item: any, index: any) => (
                  <p key={index}>
                    {item.text} <br />
                  </p>
                ))}
              </span>
            ) : null}
            <AddToCartButton
              text={textButton}
              agreement
              error_text={textButton}
              className="buytogether__total-button"
              selectedProducts={selectedProducts.concat(product)}
              selectedSkus={selectedProducts
                .map((p: any) => p?.items?.[0])
                .concat(currentSku)}
            />
          </div>
        </>
      )
    }
  }

  return (
    <div className="buytogether__total">
      <div className="buytogether__total-title">{textTitle}</div>
      <AddToCartButton
        text={textButton}
        agreement
        error_text={textButton}
        className="buytogether__total-button"
        selectedProducts={selectedProducts.concat(product)}
        selectedSkus={selectedProducts
          .map((p: any) => p?.items?.[0])
          .concat(currentSku)}
      />
    </div>
  )
}
