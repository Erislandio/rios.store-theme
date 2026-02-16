interface ProductSearch {
  products: Product[]
}

interface Product {
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
  specification: any
  skuSpecifications: SkuSpecification[]
  items: Item[]
}

interface SkuSpecification {
  field: Field
  values: Value[]
}

interface Field {
  originalName: string
  name: string
}

interface Value {
  originalName: string
  name: string
}

interface Item {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  measurementUnit: string
  unitMultiplier: number
  estimatedDateArrival: any
  sellers: Seller[]
}

interface Seller {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: CommertialOffer
}

interface CommertialOffer {
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
