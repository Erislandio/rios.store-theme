import React, { useContext, useState } from 'react'
import { OrderItems } from 'vtex.order-items'
import { usePixel } from 'vtex.pixel-manager'
import type { ProductTypes } from 'vtex.product-context'
import { ProductContext } from 'vtex.product-context'
import { Spinner } from 'vtex.styleguide'

import useMapItemToCart from '../helpers/useAddToCartHelpers'

interface AddToCartButtonProps {
  text: string
  error_text: string
  agreement: boolean
  className: string
  selectedProducts: any[]
  selectedSkus: any[]
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  text,
  error_text,
  agreement,
  className,
  selectedProducts,
  selectedSkus,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const { product } = useContext(
    ProductContext
  ) as ProductTypes.ProductContextState

  const { push } = usePixel()
  const { addItem } = OrderItems.useOrderItems()
  const { mapItemToCart, adjustSkuItemForPixelEvent } = useMapItemToCart()

  const handleAddItems = async (itemsToCart: any) => {
    await addItem(itemsToCart)
    push({
      event: 'addToCart',
      items: adjustSkuItemForPixelEvent,
    })
  }

  async function handleBuy() {
    if (!agreement) {
      return
    }

    setError(false)
    setIsLoading(true)

    try {
      const items = (selectedProducts || [product])?.reduce?.(
        (result, prod) => {
          const sku =
            prod?.items?.find?.((i: any) => {
              return selectedSkus.some((s: any) => {
                return (
                  s.itemId === i.itemId &&
                  !result.some((r: any) => s.itemId === r.id)
                )
              })
            }) || prod?.items?.[0]

          const seller = sku?.sellers?.[0]

          if (sku && seller) {
            result.push(mapItemToCart(prod, sku, 1, seller))
          }

          return result
        },
        []
      )

      await handleAddItems(items)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      setError(true)
    }
  }

  return (
    <button
      onClick={() => handleBuy()}
      className={`add-to-cart ${className}`}
      disabled={isLoading || error}
    >
      {!isLoading && !error && text}
      {isLoading && !error && <Spinner color="inherit" />}
      {error && (error_text || text)}
    </button>
  )
}
