import type { Item, Seller } from 'vtex.product-context/react/ProductTypes'

/**
 * @param productItem A product SKU.
 * @return All sellers from SKU.
 * @version 1.0.0
 */
const getSellers = (productItem?: Item | null): Seller[] => {
  return productItem?.sellers ?? []
}

/**
 * @param productItem A product SKU.
 * @return The default seller of the product SKU.
 * @version 1.0.0
 */
export const getDefaultSeller = (productItem?: Item | null): Seller => {
  const sellers = getSellers(productItem)

  return sellers.find(({ sellerDefault }) => sellerDefault) ?? sellers[0]
}
