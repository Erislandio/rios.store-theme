import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const WhatsappButton: StoreFrontFC<{
  icon: string
  number: string
  active: boolean
}> = ({
  icon,
  number,
  active,
}: {
  icon: string
  number: string
  active: boolean
}) => {
  const { handles } = useCssHandles(['whatsapContainer'] as const)

  if (!active) return null

  return (
    <div className={handles.whatsapContainer}>
      <a
        href={`https://wa.me/${number}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={icon} alt="Whatsapp" width={50} height={50} loading="eager" />
      </a>
    </div>
  )
}

WhatsappButton.defaultProps = {
  icon: 'https://gruporios.vtexassets.com/assets/vtex.file-manager-graphql/images/9634308f-2c57-41e3-89db-255bf13511cd___96a97ae53476aa5b0a717b56e65efba2.png',
  number: '5511999999999',
  active: true,
}

WhatsappButton.schema = {
  title: 'WhatsappButton',
  description: 'WhatsappButton',
  type: 'object',
  properties: {
    icon: {
      title: 'Icon',
      description: 'Icon',
      type: 'string',
      default:
        'https://gruporios.vtexassets.com/assets/vtex.file-manager-graphql/images/9634308f-2c57-41e3-89db-255bf13511cd___96a97ae53476aa5b0a717b56e65efba2.png',
    },
    number: {
      title: 'Number',
      description: 'Number',
      type: 'string',
      default: '5511999999999',
    },
  },
}

export default WhatsappButton
