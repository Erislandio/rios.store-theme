import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

interface Props {
  message: string
  color?: string
  cuponCode?: string
  highlightText: string
  backgroundColor?: string
  textColor?: string
}

const CSS_HANDLES = ['topBarContainer', 'topBarMessage'] as const

const TopBar: StoreFrontFC<Props> = ({
  message,
  color,
  cuponCode,
  highlightText,
  backgroundColor,
  textColor,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <section
      className={handles.topBarContainer}
      style={{ backgroundColor: backgroundColor || '#00579C' }}
    >
      <span
        className={handles.topBarMessage}
        style={{ color: textColor || '#FFFFFF' }}
      >
        <b style={{ color: color || '#FCD200' }}>{highlightText}</b> {message}{' '}
        <b style={{ color: color || '#FCD200' }}>{cuponCode}</b>
      </span>
    </section>
  )
}

TopBar.defaultProps = {
  message: 'para compras acima de R$ 120,00 - uso o cupom',
  color: '#FCD200',
  cuponCode: 'MEUFRETE',
  highlightText: 'Ganhe Frete Grátis',
  backgroundColor: '#00579C',
  textColor: '#FFFFFF',
}

TopBar.schema = {
  title: 'Barra topo',
  description: 'Componente de barra no topo',
  type: 'object',
  properties: {
    message: {
      title: 'Mensagem',
      description: 'Mensagem a ser exibida na barra',
      type: 'string',
      default: 'para compras acima de R$ 120,00 - uso o cupom',
    },
    color: {
      title: 'Cor da fonte em destaque',
      description: 'Cor da fonte em HEX',
      type: 'string',
      default: '#FFFFFF',
    },
    textColor: {
      title: 'Cor da fonte',
      description: 'Cor da fonte em HEX',
      type: 'string',
      default: '#FFFFFF',
    },
    backgroundColor: {
      title: 'Cor de fundo',
      description: 'Cor de fundo em HEX',
      type: 'string',
      default: '#00579C',
    },
    highlightText: {
      title: 'Texto em destaque',
      description: 'Texto em destaque a ser exibido na barra',
      type: 'string',
      default: 'Ganhe Frete Grátis',
    },
    cuponCode: {
      title: 'Cupom de desconto',
      description: 'Cupom de desconto a ser exibido na barra',
      type: 'string',
      default: 'MEUFRETE',
    },
  },
}

export default TopBar
