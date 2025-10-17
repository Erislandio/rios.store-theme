import React, { useEffect, useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductTypes'

import { ShelfBuyTogether } from './ShelfBuyTogether'
import { TotalBuyTogether } from './TotalBuyTogether'

const CSS_HANDLES = [
  'buytogether',
  'buytogether__title',
  'buytogether__separator',
  'buytogether__content',
] as const

type SelectedProducts = {
  idxs: number[]
  products: object[]
}

export const ProductBuyTogether = () => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { product, selectedItem } = useProduct() as ProductContextState

  const [defaultIndex, setDefaultIndex] = useState([] as number[])
  const [buyTogetherProducts, setBuyTogetherProducts] = useState([])
  const [selectedProductsToBuy, setSelectedProductsToBuy] = useState({
    idxs: [],
    products: [],
  } as SelectedProducts)

  useEffect(() => {
    if (product) {
      fetch(
        `/api/catalog_system/pub/products/crossselling/showtogether/${product?.productId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setBuyTogetherProducts(data)
        })
    }
  }, [product])

  useEffect(() => {
    if (!buyTogetherProducts.length) {
      return
    }

    const idxsLength = Math.min(buyTogetherProducts.length, 1)
    const products = buyTogetherProducts.slice(0, idxsLength)

    setDefaultIndex(buyTogetherProducts.map((_, i) => i))
    setSelectedProductsToBuy({
      idxs: products.map((_, i) => i),
      products,
    })
  }, [buyTogetherProducts])

  function getNextProduct(currentIndex = 0) {
    const { idxs } = selectedProductsToBuy
    let nextIndex = -1

    for (
      let index = idxs[currentIndex];
      index <= defaultIndex.length;
      index++
    ) {
      if (
        !idxs?.some?.((di) => di === index + 1) &&
        defaultIndex?.some?.((di) => di === index + 1)
      ) {
        nextIndex = index + 1
        break
      }
    }

    const nextAvailableIndex =
      nextIndex > -1
        ? nextIndex
        : defaultIndex?.find?.((di) => !idxs.some((ix) => ix === di)) || 0

    const nextProduct = buyTogetherProducts[nextAvailableIndex]

    idxs[currentIndex] = nextAvailableIndex
    const products = selectedProductsToBuy.products.map((p, i) => {
      if (i === currentIndex) {
        return nextProduct
      }

      return p
    })

    const newSelectedProductsToBuy = {
      idxs,
      products,
    }

    setSelectedProductsToBuy(newSelectedProductsToBuy)
  }

  function isLastIndex(index: number) {
    return index + 1 === selectedProductsToBuy.idxs.length
  }

  if (selectedProductsToBuy.products.length !== 1) {
    return <></>
  }

  return (
    <>
      {buyTogetherProducts.length > 0 && (
        <div className={handles.buytogether}>
          <h2 className={handles.buytogether__title}>
            Compre junto e economize!
          </h2>
          <div className={handles.buytogether__content}>
            <ShelfBuyTogether
              product={product}
              currentSku={selectedItem ?? product?.items?.[0]}
            />
            <div className={handles.buytogether__separator}>+</div>
            {selectedProductsToBuy.products.map((selected_product, idx) => {
              return (
                <>
                  <ShelfBuyTogether
                    product={selected_product}
                    changeProduct={() => getNextProduct(idx)}
                  />
                  <div
                    className={applyModifiers(
                      handles.buytogether__separator,
                      isLastIndex(idx) ? 'last' : ''
                    )}
                  >
                    {isLastIndex(idx) ? '=' : '+'}
                  </div>
                </>
              )
            })}
            <TotalBuyTogether
              product={product}
              currentSku={selectedItem || product?.items?.[0]}
              selectedProducts={selectedProductsToBuy.products}
            />
          </div>
        </div>
      )}
    </>
  )
}
