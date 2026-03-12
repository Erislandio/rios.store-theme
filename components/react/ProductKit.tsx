import React, { Fragment, useCallback, useState } from 'react'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { OrderForm } from 'vtex.order-manager'
import { usePixel } from 'vtex.pixel-manager'
import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import { ExtensionPoint } from 'vtex.render-runtime'
import { withToast } from 'vtex.styleguide'

import { CSS_HANDLES } from './components/ProductKit/constants'
import KitItemCard from './components/ProductKit/KitItemCard'
import SkeletonCard from './components/ProductKit/SkeletonCard'
import GET_KIT from './graphql/getKit.gql'
import type { KitProduct } from './typings/product-kit'

interface SelectedSku {
  productId: string
  itemId: string
}

function ProductKit({
  children,
  showToast,
}: {
  children: React.ReactNode
  showToast?: (input: { message: string }) => void
}) {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { product } = useProduct() as ProductContextState
  const { orderForm, setOrderForm } = OrderForm.useOrderForm()
  const { push } = usePixel()
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSkus, setSelectedSkus] = useState<SelectedSku[]>([])

  const sku = product?.items?.[0]?.itemId

  const { data, loading } = useQuery<{ productRecommendations: KitProduct[] }>(
    GET_KIT,
    {
      variables: {
        value: sku,
      },
      skip: !sku,
      ssr: false,
      fetchPolicy: 'no-cache',
    }
  )

  const onSelectionChange = useCallback(
    (productId: string, itemId: string | null) => {
      setSelectedSkus((prev) => {
        const filtered = prev.filter((s) => s.productId !== productId)

        if (itemId) {
          return [...filtered, { productId, itemId }]
        }

        return filtered
      })
    },
    []
  )

  const getResolvedItemId = useCallback(
    (kitProduct: KitProduct): string | null => {
      const selected = selectedSkus.find(
        (s) => s.productId === kitProduct.productId
      )

      return selected?.itemId ?? null
    },
    [selectedSkus]
  )

  async function addToCart() {
    if (!data?.productRecommendations?.length) return

    const mergedProducts = data.productRecommendations.reduce((acc, item) => {
      if (!acc[item.productId]) {
        acc[item.productId] = item
      } else {
        acc[item.productId].items = [
          ...acc[item.productId].items,
          ...item.items,
        ]
      }

      return acc
    }, {} as Record<string, KitProduct>)

    const arrayItems = Object.values(mergedProducts)

    // Validate: current product must have a selected SKU
    const currentProductSelected = selectedSkus.find(
      (s) => s.productId === product?.productId
    )

    if (!currentProductSelected) {
      showToast?.({
        message: 'Selecione o tamanho e a cor do produto principal',
      })

      return
    }

    // Validate: all kit products must have a selected SKU
    const missingSelection = arrayItems.find((kitProduct) => {
      const resolved = getResolvedItemId(kitProduct)

      return !resolved
    })

    if (missingSelection) {
      showToast?.({
        message: `Selecione o tamanho e a cor de: ${missingSelection.productName}`,
      })

      return
    }

    try {
      setIsLoading(true)

      const orderItems = [
        // Current product
        {
          id: currentProductSelected.itemId,
          quantity: selectedQuantity,
          seller: '1',
        },
        // Kit accessories
        ...arrayItems.map((kitProduct) => ({
          id: getResolvedItemId(kitProduct)!,
          quantity: selectedQuantity,
          seller: '1',
        })),
      ]

      const response = await fetch(
        `/api/checkout/pub/orderForm/${orderForm.id}/items?allowedOutdatedData=paymentData`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderItems }),
        }
      )

      if (!response.ok) {
        showToast?.({
          message: 'Erro ao adicionar o kit no carrinho',
        })

        return
      }

      const newOrderForm = await response.json()

      setOrderForm({
        ...newOrderForm,
        items: newOrderForm.items.map((customItem: any) => ({
          ...customItem,
          imageUrls: {
            at1x: customItem.imageUrl,
            at2x: customItem.imageUrl,
            at3x: customItem.imageUrl,
          },
        })),
      })

      showToast?.({
        message: 'Kit adicionado ao carrinho com sucesso!',
      })

      setTimeout(() => {
        push({
          event: 'add-to-cart-button' as any,
          id: 'add-to-cart-button',
        })
      }, 1000)
    } catch (error) {
      showToast?.({
        message: 'Erro ao adicionar o kit no carrinho',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <section
        className={handles.productKit}
        style={{
          margin: '20px 0px',
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes productKitSkeletonPulse {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
            `,
          }}
        />
        <div className={handles.productKitSkeleton}>
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </section>
    )
  }

  if (!data?.productRecommendations?.length || true === true) {
    return <>{children}</>
  }

  const mergedProducts = data.productRecommendations.reduce((acc, item) => {
    if (!acc[item.productId]) {
      acc[item.productId] = item
    } else {
      acc[item.productId].items = [...acc[item.productId].items, ...item.items]
    }

    return acc
  }, {} as Record<string, KitProduct>)

  const arrayItems = Object.values(mergedProducts)

  return (
    <Fragment>
      <ExtensionPoint id="custom-div" />
      <section className={handles.productKit}>
        <div className={handles.productKitWrapper}>
          <KitItemCard
            key={product?.productId}
            product={product as any}
            onSelectionChange={onSelectionChange}
            selectedQuantity={selectedQuantity}
          />
          {arrayItems.map((item) => (
            <KitItemCard
              key={item.productId}
              product={item}
              onSelectionChange={onSelectionChange}
              selectedQuantity={selectedQuantity}
            />
          ))}
        </div>
        <ExtensionPoint id="modal-trigger" />
        <div
          className="gruporios-store-components-0-x-divContainer gruporios-store-components-0-x-divContainer--add-to-cart-section "
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: 'auto',
            background: 'transparent',
            gap: 12,
            justifyContent: 'flex-start',
            padding: 0,
          }}
        >
          <div className="vtex-product-quantity-1-x-quantitySelectorContainer flex flex-column mb4">
            <div className="vtex-product-quantity-1-x-quantitySelectorStepper">
              <div className="vtex-numeric-stepper-wrapper numeric-stepper-wrapper">
                <div className="vtex-numeric-stepper-container numeric-stepper-container flex self-start">
                  <input
                    type="tel"
                    className="vtex-numeric-stepper__input numeric-stepper__input z-1 order-1 tc bw1 ba b--muted-4 bw1  br0 h-small t-small w3  vtex-styleguide-9-x-hideDecorators"
                    step={1}
                    value={selectedQuantity}
                    readOnly
                    style={{ appearance: 'none' }}
                  />
                  <div className="vtex-numeric-stepper__plus-button-container numeric-stepper__plus-button-container z-2 order-2 flex-none">
                    <button
                      type="button"
                      className="vtex-numeric-stepper__plus-button numeric-stepper__plus-button br2 pa0 bl-0 flex items-center justify-center ba b--muted-4 bw1  h-small f6  bg-muted-5 c-disabled o-100 "
                      aria-label="+"
                      onClick={() => setSelectedQuantity((q) => q + 1)}
                      tabIndex={0}
                    >
                      <div className="vtex-numeric-stepper__plus-button__text numeric-stepper__plus-button__text b">
                        ＋
                      </div>
                    </button>
                  </div>
                  <div className="vtex-numeric-stepper__minus-button-container numeric-stepper__minus-button-container z-2 order-0 flex-none">
                    <button
                      type="button"
                      className="vtex-numeric-stepper__minus-button numeric-stepper__minus-button br2 pa0 br-0 flex items-center justify-center ba b--muted-4 bw1  h-small f6  bg-muted-5 c-disabled o-100 "
                      aria-label="−"
                      tabIndex={0}
                      disabled={selectedQuantity <= 1}
                      onClick={() =>
                        setSelectedQuantity((q) => Math.max(1, q - 1))
                      }
                    >
                      <span className="vtex-numeric-stepper__minus-button__text numeric-stepper__minus-button__text b">
                        －
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            tabIndex={0}
            className="vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer w-100 "
            type="button"
            disabled={isLoading}
            onClick={addToCart}
          >
            <div
              className="vtex-button__label flex items-center justify-center h-100 ph6 w-100 border-box "
              style={{ paddingTop: '0.25em', paddingBottom: '0.32em' }}
            >
              {isLoading ? (
                <div
                  className="vtex-add-to-cart-button-0-x-buttonDataContainer flex justify-center"
                  style={{ opacity: 0.7 }}
                >
                  <span className="vtex-add-to-cart-button-0-x-buttonText">
                    Adicionando...
                  </span>
                </div>
              ) : (
                <div className="vtex-add-to-cart-button-0-x-buttonDataContainer flex justify-center">
                  <span className="vtex-add-to-cart-button-0-x-buttonText">
                    Adicionar à sacola
                  </span>
                </div>
              )}
            </div>
          </button>
        </div>
      </section>
    </Fragment>
  )
}

export default withToast(ProductKit as any)
