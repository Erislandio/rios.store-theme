import React, { useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-apollo'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
// import { useDevice } from 'vtex.device-detector'
import { FormattedPrice } from 'vtex.formatted-price'
import { OrderForm } from 'vtex.order-manager'
import { usePixel } from 'vtex.pixel-manager'
import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import { Button, Checkbox, NumericStepper, Spinner } from 'vtex.styleguide'
import './BuyTogether.styles.css'

// import type { Product, ProductSearch } from '../../typings/product'
import BUY_TOGETHER from './buyTogether.gql'

const CSS_HANDLES = [
  'buyTogether',
  'buyTogetherTitle',
  'buyTogetherUl',
  'buyTogetherLi',
  'buyTogetherFooterItem',
  'plusIcon',
  'buyTogetherItemTitle',
  'buyTogetherFinish',
  'buyTogetherFinishP',
  'buyTogetherItemImage',
  'buyTogetherWrapper',
  'buyTogetherpriceContainer',
  'mobileContainerPrice',
  'mobileContainerCheckbox',
  'buyTogettherListPriceContainer',
  'buyTogetherSavingPrice',
  'priceText',
  'buyTogetherHighlightsContainer',
  'buyTogetherHighlightsName',
] as const

const BuyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="31"
    height="30"
    viewBox="0 0 31 30"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.45752 5C2.45752 4.75136 2.55629 4.5129 2.73211 4.33709C2.90792 4.16127 3.14638 4.0625 3.39502 4.0625H4.87127C5.54938 4.06254 6.20465 4.30757 6.71641 4.75249C7.22816 5.1974 7.56194 5.81223 7.65627 6.48375L7.73252 7.0275H25.1888C25.6555 7.02751 26.115 7.14368 26.5256 7.36555C26.9363 7.58742 27.2853 7.90801 27.5411 8.29841C27.7969 8.68881 27.9516 9.13674 27.9911 9.60183C28.0307 10.0669 27.9538 10.5345 27.7675 10.9625L24.4325 18.6225C24.2139 19.1247 23.8535 19.5521 23.3954 19.8523C22.9373 20.1526 22.4015 20.3125 21.8538 20.3125H10.1525C9.47441 20.3125 8.81914 20.0674 8.30738 19.6225C7.79563 19.1776 7.46185 18.5628 7.36752 17.8912L5.80002 6.745C5.76866 6.52101 5.65738 6.31591 5.4867 6.16752C5.31602 6.01912 5.09744 5.93743 4.87127 5.9375H3.39627C3.14763 5.9375 2.90917 5.83873 2.73336 5.66291C2.55754 5.4871 2.45877 5.24864 2.45877 5M7.99752 8.9025L9.22502 17.63C9.25638 17.854 9.36766 18.0591 9.53834 18.2075C9.70902 18.3559 9.9276 18.4376 10.1538 18.4375H21.855C22.0376 18.4376 22.2162 18.3845 22.369 18.2846C22.5217 18.1847 22.642 18.0423 22.715 17.875L26.0488 10.2125C26.1105 10.07 26.1358 9.91437 26.1225 9.75964C26.1092 9.60491 26.0576 9.45591 25.9725 9.32603C25.8874 9.19614 25.7713 9.08945 25.6347 9.01552C25.4981 8.9416 25.3453 8.90276 25.19 8.9025H7.99752Z"
      fill="#F0F6FE"
    />
    <path
      d="M8.04272 24.375C8.04272 23.7948 8.27319 23.2384 8.68343 22.8282C9.09366 22.418 9.65006 22.1875 10.2302 22.1875C10.8104 22.1875 11.3668 22.418 11.777 22.8282C12.1873 23.2384 12.4177 23.7948 12.4177 24.375C12.4177 24.9552 12.1873 25.5116 11.777 25.9218C11.3668 26.332 10.8104 26.5625 10.2302 26.5625C9.65006 26.5625 9.09366 26.332 8.68343 25.9218C8.27319 25.5116 8.04272 24.9552 8.04272 24.375ZM20.9002 22.1875C20.3201 22.1875 19.7637 22.418 19.3534 22.8282C18.9432 23.2384 18.7127 23.7948 18.7127 24.375C18.7127 24.9552 18.9432 25.5116 19.3534 25.9218C19.7637 26.332 20.3201 26.5625 20.9002 26.5625C21.4804 26.5625 22.0368 26.332 22.447 25.9218C22.8573 25.5116 23.0877 24.9552 23.0877 24.375C23.0877 23.7948 22.8573 23.2384 22.447 22.8282C22.0368 22.418 21.4804 22.1875 20.9002 22.1875Z"
      fill="#F0F6FE"
    />
    <circle cx="16.7502" cy="9.99944" r="4.46429" fill="#2643A8" />
    <path
      d="M16.75 3.75C13.2982 3.75 10.5 6.54822 10.5 10C10.5 13.4518 13.2982 16.25 16.75 16.25C20.2018 16.25 23 13.4518 23 10C23 6.54822 20.2018 3.75 16.75 3.75ZM16.75 7.23837C16.9908 7.23837 17.186 7.4336 17.186 7.67442V9.56395H19.0756C19.3164 9.56395 19.5116 9.75918 19.5116 10C19.5116 10.2408 19.3164 10.436 19.0756 10.436H17.186V12.3256C17.186 12.5664 16.9908 12.7616 16.75 12.7616C16.5092 12.7616 16.314 12.5664 16.314 12.3256V10.436H14.4244C14.1836 10.436 13.9884 10.2408 13.9884 10C13.9884 9.75918 14.1836 9.56395 14.4244 9.56395H16.314V7.67442C16.314 7.4336 16.5092 7.23837 16.75 7.23837Z"
      fill="#F0F6FE"
    />
  </svg>
)

