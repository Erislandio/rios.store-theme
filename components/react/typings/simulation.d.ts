export interface Simulation {
  items: Item[]
  ratesAndBenefitsData: RatesAndBenefitsData
  paymentData: PaymentData
  selectableGifts: any[]
  marketingData: any
  postalCode: any
  country: string
  logisticsInfo: LogisticsInfo[]
  messages: any[]
  purchaseConditions: PurchaseConditions
  pickupPoints: any[]
  subscriptionData: any
  totals: Total[]
  itemMetadata: ItemMetadata
  sellers: Seller[]
  allowMultipleDeliveries: boolean
  minimumOrderValue: number
}

export interface Item {
  id: string
  requestIndex: number
  quantity: number
  seller: string
  sellerChain: string[]
  tax: number
  priceValidUntil: string
  price: number
  listPrice: number
  rewardValue: number
  sellingPrice: number
  offerings: Offering[]
  priceTags: any[]
  measurementUnit: string
  unitMultiplier: number
  parentItemIndex: any
  parentAssemblyBinding: any
  availability: string
  catalogProvider: string
  priceDefinition: PriceDefinition
  priceTable: any
}

export interface Offering {
  type: string
  id: string
  name: string
  allowGiftMessage: boolean
  attachmentOfferings: AttachmentOffering[]
  price: number
}

export interface AttachmentOffering {
  name: string
  required: boolean
  schema: Schema
}

export interface Schema {
  Cores?: Cores
  'Tipo de fonte'?: TipoDeFonte
  'Tamanho da fonte'?: TamanhoDaFonte
  'Posicionamento do texto'?: PosicionamentoDoTexto
  Texto?: Texto
  text?: Text
}

export interface Cores {
  maximumNumberOfCharacters: number
  domain: any[]
}

export interface TipoDeFonte {
  maximumNumberOfCharacters: number
  domain: any[]
}

export interface TamanhoDaFonte {
  maximumNumberOfCharacters: number
  domain: any[]
}

export interface PosicionamentoDoTexto {
  maximumNumberOfCharacters: number
  domain: any[]
}

export interface Texto {
  maximumNumberOfCharacters: number
  domain: any[]
}

export interface Text {
  maximumNumberOfCharacters: number
  domain: any[]
}

export interface PriceDefinition {
  calculatedSellingPrice: number
  total: number
  sellingPrices: SellingPrice[]
  reason: any
}

export interface SellingPrice {
  value: number
  quantity: number
}

export interface RatesAndBenefitsData {
  rateAndBenefitsIdentifiers: any[]
  teaser: any[]
}

export interface PaymentData {
  installmentOptions: InstallmentOption[]
  paymentSystems: PaymentSystem[]
  payments: any[]
  giftCards: any[]
  giftCardMessages: any[]
  availableAccounts: any[]
  availableTokens: any[]
  availableAssociations: AvailableAssociations
}

export interface InstallmentOption {
  paymentSystem: string
  bin: any
  paymentName: string
  paymentGroupName: string
  value: number
  installments: Installment[]
}

export interface Installment {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: SellerMerchantInstallment[]
}

export interface SellerMerchantInstallment {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}

export interface PaymentSystem {
  id: number
  name: string
  groupName: string
  validator: any
  stringId: string
  template: string
  requiresDocument: boolean
  displayDocument: boolean
  isCustom: boolean
  description: any
  requiresAuthentication: boolean
  dueDate: string
  availablePayments: any
}

export interface AvailableAssociations {}

export interface LogisticsInfo {
  itemIndex: number
  addressId: any
  selectedSla: any
  selectedDeliveryChannel: any
  quantity: number
  shipsTo: string[]
  slas: any[]
  deliveryChannels: DeliveryChannel[]
}

export interface DeliveryChannel {
  id: string
}

export interface PurchaseConditions {
  itemPurchaseConditions: ItemPurchaseCondition[]
}

export interface ItemPurchaseCondition {
  id: string
  seller: string
  sellerChain: string[]
  slas: any[]
  price: number
  listPrice: number
}

export interface Total {
  id: string
  name: string
  value: number
}

export interface ItemMetadata {
  items: Item2[]
}

export interface Item2 {
  id: string
  seller: string
  assemblyOptions: AssemblyOption[]
  catalogProvider: string
}

export interface AssemblyOption {
  id: string
  name: string
  required: boolean
  inputValues: InputValues
  composition: any
}

export interface InputValues {
  Cores: Cores2
  'Tipo de fonte': TipoDeFonte2
  'Tamanho da fonte': TamanhoDaFonte2
  'Posicionamento do texto': PosicionamentoDoTexto2
  Texto: Texto2
}

export interface Cores2 {
  maximumNumberOfCharacters: number
  domain: any[]
}

export interface TipoDeFonte2 {
  maximumNumberOfCharacters: number
  domain: any[]
}

export interface TamanhoDaFonte2 {
  maximumNumberOfCharacters: number
  domain: any[]
}

export interface PosicionamentoDoTexto2 {
  maximumNumberOfCharacters: number
  domain: any[]
}

export interface Texto2 {
  maximumNumberOfCharacters: number
  domain: any[]
}

export interface Seller {
  id: string
  name: string
  logo: string
  minimumOrderValue: number
}
