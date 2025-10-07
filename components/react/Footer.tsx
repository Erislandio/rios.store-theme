import React from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'

import FooterMobile from './FooterMobile'

export interface FooterLink {
  icon: string
  url: string
  __editorItemTitle: string
  image: string
  newTab: boolean
  open: boolean
  accordion: boolean
}

export interface Props {
  institucionals: FooterLink[]
  duvidas: FooterLink[]
  suporte: FooterLink[]
  formasPagamento: FooterLink[]
  redesSociais: FooterLink[]
  siteSeguro: FooterLink[]
  logo: string
}

const CSS_HANDLES = [
  'footerContainer',
  'footerContainerLogo',
  'footerContainerWrapper',
  'footerContainerLi',
  'footerContainerUl',
  'footerContainerH4',
  'footerContainerBottom',
  'footerContainerLink',
] as const

const Footer: StoreFrontFC<Props> = ({
  logo,
  institucionals,
  duvidas,
  suporte,
  redesSociais,
  formasPagamento,
  siteSeguro,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  const { isMobile } = useDevice()

  if (isMobile) {
    return (
      <FooterMobile
        logo={logo}
        duvidas={duvidas}
        formasPagamento={formasPagamento}
        institucionals={institucionals}
        redesSociais={redesSociais}
        siteSeguro={siteSeguro}
        suporte={suporte}
      />
    )
  }

  return (
    <section className={handles.footerContainer}>
      <div>
        <img alt="NCR" src={logo} className={handles.footerContainerLogo} />
        <h4 className={applyModifiers(handles.footerContainerH4, 'siteSeguro')}>
          Site Seguro
        </h4>
        <ul
          className={applyModifiers(handles.footerContainerUl, 'site-seguro')}
        >
          {siteSeguro.map((item) => (
            <li
              key={item.__editorItemTitle}
              className={handles.footerContainerLi}
            >
              <Link
                className={handles.footerContainerLink}
                to={item.url}
                fetchPage
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.__editorItemTitle}
                    title={item.__editorItemTitle}
                    loading="lazy"
                  />
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={applyModifiers(handles.footerContainerWrapper, 'duvidas')}
      >
        <h4 className={handles.footerContainerH4}>Dúvidas</h4>
        <ul className={handles.footerContainerUl}>
          {duvidas.map((item) => (
            <li
              key={item.__editorItemTitle}
              className={handles.footerContainerLi}
            >
              <Link
                className={handles.footerContainerLink}
                target={item.newTab ? '_blank' : ''}
                to={item.url}
                fetchPage
                rel="noreferrer"
              >
                {item.icon ? (
                  <img
                    loading="eager"
                    src={item.icon}
                    alt={item.__editorItemTitle}
                    title={item.__editorItemTitle}
                  />
                ) : null}
                {item.__editorItemTitle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={applyModifiers(
          handles.footerContainerWrapper,
          'institucional'
        )}
      >
        <h4 className={handles.footerContainerH4}>Institucional</h4>
        <ul className={handles.footerContainerUl}>
          {institucionals.map((item) => (
            <li
              key={item.__editorItemTitle}
              className={handles.footerContainerLi}
            >
              <Link
                className={handles.footerContainerLink}
                target={item.newTab ? '_blank' : ''}
                to={item.url}
                fetchPage
                rel="noreferrer"
              >
                {item.icon ? (
                  <img
                    loading="eager"
                    src={item.icon}
                    alt={item.__editorItemTitle}
                    title={item.__editorItemTitle}
                  />
                ) : null}
                {item.__editorItemTitle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={applyModifiers(handles.footerContainerWrapper, 'suporte')}
      >
        <h4 className={handles.footerContainerH4}>Suporte</h4>
        <ul className={handles.footerContainerUl}>
          {suporte.map((item) => (
            <li
              key={item.__editorItemTitle}
              className={handles.footerContainerLi}
            >
              {item.url === 'none' ? (
                <span
                  className={applyModifiers(
                    handles.footerContainerLink,
                    'none'
                  )}
                >
                  {item.icon ? (
                    <img
                      loading="eager"
                      src={item.icon}
                      alt={item.__editorItemTitle}
                      title={item.__editorItemTitle}
                    />
                  ) : null}
                  {item.__editorItemTitle}
                </span>
              ) : (
                <Link
                  className={handles.footerContainerLink}
                  target={item.newTab ? '_blank' : ''}
                  to={item.url}
                  fetchPage
                  rel="noreferrer"
                >
                  {item.icon ? (
                    <img
                      loading="eager"
                      src={item.icon}
                      alt={item.__editorItemTitle}
                      title={item.__editorItemTitle}
                    />
                  ) : null}
                  {item.__editorItemTitle}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={applyModifiers(handles.footerContainerWrapper, 'pagamentos')}
      >
        <h4 className={handles.footerContainerH4}>Formas de Pagamento</h4>
        <ul className={handles.footerContainerUl}>
          {formasPagamento.map((item) => (
            <li
              key={item.__editorItemTitle}
              className={handles.footerContainerLi}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.__editorItemTitle}
                  loading="lazy"
                  title={item.__editorItemTitle}
                />
              ) : null}
            </li>
          ))}
        </ul>
        <h4
          className={applyModifiers(handles.footerContainerH4, 'redesSociais')}
        >
          Redes Sociais
        </h4>
        <ul
          className={applyModifiers(handles.footerContainerUl, 'redesSociais')}
        >
          {redesSociais.map((item) => (
            <li
              key={item.__editorItemTitle}
              className={handles.footerContainerLi}
            >
              <Link
                className={handles.footerContainerLink}
                target={item.newTab ? '_blank' : ''}
                to={item.url}
                fetchPage
                rel="noreferrer"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.__editorItemTitle}
                    title={item.__editorItemTitle}
                    width={32}
                    loading="eager"
                    height={32}
                  />
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

Footer.defaultProps = {
  duvidas: [],
  formasPagamento: [],
  institucionals: [],
  redesSociais: [],
  siteSeguro: [],
  suporte: [],
  logo: '',
}

Footer.schema = {
  title: 'Categorias',
  type: 'object',
  properties: {
    logo: {
      type: 'string',
      title: 'Title',
      default: '',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    institucionals: {
      type: 'array',
      title: 'Institucional',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'title',
            type: 'string',
            default: '',
          },
          icon: {
            type: 'string',
            title: 'Icone',
            default: '',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          url: {
            type: 'string',
            title: 'Link',
            default: '',
          },
          newTab: {
            type: 'boolean',
            title: 'Abrir em uma nova guia?',
            default: false,
          },
          open: {
            type: 'boolean',
            title: 'Aberto no mobile?',
            default: false,
          },
        },
      },
    },
    departaments: {
      type: 'array',
      title: 'Departamentos',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'title',
            type: 'string',
            default: '',
          },
          icon: {
            type: 'string',
            title: 'Icone',
            default: '',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          url: {
            type: 'string',
            title: 'Link',
            default: '',
          },
          newTab: {
            type: 'boolean',
            title: 'Abrir em uma nova guia?',
            default: false,
          },
          open: {
            type: 'boolean',
            title: 'Aberto no mobile?',
            default: false,
          },
        },
      },
    },
    duvidas: {
      type: 'array',
      title: 'Dúvidas',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'title',
            type: 'string',
            default: '',
          },
          icon: {
            type: 'string',
            title: 'Icone',
            default: '',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          url: {
            type: 'string',
            title: 'Link',
            default: '',
          },
          newTab: {
            type: 'boolean',
            title: 'Abrir em uma nova guia?',
            default: false,
          },
          open: {
            type: 'boolean',
            title: 'Aberto no mobile?',
            default: false,
          },
        },
      },
    },
    suporte: {
      type: 'array',
      title: 'Suporte',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'title',
            type: 'string',
            default: '',
          },
          icon: {
            type: 'string',
            title: 'Icone',
            default: '',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          url: {
            type: 'string',
            title: 'Link',
            default: '',
          },
          newTab: {
            type: 'boolean',
            title: 'Abrir em uma nova guia?',
            default: false,
          },
          open: {
            type: 'boolean',
            title: 'Aberto no mobile?',
            default: false,
          },
        },
      },
    },
    formasPagamento: {
      type: 'array',
      title: 'Formas de pagamento',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'title',
            type: 'string',
            default: '',
          },
          image: {
            type: 'string',
            title: 'Image',
            default: '',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          open: {
            type: 'boolean',
            title: 'Aberto no mobile?',
            default: false,
          },
        },
      },
    },
    redesSociais: {
      type: 'array',
      title: 'Redes Sociais',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'title',
            type: 'string',
            default: '',
          },
          url: {
            type: 'string',
            title: 'Link',
            default: '',
          },
          newTab: {
            type: 'boolean',
            title: 'Abrir em uma nova guia?',
            default: false,
          },
          image: {
            type: 'string',
            title: 'Image',
            default: '',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          open: {
            type: 'boolean',
            title: 'Aberto no mobile?',
            default: false,
          },
        },
      },
    },
    siteSeguro: {
      type: 'array',
      title: 'Site Seguro',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'title',
            type: 'string',
            default: '',
          },
          newTab: {
            type: 'boolean',
            title: 'Abrir em uma nova guia?',
            default: false,
          },
          url: {
            type: 'string',
            title: 'Link',
            default: '',
          },
          image: {
            type: 'string',
            title: 'Image',
            default: '',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          open: {
            type: 'boolean',
            title: 'Aberto no mobile?',
            default: false,
          },
        },
      },
    },
  },
}

export default Footer
