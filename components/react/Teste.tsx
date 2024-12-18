import React from 'react'

import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductTypes'

const Teste: React.FC = () => {
  const { product } = useProduct() as ProductContextState
  console.log('🚀 ~ product:', product)

  return null
}

export default Teste
