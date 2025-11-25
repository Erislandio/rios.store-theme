import React from 'react'
import { ProductSummaryContext } from 'vtex.product-summary-context'
import { useRuntime } from 'vtex.render-runtime'

export default function CustomProductSummaryWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { product } = ProductSummaryContext.useProductSummary()
  const { navigate } = useRuntime()

  const hasColorVariation = product?.skuSpecifications?.some(
    (spec) => spec?.field?.name?.toLowerCase() === 'cor'
  )

  if (!hasColorVariation || product.items.length === 1) return children

  return (
    <button
      className="CUSTOM vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer w-100 "
      type="button"
      onClick={() =>
        navigate({
          to: `${product.linkText}/p`,
          fetchPage: true,
          page: 'store.product',
        })
      }
    >
      <div
        className="vtex-button__label flex items-center justify-center h-100 ph6 w-100 border-box "
        style={{ paddingTop: '0.25em', paddingBottom: '0.32em' }}
      >
        <div className="vtex-add-to-cart-button-0-x-buttonDataContainer vtex-add-to-cart-button-0-x-buttonDataContainer--summary flex justify-center">
          <span className="vtex-add-to-cart-button-0-x-buttonText vtex-add-to-cart-button-0-x-buttonText--summary">
            Adicionar ao carrinho
          </span>
        </div>
      </div>
    </button>
  )
}
