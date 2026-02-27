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
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.4002 12.6399H12.8402V20.3999H7.56022V12.6399H0.000214934V7.75994H7.56022V-5.8651e-05H12.8402V7.75994H20.4002V12.6399Z"
      fill="#1B1B1B"
    />
  </svg>
)

export const EquaIcon = () => (
  <svg
    width="22"
    height="15"
    viewBox="0 0 22 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.8002 -1.95503e-05V4.87998H0.000156283V-1.95503e-05H21.8002ZM21.8002 9.59998V14.48H0.000156283V9.59998H21.8002Z"
      fill="#1B1B1B"
    />
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
          <h5 className={handles.compreJuntoTotalTitle}>COMPRE JUNTO</h5>
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
                Adicionar à sacola
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
              800
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
                  800
                )}
              />
            </div>
          </Fragment>
        ))}
        <div className={handles.compreJuntoPlusIcon}>
          <EquaIcon />
        </div>
        <div className={handles.compreJuntoTotals}>
          <h5 className={handles.compreJuntoTotalTitle}>COMPRE JUNTO</h5>
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
                Adicionar à sacola
              </Button>
            </section>
          )}
        </div>
      </div>
    </section>
  )
}

export default withToast(CompreJunto)
