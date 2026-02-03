import React from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'

interface Props {
  items: {
    text: string
    color?: string
    icon?: string
    link?: string
    newTab?: boolean
  }[]
  message: string
  color?: string
  backgroundColor?: string
  textColor?: string
  icon?: string
}

const CSS_HANDLES = [
  'topBarContainer',
  'topBarMessage',
  'topBarContainerItems',
  'topBarMessageLink',
  'topBarMessageIcon',
  'topBarContainerWrapper',
] as const

const TopBar: StoreFrontFC<Props> = ({
  message,
  backgroundColor,
  textColor,
  items = [],
  icon = '',
}) => {
  const { isMobile } = useDevice()
  const { handles } = useCssHandles(CSS_HANDLES)

  if (isMobile && message) {
    return (
      <section
        className={applyModifiers(handles.topBarContainer, 'mobile')}
        style={{ backgroundColor: backgroundColor || '#1b1b1b' }}
      >
        <p
          className={handles.topBarMessage}
          style={{ color: textColor || '#FFFFFF' }}
        >
          {icon && (
            <img
              src={icon}
              alt={message ?? 'Mensagem barra topo'}
              className={handles.topBarMessageIcon}
              width={15}
              height={15}
              loading="eager"
            />
          )}
          {message}
        </p>
      </section>
    )
  }

  return (
    <section
      className={handles.topBarContainer}
      style={{ backgroundColor: backgroundColor || '#1b1b1b' }}
    >
      <div className={handles.topBarContainerWrapper}>
        <div className={handles.topBarContainerItems}>
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              target={item.newTab ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className={handles.topBarMessageLink}
              style={{ color: item.color || '#FFFFFF' }}
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.text ?? 'Ícone'}
                  className={handles.topBarMessageIcon}
                  width={15}
                  height={15}
                  loading="eager"
                />
              )}
              {item.text}
            </Link>
          ))}
        </div>
        {message ? (
          <p
            className={handles.topBarMessage}
            style={{ color: textColor || '#FFFFFF' }}
          >
            {icon && (
              <img
                src={icon}
                alt={message ?? 'Mensagem barra topo'}
                className={handles.topBarMessageIcon}
                width={15}
                height={15}
                loading="eager"
              />
            )}
            {message}
          </p>
        ) : null}
      </div>
    </section>
  )
}

TopBar.defaultProps = {
  message: '',
  backgroundColor: '#1b1b1b',
  textColor: '#FFFFFF',
  items: [],
}

TopBar.schema = {
  title: 'Barra topo',
  description: 'Componente de barra no topo',
  type: 'object',
  properties: {
    items: {
      title: 'Itens',
      description: 'Itens da barra',
      type: 'array',
      default: [],
      items: {
        type: 'object',
        properties: {
          message: {
            title: 'Texto',
            type: 'string',
          },
          color: {
            title: 'Cor da fonte em destaque',
            description: 'Cor da fonte em HEX',
            type: 'string',
            default: '#FFFFFF',
          },
          icon: {
            title: 'Ícone',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          link: {
            title: 'Link',
            type: 'string',
          },
          newTab: {
            title: 'Nova aba',
            type: 'boolean',
            default: false,
          },
        },
      },
    },
    message: {
      title: 'Mensagem Direita',
      description: 'Mensagem a ser exibida na barra',
      type: 'string',
      default: 'Frete Grátis acima de R$ 199,90',
    },
    color: {
      title: 'Cor da fonte em destaque',
      description: 'Cor da fonte em HEX',
      type: 'string',
      default: '#FFFFFF',
    },
    backgroundColor: {
      title: 'Cor de fundo',
      description: 'Cor de fundo em HEX',
      type: 'string',
      default: '#1b1b1b',
    },
    icon: {
      title: 'Ícone',
      description: 'Ícone a ser exibido na barra',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
  },
}

export default TopBar
