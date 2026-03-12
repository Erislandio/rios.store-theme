export interface KitProduct {
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
  clusterHighlights: KitClusterHighlight[]
  properties: KitProperty[]
  items: KitItem[]
}

export interface KitClusterHighlight {
  id: string
  name: string
}

export interface KitProperty {
  originalName: string
  name: string
}

export interface KitItem {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  images: KitImage[]
  measurementUnit: string
  unitMultiplier: number
  estimatedDateArrival: string | null
  variations: KitVariation[]
  sellers: KitSeller[]
}

export interface KitImage {
  cacheId: string
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string
}

export interface KitVariation {
  originalName: string
  name: string
  values: string[]
}

export interface KitSeller {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: KitCommertialOffer
}

export interface KitCommertialOffer {
  Installments: KitInstallment[]
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

export interface KitInstallment {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}
