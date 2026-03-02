import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'

interface Props {
  title?: string
  description?: string
  maxHeight?: number
}

const CSS_HANDLES = [
  'departmentDescriptionContainer',
  'departmentDescriptionTitle',
  'departmentDescriptionContent',
  'departmentDescriptionText',
  'departmentDescriptionToggle',
  'departmentDescriptionOverlay',
] as const

const CustomDepartmentdescription: StoreFrontFC<Props> = ({
  title = '',
  description = '',
  maxHeight = 80,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [expanded, setExpanded] = useState(false)

  if (!description && !title) return null

  return (
    <section className={handles.departmentDescriptionContainer}>
      <style>
        {`
          .${handles.departmentDescriptionText} p {
            margin: 0px 0px 8px;
          }

          .${handles.departmentDescriptionText} a {
            color: var(--Neutras-01, #1b1b1b);
            text-decoration: underline;
          }

          .${handles.departmentDescriptionText} a:hover {
            opacity: 0.7;
          }

          .${handles.departmentDescriptionText} strong {
            font-weight: 700;
          }
        `}
      </style>
      {title && <h2 className={handles.departmentDescriptionTitle}>{title}</h2>}
      <div
        className={handles.departmentDescriptionContent}
        style={
          !expanded
            ? {
                maxHeight: `${maxHeight}px`,
                overflow: 'hidden',
                position: 'relative',
              }
            : undefined
        }
      >
        <div
          className={handles.departmentDescriptionText}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {!expanded && <div className={handles.departmentDescriptionOverlay} />}
      </div>
      <button
        className={handles.departmentDescriptionToggle}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? 'LEIA MENOS' : 'LEIA MAIS'}
      </button>
    </section>
  )
}

CustomDepartmentdescription.schema = {
  title: 'Descrição de Departamento',
  description: 'Exibe título e descrição da categoria com toggle de expansão',
  type: 'object',
  properties: {
    title: {
      title: 'Título',
      type: 'string',
      default: '',
    },
    description: {
      title: 'Descrição (HTML permitido)',
      type: 'string',
      widget: {
        'ui:widget': 'textarea',
      },
      default: '',
    },
    maxHeight: {
      title: 'Altura inicial (px) antes do "Leia mais"',
      type: 'number',
      default: 80,
    },
  },
}

export default CustomDepartmentdescription