const PlusIcon: React.FC = React.memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.0389 5.4707C15.5487 5.47137 15.9614 5.88519 15.9608 6.39499L15.9382 23.6258C15.9375 24.1356 15.5237 24.5483 15.0139 24.5476C14.5041 24.547 14.0914 24.1331 14.092 23.6233L14.1146 6.39257C14.1153 5.88277 14.5291 5.47004 15.0389 5.4707Z"
      fill="#BC1818"
    />
    <path
      fill-rule="evenodd"
      clipRule="evenodd"
      d="M5.46191 15.0092C5.46191 14.4994 5.87519 14.0861 6.38499 14.0861H23.6158C24.1256 14.0861 24.5388 14.4994 24.5388 15.0092C24.5388 15.519 24.1256 15.9322 23.6158 15.9322H6.38499C5.87519 15.9322 5.46191 15.519 5.46191 15.0092Z"
      fill="#BC1818"
    />
  </svg>
))

const RefreshIcon: React.FC = React.memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M8 14.0098C6.45556 14.0098 5.11667 13.5015 3.98333 12.4851C2.85 11.4687 2.2 10.1991 2.03333 8.67643H3.4C3.55556 9.83199 4.06956 10.7875 4.942 11.5431C5.81444 12.2987 6.83378 12.6764 8 12.6764C9.3 12.6764 10.4029 12.2238 11.3087 11.3184C12.2144 10.4131 12.6671 9.31021 12.6667 8.00977C12.6667 6.70977 12.214 5.6071 11.3087 4.70177C10.4033 3.79643 9.30044 3.34354 8 3.3431C7.23333 3.3431 6.51667 3.52088 5.85 3.87643C5.18333 4.23199 4.62222 4.72088 4.16667 5.3431H6V6.67643H2V2.67643H3.33333V4.2431C3.9 3.53199 4.59178 2.98199 5.40867 2.5931C6.22556 2.20421 7.08933 2.00977 8 2.00977C8.83333 2.00977 9.614 2.16821 10.342 2.4851C11.07 2.80199 11.7033 3.22954 12.242 3.76777C12.7807 4.30688 13.2084 4.94021 13.5253 5.66777C13.8422 6.39532 14.0004 7.17599 14 8.00977C14 8.8431 13.8418 9.62377 13.5253 10.3518C13.2089 11.0798 12.7811 11.7131 12.242 12.2518C11.7029 12.7904 11.0696 13.2182 10.342 13.5351C9.61444 13.852 8.83378 14.0102 8 14.0098Z"
      fill="#2643A8"
    />
  </svg>
))

