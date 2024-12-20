import React, { useEffect, useState } from 'react'

import type { FunctionComponent } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import { formatCurrency } from './utils/formatCurrency'
import { getDefaultSeller } from './utils/getDefaultSeller'
const CSS_HANDLES = [
  'pixPaymentContainer',
  'pixPaymentHeaderContainer',
  'pixPaymentValueContainer',
  'pixPaymentText',
  'pixPaymentInfoContainer',
  'pixPaymentImageContainer',
  'pixImage',
  'pixPaymentStepByStepContainer',
  'pixStepContainer',
  'pixStepNumber',
  'pixInfoStep',
  'pixPaymentInterest',
  'pixPaymentValue',
  'pixTextImage',
  'pixInfoStepStrong',
]

const PixPaymentMethods: FunctionComponent = () => {
  const productContext = useProduct()
  const { handles } = useCssHandles(CSS_HANDLES)
  const [productValue, setProductValue] = useState<number>()

  useEffect(() => {
    const itemId = productContext?.selectedItem?.itemId

    const productsSkuSelected = productContext?.product?.items.find(
      (item) => item.itemId === itemId
    )

    const sellerSkuSelected = getDefaultSeller(productsSkuSelected)

    const skuValue = sellerSkuSelected?.commertialOffer?.spotPrice ?? []

    setProductValue(skuValue)
  }, [productContext])

  return (
    <div className={handles.pixPaymentContainer}>
      <div className={handles.pixPaymentHeaderContainer}>
        <div className={handles.pixPaymentValueContainer}>
          <span className={handles.pixPaymentValue}>
            {formatCurrency(productValue)}
          </span>
          <span className={handles.pixPaymentInterest}>Sem juros</span>
        </div>
        <p className={handles.pixPaymentText}>
          O pagamento é instantâneo e só pode ser à vista. Na etapa de
          finalização da compra, a gente explica direitinho como pagar com Pix.
        </p>
      </div>
      <div className={handles.pixPaymentInfoContainer}>
        <div className={handles.pixPaymentImageContainer}>
          <img
            src="https://romazi.vtexassets.com/assets/vtex.file-manager-graphql/images/f7d51bcc-a9e5-42ab-8b2c-4ea3e1d08be4___f0a8dbafe8a7f709b88f3c06c3454bcb.png"
            alt="pix-payment-method"
            className={handles.pixImage}
          />
          <p className={handles.pixTextImage}>
            Veja como é fácil pagar com pix:
          </p>
        </div>
        <div className={handles.pixPaymentStepByStepContainer}>
          <div className={handles.pixStepContainer}>
            <span className={handles.pixStepNumber}>1</span>
            <p className={handles.pixInfoStep}>
              Para realizar o pagamento, <br /> clique no botão{' '}
              <strong className={handles.pixInfoStepStrong}>
                “Conclui compra”
              </strong>
            </p>
          </div>
          <div className={handles.pixStepContainer}>
            <span className={handles.pixStepNumber}>2</span>
            <p className={handles.pixInfoStep}>
              Você será direcionado para uma nova tela com as informações de
              pagamento
            </p>
          </div>
          <div className={handles.pixStepContainer}>
            <span className={handles.pixStepNumber}>3</span>
            <p className={handles.pixInfoStep}>
              Pague dentro do prazo exibido no cronômetro após concluir a
              compra, caso contrário, o pedido será cancelado e a compra deverá
              ser refeita
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PixPaymentMethods
