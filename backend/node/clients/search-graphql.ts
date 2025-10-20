import type { InstanceOptions, IOContext } from '@vtex/api'
import DataLoader from 'dataloader'

import { GraphQLServer } from './graphql-server'

export interface ProductsByIdentifier {
  brand: string
  brandId: number
  cacheId: string
  categoryId: string
  description: string
  link: string
  linkText: string
  productId: string
  productName: string
  productReference: string
  titleTag: string
  metaTagDescription: string
  jsonSpecifications: string
  releaseDate: string
  items: Item[]
}

export interface Item {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  measurementUnit: string
  unitMultiplier: number
  images: Image[]
  estimatedDateArrival: string
  sellers: Seller[]
}

export interface Image {
  cacheId: string
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string
}

export interface Seller {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: CommertialOffer
}

export interface CommertialOffer {
  Price: number
  ListPrice: number
  spotPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  Tax: number
  taxPercentage: number
  CacheVersionUsedToCallCheckout: string
}
export interface ProductsByIdentifierResponse {
  productsByIdentifier: ProductsByIdentifier[]
}

export interface ProductArgs {
  values: string[]
}

export const query = `
query product($values: [ID!]!){
  productsByIdentifier(field: sku, values: $values) {
    brand
    brandId
    cacheId
    categoryId
    description
    link
    linkText
    productId
    productName
    productReference
    titleTag
    metaTagDescription
    jsonSpecifications
    releaseDate
    items(filter: ALL) {
      itemId
      name
      nameComplete
      complementName
      ean
      measurementUnit
      unitMultiplier
      images {
        cacheId
        imageId
        imageLabel
        imageTag
        imageUrl
        imageText
      }
      estimatedDateArrival
      sellers {
        sellerId
        sellerName
        addToCartLink
        sellerDefault
        commertialOffer {
          Price
          ListPrice
          spotPrice
          PriceWithoutDiscount
          RewardValue
          PriceValidUntil
          AvailableQuantity
          Tax
          taxPercentage
          CacheVersionUsedToCallCheckout
        }
      }
    }
  }
}
`

const extensions = {
  persistedQuery: {
    provider: 'vtex.search-graphql@0.x',
    sender: 'vtex.checkout-graphql@0.x',
  },
}

export class SearchGraphQL extends GraphQLServer {
  private productLoader: DataLoader<string, ProductsByIdentifier>

  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super(ctx, opts)

    this.productLoader = new DataLoader(async (keys) => {
      const { data, errors } = await this.query<
        ProductsByIdentifierResponse,
        ProductArgs
      >(query, { values: keys }, extensions, { metric: 'get-products' })

      if (errors && errors.length > 0) {
        const [error] = errors

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return keys.map(() => error.originalError!)
      }

      return data?.productsByIdentifier as ProductsByIdentifier[]
    })
  }

  public product = (skuIds: string[]) => this.productLoader.loadMany(skuIds)
}
