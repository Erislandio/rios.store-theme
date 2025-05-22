interface ProductSearch {
  products: Product[]
  __typename: string
}

interface Product {
  productId: string
  productName: string
  link: string
  clusterHighlights: ClusterHighlights[]
  items: Item[]
  __typename: string
  selected: boolean
  quantity: number
}

interface Installments {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  Name: string
  PaymentSystemName: string
}

interface ClusterHighlights {
  id: string
  name: string
}

interface Item {
  name: string
  nameComplete: string
  sellers: Seller[]
  images: Image[]
  __typename: string
  itemId: string
}

interface Seller {
  commertialOffer: CommertialOffer
  __typename: string
}

interface CommertialOffer {
  Price: number
  ListPrice: number
  spotPrice: number
  __typename: string
}

interface Image {
  imageUrl: string
  __typename: string
}
