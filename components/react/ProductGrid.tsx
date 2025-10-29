import React, { Fragment, useMemo, useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { OrderForm as OrderFormContext } from 'vtex.order-manager'
import { usePixel } from 'vtex.pixel-manager'
import { useProduct } from 'vtex.product-context'
import type {
  Item,
  ProductContextState,
} from 'vtex.product-context/react/ProductTypes'
import { Button, NumericStepper } from 'vtex.styleguide'

const CSS_HANDLES = [
  'productGridContainer',
  'productGridContainerItem',
  'productGridContainerItemInfo',
  'productGridContainerItemTitle',
  'productGridContainerItemImage',
  'productGridContainerItemSelect',
  'buyButton',
] as const

const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function extractImagePath(html: string, width: number, height: number): string {
  // Captura o valor do src
  const match = html.match(/src="([^"]+)"/)

  if (!match) return 'https://placehold.co/64x88/000000/FFF'

  let url = match[1]

  // Remove o "~" inicial, se existir
  url = url.replace(/^~\//, '/')

  // Substitui placeholders
  url = url.replace(/#width#/g, String(width))
  url = url.replace(/#height#/g, String(height))

  // Retorna só a parte a partir de "/arquivos"
  const startIndex = url.indexOf('/arquivos')

  if (startIndex === -1) return 'https://placehold.co/64x88/000000/FFF'

  return url.substring(startIndex)
}

const Card = ({
  item,
  onChange,
}: {
  item: Item
  onChange: (itemId: string, itemQuantity: number) => void
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  const tamanho = useMemo(
    () =>
      item?.variations?.find(
        (variation) => variation.name.toLowerCase() === 'tamanho'
      )?.values[0],
    [item]
  )

  const color = useMemo(
    () =>
      item?.variations?.find(
        (variation) => variation.name.toLowerCase() === 'cor'
      )?.values[0],
    [item]
  )

  if (!tamanho || !color) {
    return null
  }

  const maxQuantity = item.sellers[0].commertialOffer.AvailableQuantity

  return (
    <div
      key={item.itemId}
      title={maxQuantity ? item.name : 'Indisponível'}
      className={applyModifiers(
        handles.productGridContainerItem,
        maxQuantity ? 'available' : 'unavailable'
      )}
    >
      <img
        className={handles.productGridContainerItemImage}
        style={{
          objectFit: 'cover',
        }}
        src={extractImagePath(item.images[0].imageTag, 200, 200) as string}
        width={64}
        height={89}
        alt={item.name}
        loading="lazy"
      />
      <div className={handles.productGridContainerItemInfo}>
        <h4 className={handles.productGridContainerItemTitle}>{color}</h4>
        <p className={handles.productGridContainerItemTitle}>{tamanho}</p>
        <select
          onChange={(event) => {
            const value = Number(event.target.value)

            onChange(item.itemId, value)
          }}
          className={handles.productGridContainerItemSelect}
        >
          {options
            .filter(
              (op) => op <= item.sellers[0].commertialOffer.AvailableQuantity
            )
            .map((op) => (
              <option id={`${item.name}-option-${op}`} value={op} key={op}>
                {op}
              </option>
            ))}
        </select>
      </div>
    </div>
  )
}

interface ItemToCart {
  itemId: string
  quantity: number
}

export default function ProductGrid({
  children,
}: {
  children: React.ReactNode
}) {
  const { product } = useProduct() as ProductContextState
  const { handles } = useCssHandles(CSS_HANDLES)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const { push } = usePixel()
  const { orderForm, setOrderForm } = OrderFormContext.useOrderForm()

  const [items, setItems] = useState<ItemToCart[]>([])

  async function addToCart() {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/checkout/pub/orderForm/${orderForm.id}/items?allowedOutdatedData=paymentData`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderItems: [
              ...items
                .filter((item) => item.quantity > 0)
                .map((item) => ({
                  id: item.itemId,
                  quantity: item.quantity,
                  seller: '1',
                })),
            ],
          }),
        }
      )

      setLoading(false)

      const newOrderForm = await response.json()

      setOrderForm({
        ...orderForm,
        items: newOrderForm.items.map((customItem: any) => ({
          ...customItem,
          imageUrls: {
            at1x: customItem.imageUrl,
            at2x: customItem.imageUrl,
            at3x: customItem.imageUrl,
          },
        })),
      })

      setTimeout(() => {
        push({
          event: 'add-to-cart-button' as any,
          id: 'add-to-cart-button',
        })
      }, 1000)
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleAddItem = (itemId: string, itemQuantity: number) => {
    setItems((prevItems) => [
      ...prevItems.filter((item) => item.itemId !== itemId),
      { itemId, quantity: itemQuantity },
    ])
  }

  const isValid =
    product?.properties?.find(
      (propertie) => propertie?.name?.toLowerCase() === 'atacado'
    )?.values[0] === 'sim'

  if (isValid) {
    const priceElement = React.Children.toArray(children).find((child) => {
      if (
        React.isValidElement(child) &&
        child.props.id === 'custom-div#prices'
      ) {
        return true
      }

      return false
    })

    return (
      <Fragment>
        <div className={handles.productGridContainer}>
          {product.items.map((item) => (
            <Card key={item.ean} item={item} onChange={handleAddItem} />
          ))}
        </div>
        {priceElement}
        <div className={handles.buyButton}>
          <NumericStepper
            maxValue={10}
            minValue={1}
            value={quantity}
            onChange={setQuantity}
          />
          <Button
            isLoading={loading}
            disabled={loading || items.every((item) => item.quantity === 0)}
            onClick={() => addToCart()}
          >
            Comprar
          </Button>
        </div>
      </Fragment>
    )
  }

  return children
}
