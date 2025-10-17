import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import { Collapsible } from 'vtex.styleguide'

const CSS_HANDLES = [
  'customProductDescription',
  'customProductDescriptionContent',
  'customProductDescriptionHeader',
] as const

export default function CustomproductDescripiton() {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { product } = useProduct() as ProductContextState
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className={handles.customProductDescription}>
      <Collapsible
        isOpen={isOpen}
        header={
          <h4 className={handles.customProductDescriptionHeader}>Descrição</h4>
        }
        arrowAlign="center"
        align="right"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={handles.customProductDescriptionContent}
          dangerouslySetInnerHTML={{ __html: product?.description ?? '' }}
        />
      </Collapsible>
    </section>
  )
}
