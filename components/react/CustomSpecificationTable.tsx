import React, { Fragment, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import type {
  ProductContextState,
  ProductSpecification,
} from 'vtex.product-context/react/ProductTypes'
import './Global.css'

interface TableProps {
  data: ProductSpecification[]
}

const CSS_HANDLES = [
  'specificationTable',
  'specificationTableThead',
  'specificationTableTBody',
  'specificationTableTr',
  'specificationTableTd',
  'specificationTableTdName',
  'collapsibleTextDescriptionButton',
] as const

const Plus = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.52054 2.89063C8.79668 2.89099 9.02024 3.11514 9.01988 3.39128L9.00765 12.7246C9.00729 13.0008 8.78314 13.2243 8.50699 13.224C8.23085 13.2236 8.00729 12.9994 8.00765 12.7233L8.01988 3.38997C8.02025 3.11383 8.2444 2.89026 8.52054 2.89063Z"
      fill="#1D1D1F"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.33301 8.05729C3.33301 7.78115 3.55687 7.55729 3.83301 7.55729H13.1663C13.4425 7.55729 13.6663 7.78115 13.6663 8.05729C13.6663 8.33343 13.4425 8.55729 13.1663 8.55729H3.83301C3.55687 8.55729 3.33301 8.33343 3.33301 8.05729Z"
      fill="#1D1D1F"
    />
  </svg>
)

const Minus = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.33301 8.05729C3.33301 7.78115 3.55687 7.55729 3.83301 7.55729H13.1663C13.4425 7.55729 13.6663 7.78115 13.6663 8.05729C13.6663 8.33343 13.4425 8.55729 13.1663 8.55729H3.83301C3.55687 8.55729 3.33301 8.33343 3.33301 8.05729Z"
      fill="#1D1D1F"
    />
  </svg>
)

const Table: React.FC<TableProps> = ({ data = [] }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const shouldShowMore = data.length > 3

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const getDataToDisplay = () => {
    if (!isCollapsed) {
      return data
    }

    if (shouldShowMore) return data.slice(0, 3)

    return data
  }

  return (
    <pre className="w-100">
      <table className={handles.specificationTable}>
        <thead className={handles.specificationTableThead} />
        <tbody className={handles.specificationTableTBody}>
          {getDataToDisplay().map((item, index) => (
            <tr
              className={handles.specificationTableTr}
              style={{
                background: index % 2 === 0 ? '#F6F7F8' : '#fff',
              }}
              key={index}
            >
              <td className={handles.specificationTableTdName}>{item.name}</td>
              <td className={handles.specificationTableTd}>
                {item.values.join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {shouldShowMore ? (
        <button
          onClick={toggleCollapse}
          className={handles.collapsibleTextDescriptionButton}
        >
          {isCollapsed ? (
            <Fragment>
              Ver mais <Plus />
            </Fragment>
          ) : (
            <Fragment>
              Ver menos <Minus />
            </Fragment>
          )}
        </button>
      ) : null}
    </pre>
  )
}

export default function CustomSpecificationTable() {
  const { product } = useProduct() as ProductContextState

  const specs = product?.properties as ProductSpecification[]

  console.log('🚀 ~ CustomSpecificationTable ~ specs:', specs)

  return (
    <Table
      data={[
        {
          name: 'Marca',
          originalName: 'Marca',
          values: [String(product?.brand)],
        },
        ...specs,
      ]}
    />
  )
}
