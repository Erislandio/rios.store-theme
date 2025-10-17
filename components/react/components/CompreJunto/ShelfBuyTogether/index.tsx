import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedCurrency } from 'vtex.format-currency'
import { CSS_HANDLES } from 'vtex.slider-layout/react/SliderLayout'

/**
 * Manipula URL da imagem, redimensionando para o tamanho desejado.
 *
 * @param {String} url URL da imagem a ser manipulada.
 * @param {Integer} width Largura para redimensionamento da imagem.
 * @param {Integer} height altura para redimensionamento da imagem.
 * @returns {String} url com dimensões alteradas
 */
export const parseImageUrl = (url = '', width = 100, height = 100) => {
  return url.replace(
    /https?:\/\/(.+)(\/ids\/\d{1,})(-\d{1,}-\d{1,})?/gi,
    `//$1$2-${width}-${height}`
  )
}

const CSS_HANDLES = [
  'buytogetherProductInfo',
  'buytogetherProductName',
  'buytogetherProductPrice',
  'buytogetherProductMedia',
  'buytogetherProduct',
  'buytogetherProductImage',
  'buytogetherProductInstallments',
  'buytogetherProductPriceBest',
] as const

export const ShelfBuyTogether = ({ product, currentSku }: any) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  const sku = currentSku || product?.items?.[0] // TODO: get selected sku from page
  const commertialOffer = sku?.sellers?.[0]?.commertialOffer
  const image =
    sku?.images?.find(
      (img: any) => img?.imageLabel?.toLowerCase?.() === 'still'
    ) || sku?.images?.[0]

  const skuInfo = {
    id: sku.itemId,
    nameComplete: sku.nameComplete,
    priceList: commertialOffer?.ListPrice,
    priceBest: commertialOffer?.Price,
    available: !!commertialOffer?.AvailableQuantity,
    hasPriceBest: commertialOffer?.ListPrice > commertialOffer?.Price,
    image,
    installment: commertialOffer?.Installments.filter(
      (installment: any) =>
        installment.Name.toLowerCase().includes('visa') ||
        installment.Name.toLowerCase().includes('mastercard')
    ).pop(),
  }

  return (
    <div className={handles.buytogetherProduct} title={skuInfo.nameComplete}>
      <div className={handles.buytogetherProductMedia}>
        <img
          width={290}
          height={394}
          className={handles.buytogetherProductImage}
          src={parseImageUrl(skuInfo.image?.imageUrl, 300, 300)}
          alt={skuInfo.image?.imageText}
        />
      </div>
      <div className={handles.buytogetherProductInfo}>
        <div className={handles.buytogetherProductName}>
          {skuInfo.nameComplete}
        </div>
        <div className={handles.buytogetherProductPrice}>
          {skuInfo.hasPriceBest && (
            <div className={handles.buytogetherProductPrice}>
              {<FormattedCurrency value={skuInfo.priceList} />}
            </div>
          )}
          <div className={handles.buytogetherProductPriceBest}>
            {<FormattedCurrency value={skuInfo.priceBest} />}
          </div>
        </div>
      </div>
    </div>
  )
}
