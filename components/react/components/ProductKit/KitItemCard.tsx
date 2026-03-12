/* eslint-disable @typescript-eslint/no-shadow */
import React, { useCallback, useMemo, useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'

import type { KitProduct } from '../../typings/product-kit'
import { CSS_HANDLES } from './constants'
import {
  extractImageUrl,
  findItemBySizeAndColor,
  getAvailableColors,
  getAvailableSizes,
} from './utils'

const KitItemCard = ({
  product,
  onSelectionChange,
  selectedQuantity,
}: {
  product: KitProduct
  onSelectionChange: (productId: string, itemId: string | null) => void
  selectedQuantity: number
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const availableSizes = useMemo(
    () => getAvailableSizes(product.items),
    [product.items]
  )
  const availableColors = useMemo(
    () => getAvailableColors(product.items),
    [product.items]
  )

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const selectedItem = useMemo(() => {
    if (!selectedSize && !selectedColor) return product.items[0]

    return (
      findItemBySizeAndColor(product.items, selectedSize, selectedColor) ??
      product.items[0]
    )
  }, [product.items, selectedSize, selectedColor])

  const handleSizeChange = useCallback(
    (size: string) => {
      setSelectedSize(size)
      const item = findItemBySizeAndColor(product.items, size, selectedColor)

      onSelectionChange(product.productId, item?.itemId ?? null)
    },
    [product.items, product.productId, selectedColor, onSelectionChange]
  )

  const handleColorChange = useCallback(
    (color: string) => {
      setSelectedColor(color)
      const item = findItemBySizeAndColor(product.items, selectedSize, color)

      onSelectionChange(product.productId, item?.itemId ?? null)
    },
    [product.items, product.productId, selectedSize, onSelectionChange]
  )

  const imageUrl = selectedItem?.images?.[0]?.imageTag
    ? extractImageUrl(selectedItem.images[0].imageTag, 200, 280)
    : selectedItem?.images?.[0]?.imageUrl ?? ''

  const isAvailable =
    (selectedItem?.sellers?.[0]?.commertialOffer?.AvailableQuantity ?? 0) > 0

  return (
    <div
      className={applyModifiers(
        handles.productKitItem,
        isAvailable ? 'available' : 'unavailable'
      )}
    >
      <div className={handles.productKitItemImageContainer}>
        <img
          className={handles.productKitItemImage}
          src={imageUrl}
          alt={product.productName}
          width={120}
          height={160}
          loading="lazy"
          style={{ objectFit: 'cover' }}
        />

        <p className={handles.productKitItemQuantity}>
          {selectedQuantity} {selectedQuantity === 1 ? 'unidade' : 'unidades'}
        </p>
      </div>
      <div className={handles.productKitItemInfo}>
        <h4 className={handles.productKitItemName}>{product.productName}</h4>

        {availableSizes.length > 0 && (
          <div className={handles.productKitSizeSelector}>
            <span className={handles.productKitSizeSelectorTitle}>
              Selecione o tamanho: {selectedSize}
            </span>
            <div className={handles.productKitSizeSelectorOptions}>
              {availableSizes.map((size) => {
                const item = findItemBySizeAndColor(
                  product.items,
                  size,
                  selectedColor
                )
                const available =
                  (item?.sellers?.[0]?.commertialOffer?.AvailableQuantity ??
                    0) > 0

                return (
                  <button
                    key={size}
                    type="button"
                    disabled={!available}
                    className={applyModifiers(handles.productKitSizeOption, [
                      selectedSize === size ? 'selected' : '',
                      available ? 'available' : 'unavailable',
                    ])}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {availableColors.length > 0 && (
          <div className={handles.productKitColorSelector}>
            <span className={handles.productKitColorSelectorTitle}>
              Cor selecionada: {selectedColor ?? availableColors[0]?.name}
            </span>
            <div className={handles.productKitColorSelectorOptions}>
              {availableColors.map(({ name }) => {
                const item = findItemBySizeAndColor(
                  product.items,
                  selectedSize,
                  name
                )
                const colorImage = item?.images?.find(
                  (img) => img.imageLabel?.toLowerCase() === 'cor'
                )

                return (
                  <button
                    key={name}
                    type="button"
                    title={name}
                    className={applyModifiers(handles.productKitColorOption, [
                      selectedColor === name ? 'selected' : '',
                      name?.toLowerCase(),
                    ])}
                    onClick={() => handleColorChange(name)}
                  >
                    {colorImage?.imageUrl ? (
                      <img
                        src={colorImage.imageUrl}
                        alt={name}
                        width={24}
                        height={24}
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span>{name.charAt(0)}</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default KitItemCard