interface ProductItemProps {
  item: Product
  index: number
  onCheck: (index: number) => void
  onChangeIndex: (index: number) => void
  onChangeQuantity: (quantity: number, index: number) => void
}

const ProductItem: React.FC<ProductItemProps> = React.memo(
  ({ item, index, onCheck, onChangeIndex, onChangeQuantity }) => {
    const { handles } = useCssHandles(CSS_HANDLES)
    const [{ images, sellers }] = item.items

    const [
      {
        commertialOffer: { Price, ListPrice },
      },
    ] = sellers

    const handleChange = () => onCheck(index)

    const handleChangeQuantity = useCallback(async (quantity: number) => {
      onChangeQuantity(quantity, index)
    }, [])

    return (
      <li
        onClick={(e) => {
          e.stopPropagation()
          handleChange()
        }}
        className={applyModifiers(
          handles.buyTogetherLi,
          item.selected ? 'active' : ''
        )}
        title={item.productName}
      >
        <Checkbox checked={item.selected} onChange={() => {}} />
        <img
          className={handles.buyTogetherItemImage}
          alt={item.productName}
          src={images[0].imageUrl}
          height={228}
          loading="lazy"
        />
        <div className={handles.buyTogetherFooterItem}>
          <div className={handles.buyTogetherHighlightsContainer}>
            {item.clusterHighlights.map((item) => (
              <span className={handles.buyTogetherHighlightsName}>
                {item.name}
              </span>
            ))}
          </div>
          <h4 className={handles.buyTogetherItemTitle}>{item.productName}</h4>
          <div className={handles.buyTogettherListPriceContainer}>
            <FormattedPrice value={ListPrice} />
            <span className={handles.buyTogetherSavingPrice}>
              {Math.round(((ListPrice - Price) / ListPrice) * 100)}%
            </span>
          </div>
          <div className="flex flex-row items-end mt1 mb4">
            <FormattedPrice value={Price} />
            <p className={handles.priceText}>à vista</p>
          </div>
          <Button
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
              onChangeIndex(index)
            }}
          >
            <RefreshIcon />
          </Button>
          <NumericStepper
            unitMultiplier={1}
            minValue={1}
            onChange={handleChangeQuantity}
            value={item.quantity}
          />
        </div>
      </li>
    )
  }
)

