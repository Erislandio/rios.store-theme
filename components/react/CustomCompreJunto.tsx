/* eslint-disable @typescript-eslint/no-shadow */
import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-apollo'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { FormattedPrice } from 'vtex.formatted-price'
import { OrderForm } from 'vtex.order-manager'
import { usePixel } from 'vtex.pixel-manager'
import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import { ProductSummaryCustom } from 'vtex.product-summary'
import { ExtensionPoint } from 'vtex.render-runtime'
import { Button, Spinner, withToast } from 'vtex.styleguide'

import GET_PRODUCTS from './graphql/getCompreJunto.gql'
import type { ProductCompreJunto } from './typings/product-compre-junto'
import type { Simulation } from './typings/simulation'

const CSS_HANDLES = [
  'compreJunto',
  'compreJuntoItem',
  'compreJuntoWrapper',
  'compreJuntoContainer',
  'compreJuntoPlusIcon',
  'compreJuntoTotals',
  'compreJuntoTotalTitle',
  'compreJuntoTotalValue',
  'compreJuntoTotalParcelamento',
  'compreJuntoTotal',
] as const

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-plus-icon lucide-plus"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
)

export const EquaIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-equal-icon lucide-equal"
  >
    <line x1="5" x2="19" y1="9" y2="9" />
    <line x1="5" x2="19" y1="15" y2="15" />
  </svg>
)

function CompreJunto({ showToast }: { showToast?: (message: string) => void }) {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { product } = useProduct() as ProductContextState
  const [simulated, setSimulation] = useState<Simulation | null>(null)
  const { orderForm, setOrderForm } = OrderForm.useOrderForm()
  const [isLoading, setLoading] = useState(false)
  const { push } = usePixel()
  const { isMobile } = useDevice()

  const { loading, data } = useQuery<{ getBuyTogether: ProductCompreJunto[] }>(
    GET_PRODUCTS,
    {
      variables: {
        productId: product?.productId,
      },
      skip: !product?.productId,
      ssr: false,
      fetchPolicy: 'no-cache',
      onCompleted: async () => {
        const simulationData = await fetch(
          `/api/checkout/pub/orderForms/simulation?sc=1`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              country: 'BRA',
              items: [
                {
                  id: product?.items[0].itemId,
                  quantity: 1,
                  seller: '1',
                },
                ...(data?.getBuyTogether
                  ?.slice(0, 1)
                  .map((product: ProductCompreJunto) => ({
                    id: product.items[0].itemId,
                    quantity: 1,
                    seller: '1',
                  })) ?? []),
              ],
            }),
          }
        )

        if (simulationData.ok) {
          const simulationJson = await simulationData.json()

          setSimulation(simulationJson)
        }
      },
    }
  )

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
              {
                id: product?.items[0].itemId,
                quantity: 1,
                seller: '1',
              },
              ...(data?.getBuyTogether?.slice(0, 1).map((product) => ({
                id: product.items[0].itemId,
                quantity: 1,
                seller: '1',
              })) ?? []),
            ],
          }),
        }
      )

      if (!response.ok) {
        return showToast?.('Erro ao adicionar os produtos no carrinho')
      }

      showToast?.('Produtos adicionados ao carrinho com sucesso!')
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
      showToast?.('Erro ao adicionar os produtos no carrinho')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return null

  if (!data?.getBuyTogether?.length && !loading) {
    return null
  }

  if (isMobile) {
    return (
      <section className={applyModifiers(handles.compreJunto, 'mobile')}>
        <div className={handles.compreJuntoWrapper}>
          <div className={handles.compreJuntoItem}>
            <ExtensionPoint
              id="product-summary.shelf"
              product={ProductSummaryCustom.mapCatalogProductToProductSummary(
                product as any,
                'FIRST_AVAILABLE',
                400
              )}
            />
          </div>
          <div className={handles.compreJuntoPlusIcon}>
            <PlusIcon />
          </div>
          {data?.getBuyTogether?.slice(0, 1)?.map((product) => (
            <Fragment key={product.productId}>
              <div className={handles.compreJuntoItem} key={product.productId}>
                <ExtensionPoint
                  id="product-summary.shelf"
                  product={ProductSummaryCustom.mapCatalogProductToProductSummary(
                    product as any,
                    'FIRST_AVAILABLE',
                    400
                  )}
                />
              </div>
            </Fragment>
          ))}
        </div>
        <div className={handles.compreJuntoTotals}>
          <h5 className={handles.compreJuntoTotalTitle}>
            Comprando junto você paga no total:
          </h5>
          {!simulated ? (
            <p className={handles.compreJuntoTotalValue}>
              <Spinner />
            </p>
          ) : (
            <section className={handles.compreJuntoTotal}>
              <div className={handles.compreJuntoTotalValue}>
                <FormattedPrice
                  value={simulated?.totals.reduce(
                    (acc, curr) => acc + curr.value / 100,
                    0
                  )}
                />
              </div>
              <Button
                isLoading={isLoading}
                disabled={isLoading}
                onClick={() => addToCart()}
              >
                Compre junto
              </Button>
            </section>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className={handles.compreJunto}>
      <div className={handles.compreJuntoWrapper}>
        <div className={handles.compreJuntoItem}>
          <ExtensionPoint
            id="product-summary.shelf"
            product={ProductSummaryCustom.mapCatalogProductToProductSummary(
              product as any,
              'FIRST_AVAILABLE',
              400
            )}
          />
        </div>
        <div className={handles.compreJuntoPlusIcon}>
          <PlusIcon />
        </div>
        {data?.getBuyTogether?.slice(0, 1)?.map((product) => (
          <Fragment key={product.productId}>
            <div className={handles.compreJuntoItem} key={product.productId}>
              <ExtensionPoint
                id="product-summary.shelf"
                product={ProductSummaryCustom.mapCatalogProductToProductSummary(
                  product as any,
                  'FIRST_AVAILABLE',
                  400
                )}
              />
            </div>
          </Fragment>
        ))}
        <div className={handles.compreJuntoPlusIcon}>
          <EquaIcon />
        </div>
        <div className={handles.compreJuntoTotals}>
          <h5 className={handles.compreJuntoTotalTitle}>
            Comprando junto você paga no total:
          </h5>
          {!simulated ? (
            <p className={handles.compreJuntoTotalValue}>
              <Spinner />
            </p>
          ) : (
            <section className={handles.compreJuntoTotal}>
              <div className={handles.compreJuntoTotalValue}>
                <FormattedPrice
                  value={simulated?.totals.reduce(
                    (acc, curr) => acc + curr.value / 100,
                    0
                  )}
                />
              </div>
              <Button
                isLoading={isLoading}
                disabled={isLoading}
                onClick={() => addToCart()}
              >
                Compre junto
              </Button>
            </section>
          )}
        </div>
      </div>
    </section>
  )
}

export default withToast(CompreJunto)
