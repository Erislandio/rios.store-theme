import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { ProductSummaryContext } from 'vtex.product-summary-context'

const CSS_HANDLES = [
  'customProductSummaryBadge',
  'customProductSummaryBadge__discount',
  'customProductSummaryBadge__new',
] as const

export default function CustomProductSummaryBadge() {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { product, selectedItem } = ProductSummaryContext.useProductSummary()

  const seller = selectedItem?.seller ?? {
    commertialOffer: { ListPrice: 0, Price: 0 },
  }

  const { ListPrice, Price } = seller.commertialOffer

  const discountPercent =
    ListPrice !== Price
      ? Math.round(((ListPrice - Price) / ListPrice) * 100)
      : null

  const isNew = product?.productClusters?.filter(
    (cluster) => cluster?.name?.toLowerCase() === 'lançamentos'
  )

  return (
    <div className={handles.customProductSummaryBadge}>
      {discountPercent && (
        <span className={handles.customProductSummaryBadge__discount}>
          {discountPercent}%
        </span>
      )}
      {isNew?.length > 0 && (
        <span className={handles.customProductSummaryBadge__new}>Novo</span>
      )}
    </div>
  )
}
