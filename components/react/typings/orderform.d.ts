interface VtexOrderForm {
  orderFormId: string
  salesChannel: string
  loggedIn: boolean
  isCheckedIn: boolean
  storeId: any
  checkedInPickupPointId: any
  allowManualPrice: boolean
  canEditData: boolean
  userProfileId: string
  userType: any
  ignoreProfileData: boolean
  value: number
  messages: Message[]
  items: Item[]
  selectableGifts: any[]
  totalizers: Totalizer[]
  shippingData: ShippingData
  clientProfileData: ClientProfileData
  paymentData: PaymentData
  marketingData: MarketingData
  sellers: Seller[]
  clientPreferencesData: ClientPreferencesData
  commercialConditionData: any
  storePreferencesData: StorePreferencesData
  giftRegistryData: any
  openTextField: any
  invoiceData: any
  customData: any
  itemMetadata: ItemMetadata
  hooksData: any
  ratesAndBenefitsData: RatesAndBenefitsData
  subscriptionData: any
  merchantContextData: any
  purchaseAgentsData: any
  itemsOrdination: any
}

interface Message {
  code: string
  text: string
  status: string
  fields: Fields
}

interface Fields {
  itemIndex?: string
  skuName?: string
}

interface Item {
  uniqueId: string
  id: string
  productId: string
  productRefId: string
  refId: string
  ean?: string
  name: string
  skuName: string
  modalType: any
  parentItemIndex: any
  parentAssemblyBinding: any
  assemblies: any[]
  priceValidUntil: string
  tax: number
  price: number
  listPrice: number
  manualPrice: any
  manualPriceAppliedBy: any
  sellingPrice: number
  rewardValue: number
  isGift: boolean
  additionalInfo: AdditionalInfo
  preSaleDate: any
  productCategoryIds: string
  productCategories: ProductCategories
  quantity: number
  seller: string
  sellerChain: string[]
  imageUrl: string
  detailUrl: string
  components: any[]
  bundleItems: any[]
  attachments: any[]
  attachmentOfferings: any[]
  offerings: any[]
  priceTags: any[]
  availability: string
  measurementUnit: string
  unitMultiplier: number
  manufacturerCode: any
  priceDefinition: PriceDefinition
  taxCode?: string
}

interface AdditionalInfo {
  dimension: any
  brandName: string
  brandId: string
  offeringInfo: any
  offeringType: any
  offeringTypeId: any
}

interface ProductCategories {
  '17'?: string
  '15'?: string
  '1': string
  '9'?: string
  '7'?: string
  '8'?: string
  '3'?: string
  '2'?: string
}

interface PriceDefinition {
  calculatedSellingPrice: number
  total: number
  sellingPrices: SellingPrice[]
  reason: any
}

interface SellingPrice {
  value: number
  quantity: number
}

interface Totalizer {
  id: string
  name: string
  value: number
}

interface ShippingData {
  address: any
  logisticsInfo: LogisticsInfo[]
  selectedAddresses: any[]
  availableAddresses: any[]
  pickupPoints: any[]
  contactInformation: any[]
}

interface LogisticsInfo {
  itemIndex: number
  selectedSla: any
  selectedDeliveryChannel: any
  addressId: any
  slas: any[]
  shipsTo: string[]
  itemId: string
  deliveryChannels: DeliveryChannel[]
}

interface DeliveryChannel {
  id: string
}

interface ClientProfileData {
  email: string
  firstName: any
  lastName: any
  document: any
  documentType: any
  phone: any
  corporateName: any
  tradeName: any
  corporateDocument: any
  stateInscription: any
  corporatePhone: any
  isCorporate: boolean
  profileCompleteOnLoading: boolean
  profileErrorOnLoading: boolean
  customerClass: any
}

interface PaymentData {
  updateStatus: string
  installmentOptions: InstallmentOption[]
  paymentSystems: PaymentSystem[]
  payments: any[]
  giftCards: any[]
  giftCardMessages: any[]
  availableAccounts: any[]
  availableTokens: any[]
  availableAssociations: AvailableAssociations
}

interface InstallmentOption {
  paymentSystem: string
  bin: any
  paymentName: any
  paymentGroupName: any
  value: number
  installments: Installment[]
}

interface Installment {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: SellerMerchantInstallment[]
}

interface SellerMerchantInstallment {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}

interface PaymentSystem {
  id: number
  name: string
  groupName: string
  validator: Validator
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

interface Validator {
  regex?: string
  mask?: string
  cardCodeRegex?: string
  cardCodeMask?: string
  weights?: number[]
  useCvv: boolean
  useExpirationDate: boolean
  useCardHolderName: boolean
  useBillingAddress: boolean
}

interface AvailableAssociations {}

interface MarketingData {
  utmSource: any
  utmMedium: any
  utmCampaign: any
  utmipage: any
  utmiPart: any
  utmiCampaign: any
  coupon: any
  marketingTags: any[]
}

interface Seller {
  id: string
  name: string
  logo: string
  minimumOrderValue: number
}

interface ClientPreferencesData {
  locale: string
  optinNewsLetter: any
}

interface StorePreferencesData {
  countryCode: string
  saveUserData: boolean
  timeZone: string
  currencyCode: string
  currencyLocale: number
  currencySymbol: string
  currencyFormatInfo: CurrencyFormatInfo
}

interface CurrencyFormatInfo {
  currencyDecimalDigits: number
  currencyDecimalSeparator: string
  currencyGroupSeparator: string
  currencyGroupSize: number
  startsWithCurrencySymbol: boolean
}

interface ItemMetadata {
  items: Item2[]
}

interface Item2 {
  id: string
  seller: string
  name: string
  skuName: string
  productId: string
  refId: string
  ean?: string
  imageUrl: string
  detailUrl: string
  assemblyOptions: any[]
}

interface RatesAndBenefitsData {
  rateAndBenefitsIdentifiers: any[]
  teaser: any[]
}
