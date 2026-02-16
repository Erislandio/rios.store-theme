import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { Modal } from 'vtex.styleguide'

const CSS_HANDLES = [
  'exitIntentModalContainer',
  'exitIntentModalContent',
  'exitIntentModalTitle',
  'exitIntentModalText',
  'exitIntentModalContentProducts',
] as const

interface Props {
  title?: string
  text?: string
  collectionId?: string
}

import { ProductTypes } from 'vtex.product-context'
import { ProductSummaryCustom } from 'vtex.product-summary'
import { ExtensionPoint } from 'vtex.render-runtime'
import SEARCH from './queries/search.gql'

const ExitIntentModal: StoreFrontFC<Props> = ({
  title = 'Espere! Não vá embora ainda!',
  text = 'Temos ofertas especiais esperando por você. Confira nossos lançamentos!',
  collectionId = '189',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const { handles } = useCssHandles(CSS_HANDLES)
  const { data, loading } = useQuery<{
    productSearch: { products: ProductTypes.Product[] }
  }>(SEARCH, {
    ssr: false,
    variables: {
      collectionId,
    },
    skip: !collectionId,
  })

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        setIsOpen(true)
        setHasTriggered(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasTriggered])

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!data?.productSearch?.products?.length || loading) {
    return null
  }

  const { products } = data.productSearch

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className={handles.exitIntentModalContainer}>
        <div className={handles.exitIntentModalContent}>
          <h2 className={`${handles.exitIntentModalTitle} t-heading-3 mb3`}>
            {title}
          </h2>
          <p className={`${handles.exitIntentModalText} t-body`}>{text}</p>
        </div>
        <div className={handles.exitIntentModalContentProducts}>
          {products.slice(0, 2).map((product) => {
            const item = ProductSummaryCustom.mapCatalogProductToProductSummary(
              product,
              'FIRST_AVAILABLE',
              330
            )

            return (
              <ExtensionPoint
                id="product-summary.shelf"
                key={product.productId}
                product={item}
              />
            )
          })}
        </div>
      </div>
    </Modal>
  )
}

ExitIntentModal.schema = {
  title: 'Exit Intent Modal',
  description: 'Modal que aparece quando o usuário sai da página',
  properties: {
    title: {
      type: 'string',
      default: 'Não vá embora!',
    },
    text: {
      type: 'string',
      default: 'Veja o que preparamos para você!',
    },
    collectionId: {
      type: 'string',
      default: '189',
    },
  },
}

export default ExitIntentModal
