import React, { Fragment } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { OrderForm } from 'vtex.order-manager'
import { PixelContext } from 'vtex.pixel-manager'

export const CartIcon = () => (
  <div style={{ minWidth: 25, minHeight: 25 }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
    >
      <g clip-path="url(#clip0_11700_3330)">
        <path
          d="M11.8967 1.1961C12.3655 1.67153 12.8301 2.49855 12.9719 3.15641C13.044 3.49169 13.0255 3.80643 13.1172 4.1266C14.0012 4.19124 14.9352 3.98403 15.7709 4.36522C16.5304 4.71198 17.0594 5.5112 17.1589 6.34064C17.2655 9.10561 17.8862 11.9908 17.9958 14.734C18.1149 17.7261 15.7727 19.7583 12.9624 19.9039C10.5505 20.029 7.38568 20.0338 4.97559 19.9039C2.24027 19.7577 -0.119783 17.711 0.00471236 14.7981C0.128612 11.8863 0.709987 8.80658 0.928599 5.88877C1.51057 4.02572 3.25946 4.05834 4.88207 4.12841C4.96666 2.45505 5.89888 0.932112 7.45061 0.300221C8.95706 -0.313546 10.7435 0.0271669 11.8961 1.1961H11.8967ZM11.441 4.13506C11.3284 0.846933 6.66789 0.845725 6.5565 4.13506H11.441ZM5.52778 7.47151C4.67656 7.64731 4.92615 8.94794 5.11021 9.55869C6.16574 13.0558 11.0645 13.4201 12.6651 10.1181C12.9719 9.48559 13.4502 7.80317 12.5573 7.50414C12.1522 7.36821 11.752 7.51441 11.5482 7.89801C11.3832 8.20852 11.4803 8.37646 11.4261 8.68032C10.9335 11.4272 7.10035 11.49 6.56306 8.62897C6.49396 8.25926 6.64824 8.12455 6.34921 7.75846C6.13179 7.49205 5.8685 7.40144 5.52778 7.47151Z"
          fill="#00579C"
        />
      </g>
      <defs>
        <clipPath id="clip0_11700_3330">
          <rect width="18" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </div>
)

const CSS_HANDLES = [
  'customMinicartButton',
  'customMinicartButtonCount',
] as const

export default function CustomMiniCartButton({
  children,
}: {
  children: React.ReactNode
}) {
  const { push } = PixelContext.usePixel()
  const { orderForm } = OrderForm.useOrderForm() as any
  const { handles } = useCssHandles(CSS_HANDLES)

  const handleClick = () => {
    push({
      event: 'add-to-cart-button' as any,
      id: 'add-to-cart-button',
    })
  }

  return (
    <Fragment>
      <button className={handles.customMinicartButton} onClick={handleClick}>
        <CartIcon />
        <span className={handles.customMinicartButtonCount}>
          {orderForm.items.length}
        </span>
      </button>
      {children}
    </Fragment>
  )
}
