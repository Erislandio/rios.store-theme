export interface ProductCompreJunto {
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: any
  linkText: string
  productReference: string
  productReferenceCode: string
  categoryId: string
  productTitle: string
  metaTagDescription: string
  releaseDate: string
  clusterHighlights: ClusterHighlights
  productClusters: ProductClusters
  searchableClusters: SearchableClusters
  categories: string[]
  categoriesIds: string[]
  link: string
  description: string
  items: Item[]
  skuSpecifications: SkuSpecification[]
}

export interface ClusterHighlights {
  '155': string
  '165': string
}

export interface ProductClusters {
  '155': string
  '165': string
}

export interface SearchableClusters {
  '155': string
  '165': string
}

export interface Item {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: ReferenceId[]
  measurementUnit: string
  unitMultiplier: number
  modalType: any
  isKit: boolean
  images: Image[]
  Cor: string[]
  Tamanho: string[]
  variations: string[]
  sellers: Seller[]
  Videos: any[]
  estimatedDateArrival: any
}

export interface ReferenceId {
  Key: string
  Value: string
}

export interface Image {
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string
  imageLastModified: string
}

export interface Seller {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: CommertialOffer
}

export interface CommertialOffer {
  Installments: any[]
  DiscountHighLight: any[]
  GiftSkuIds: any[]
  Teasers: any[]
  PromotionTeasers: any[]
  BuyTogether: any[]
  ItemMetadataAttachment: any[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  FullSellingPrice: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  DeliverySlaSamples: any[]
  GetInfoErrorMessage: string
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: PaymentOptions
}

export interface PaymentOptions {
  installmentOptions: any[]
  paymentSystems: any[]
  payments: any[]
  giftCards: any[]
  giftCardMessages: any[]
  availableAccounts: any[]
  availableTokens: any[]
}

export interface SkuSpecification {
  field: Field
  values: Value[]
}

export interface Field {
  id: number
  name: string
  isActive: boolean
  position: number
  type: string
}

export interface Value {
  id: string
  name: string
  position: number
}
