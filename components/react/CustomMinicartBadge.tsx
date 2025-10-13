import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { OrderForm } from 'vtex.order-manager'

const CSS_HANDLES = [
  'minicartBadgeContainer',
  'minicartBadgeText',
  'minicartBadgeContainerTitle',
] as const

export default function CustomMinicartBadge() {
  const {
    orderForm: { items = [] },
  } = OrderForm.useOrderForm()

  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.minicartBadgeContainer}>
      <h5 className={handles.minicartBadgeContainerTitle}>Minha sacola</h5>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
        >
          <g clip-path="url(#clip0_4057_10842)">
            <path
              d="M11.8968 1.19623C12.3656 1.67165 12.8302 2.49867 12.9719 3.15654C13.044 3.49181 13.0256 3.80655 13.1173 4.12672C14.0013 4.19136 14.9353 3.98416 15.771 4.36534C16.5305 4.7121 17.0594 5.51133 17.1589 6.34076C17.2655 9.10573 17.8862 11.9909 17.9958 14.7341C18.115 17.7263 15.7728 19.7585 12.9624 19.9041C10.5505 20.0291 7.38574 20.0339 4.97565 19.9041C2.24033 19.7579 -0.119722 17.7112 0.0047734 14.7982C0.128673 11.8864 0.710048 8.8067 0.92866 5.88889C1.51063 4.02584 3.25952 4.05846 4.88213 4.12854C4.96672 2.45517 5.89894 0.932234 7.45067 0.300343C8.95712 -0.313424 10.7435 0.027289 11.8962 1.19623H11.8968ZM11.4411 4.13518C11.3285 0.847055 6.66795 0.845847 6.55656 4.13518H11.4411ZM5.52784 7.47164C4.67662 7.64743 4.92621 8.94806 5.11027 9.55881C6.1658 13.056 11.0646 13.4202 12.6652 10.1182C12.9719 9.48571 13.4503 7.80329 12.5574 7.50426C12.1523 7.36833 11.752 7.51453 11.5483 7.89813C11.3833 8.20864 11.4804 8.37658 11.4262 8.68044C10.9336 11.4273 7.10041 11.4901 6.56312 8.62909C6.49402 8.25938 6.6483 8.12467 6.34927 7.75858C6.13185 7.49217 5.86856 7.40156 5.52784 7.47164Z"
              fill="#00579C"
            />
          </g>
          <defs>
            <clipPath id="clip0_4057_10842">
              <rect width="18" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span className={handles.minicartBadgeText}>{items.length || 0}</span>
      </div>
    </div>
  )
}