const BuyTogether: React.FC = () => {
  const { product } = useProduct() as ProductContextState
  const { handles } = useCssHandles(CSS_HANDLES)
  const [products, setProducts] = useState<Product[]>([])
  const { push } = usePixel()
  const {
    orderForm: { id },
    setOrderForm,
  } = OrderForm.useOrderForm()

  const [isAdding, setAdding] = useState(false)

  const { loading, data } = useQuery<{
    productSearch: ProductSearch
  }>(BUY_TOGETHER, {
    variables: {
      category: product?.categoryTree?.length
        ? product?.categoryTree[0].name
        : '',
    },
    skip: !product?.categoryTree?.length,
    fetchPolicy: 'network-only',
    onCompleted: (fetchedData) => {
      if (fetchedData?.productSearch?.products?.length) {
        const productsData = fetchedData.productSearch.products.map(
          (product) => {
            return {
              ...product,
              quantity: 1,
            }
          }
        )
        setProducts(productsData.slice(0, 3))
      }
    },
  })

  const changeIndex = useCallback(
    (index: number) => {
      const searchableProducts = data?.productSearch?.products ?? []

      const searchableProductsFormatted = searchableProducts.map((product) => {
        return {
          ...product,
          quantity: 1,
        }
      })

      const productIds = products.map((item) => item.productId)
      const newData = searchableProductsFormatted.filter(
        (item) => !productIds.includes(item.productId)
      )

      if (!newData.length) return

      const randomProductIndex = Math.floor(Math.random() * newData.length)
      const newProduct = newData[randomProductIndex] ?? newData[0]

      setProducts((prevProducts) =>
        prevProducts.map((item, itemIndex) =>
          itemIndex === index ? newProduct : item
        )
      )
    },
    [data, products]
  )
  ///-------------

  const handleCheck = useCallback((index: number) => {
    setProducts((prevProducts) => {
      return prevProducts.map((item, i) =>
        i === index ? { ...item, selected: !item.selected } : item
      )
    })
  }, [])

  const handleChangeQuantity = useCallback((quantity: any, index: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((item, i) =>
        i === index ? { ...item, quantity: quantity.value } : item
      )
    )
  }, [])

  const selecteds = useMemo(
    () => products.filter((item) => item.selected),
    [products]
  )

  const total = selecteds.reduce((acc, current) => {
    return (
      acc +
        current?.items[0]?.sellers[0]?.commertialOffer?.Price *
          current.quantity ?? 0
    )
  }, 0)

  const addTocart = async () => {
    setAdding(true)
    const selectedItems = selecteds.filter((item) => item.selected)
    const addItems = selectedItems.map((item, index) => ({
      quantity: item.quantity,
      seller: '1',
      id: item.items[0].itemId,
      index,
    }))

    const response = await fetch(`/api/checkout/pub/orderForm/${id}/items`, {
      method: 'POST',
      body: JSON.stringify({
        orderItems: addItems,
      }),
    })

    const newOrderForm = await response.json()

    newOrderForm.items = newOrderForm.items.map((item: any) => ({
      ...item,
      imageUrls: {
        at1x: item.imageUrl,
        at2x: item.imageUrl,
        at3x: item.imageUrl,
      },
    }))

    push({
      event: 'addToCart',
      id: 'add-to-cart-button',
    })

    setOrderForm(newOrderForm)

    setAdding(false)
  }

  if (loading) {
    return (
      <section
        className={applyModifiers(
          handles.buyTogether,
          loading ? 'loading' : ''
        )}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner />
        </div>
      </section>
    )
  }

  return (
    <section
      className={applyModifiers(handles.buyTogether, loading ? 'loading' : '')}
    >
      <h3 className={handles.buyTogetherTitle}>Compre junto</h3>
      <div className={handles.buyTogetherWrapper}>
        <ul className={handles.buyTogetherUl}>
          {products.map((item, index, array) => (
            <React.Fragment key={item.productId}>
              <ProductItem
                item={item}
                index={index}
                onCheck={handleCheck}
                onChangeIndex={changeIndex}
                onChangeQuantity={handleChangeQuantity}
              />
              {index !== array.length - 1 && (
                <li className={handles.plusIcon}>
                  <PlusIcon />
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
        <div className={handles.buyTogetherFinish}>
          {selecteds.length ? (
            <p className={handles.buyTogetherFinishP}>
              Compre os {selecteds.length} produtos por
            </p>
          ) : (
            <p className={handles.buyTogetherFinishP}>
              Selecione algum produto
            </p>
          )}
          <div
            className={handles.buyTogetherpriceContainer}
            style={{
              minHeight: '40px',
            }}
          >
            {selecteds.length ? <FormattedPrice value={total} /> : null}
          </div>
          <Button
            onClick={() => addTocart()}
            isLoading={isAdding}
            disabled={!selecteds.length}
          >
            <BuyIcon />
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>
    </section>
  )
}

export default React.memo(BuyTogether)
