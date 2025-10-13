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
  atendimento: FooterLink[]
  institucionals: FooterLink[]
  servicos: FooterLink[]
  voceNoPonto: FooterLink[]
  duvidas: FooterLink[]
  suporte: FooterLink[]
  formasPagamento: FooterLink[]
  redesSociais: FooterLink[]
  siteSeguro: FooterLink[]
  logo: string
  children?: React.ReactNode
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
  'newsletterFormDescription',
  'newsletterForm',
  'newsletterFormTitle',
] as const

const Footer: StoreFrontFC<Props> = ({
  logo,
  atendimento,
  institucionals,
  servicos,
  voceNoPonto,
  duvidas,
  suporte,
  redesSociais,
  formasPagamento,
  siteSeguro,
  children,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()

  if (isMobile) {
    return (
      <FooterMobile
        children={children}
        logo={logo}
        atendimento={atendimento}
        institucionals={institucionals}
        servicos={servicos}
        voceNoPonto={voceNoPonto}
        duvidas={duvidas}
        formasPagamento={formasPagamento}
        redesSociais={redesSociais}
        siteSeguro={siteSeguro}
        suporte={suporte}
      />
    )
  }

  return (
    <div>
      <section className={handles.footerContainer}>
        {/* Logo + Newsletter + Site Seguro */}
        <div className={handles.footerContainerLogo}>
          <div className={handles.newsletterForm}>
            <h4 className={handles.newsletterFormTitle}>Newsletter</h4>
            <p className={handles.newsletterFormDescription}>
              Receba as nossas novidades!
            </p>
            {children}
          </div>
        </div>

        <div
          className={applyModifiers(
            handles.footerContainerWrapper,
            'atendimento'
          )}
        >
          <h4 className={handles.footerContainerH4}>Atendimento</h4>
          <ul className={handles.footerContainerUl}>
            {atendimento.map((item, index, array) => (
              <li
                key={item.__editorItemTitle}
                className={handles.footerContainerLi}
              >
                <Link
                  className={applyModifiers(
                    handles.footerContainerLink,
                    item.url.includes('mailto:')
                      ? 'email'
                      : index === array.length - 1
                      ? 'last'
                      : ''
                  )}
                  target={item.newTab ? '_blank' : ''}
                  to={item.url}
                  fetchPage
                  rel="noreferrer"
                >
                  {item.icon && (
                    <img
                      loading="lazy"
                      src={item.icon}
                      alt={item.__editorItemTitle}
                      title={item.__editorItemTitle}
                      width={20}
                      height={20}
                    />
                  )}
                  {item.__editorItemTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Institucional */}
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
                  {item.icon && (
                    <img
                      loading="lazy"
                      src={item.icon}
                      alt={item.__editorItemTitle}
                      title={item.__editorItemTitle}
                      width={20}
                      height={20}
                    />
                  )}
                  {item.__editorItemTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Serviços */}
        <div
          className={applyModifiers(handles.footerContainerWrapper, 'servicos')}
        >
          <h4 className={handles.footerContainerH4}>Serviços</h4>
          <ul className={handles.footerContainerUl}>
            {servicos.map((item) => (
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
                  {item.icon && (
                    <img
                      loading="lazy"
                      src={item.icon}
                      width={20}
                      height={20}
                      alt={item.__editorItemTitle}
                      title={item.__editorItemTitle}
                    />
                  )}
                  {item.__editorItemTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Você no Ponto */}
        <div
          className={applyModifiers(
            handles.footerContainerWrapper,
            'voceNoPonto'
          )}
        >
          <h4 className={handles.footerContainerH4}>Você no Ponto</h4>
          <ul className={handles.footerContainerUl}>
            {voceNoPonto.map((item) => (
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
                  {item.icon && (
                    <img
                      loading="eager"
                      src={item.icon}
                      alt={item.__editorItemTitle}
                      title={item.__editorItemTitle}
                    />
                  )}
                  {item.__editorItemTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className={handles.footerContainerBottom}>
        <div
          className={applyModifiers(
            handles.footerContainerWrapper,
            'pagamento'
          )}
        >
          <h4 className={handles.footerContainerH4}>Pagamentos</h4>
          <ul className={handles.footerContainerUl}>
            {formasPagamento.map((item) => (
              <li
                key={item.__editorItemTitle}
                className={handles.footerContainerLi}
              >
                <img
                  loading="lazy"
                  src={item.icon}
                  alt={item.__editorItemTitle}
                  title={item.__editorItemTitle}
                />
              </li>
            ))}
          </ul>
        </div>
        <div
          className={applyModifiers(
            handles.footerContainerWrapper,
            'seguranca'
          )}
        >
          <h4 className={handles.footerContainerH4}>Segurança </h4>
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
                  target={item.newTab ? '_blank' : ''}
                  fetchPage
                  rel="noreferrer"
                >
                  {item.image && (
                    <img
                      loading="lazy"
                      src={item.image}
                      alt={item.__editorItemTitle}
                      title={item.__editorItemTitle}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={applyModifiers(handles.footerContainerWrapper, 'siga-nos')}
        >
          <h4 className={handles.footerContainerH4}>Siga-nos</h4>
          <ul
            className={applyModifiers(
              handles.footerContainerUl,
              'redes-sociais'
            )}
          >
            {redesSociais.map((item) => (
              <li
                key={item.__editorItemTitle}
                className={handles.footerContainerLi}
              >
                <Link
                  className={handles.footerContainerLink}
                  to={item.url}
                  target={item.newTab ? '_blank' : ''}
                  fetchPage
                  rel="noreferrer"
                >
                  {item.image && (
                    <img
                      loading="lazy"
                      src={item.image}
                      alt={item.__editorItemTitle}
                      title={item.__editorItemTitle}
                      width={20}
                      height={20}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

Footer.defaultProps = {
  atendimento: [],
  institucionals: [],
  servicos: [],
  voceNoPonto: [],
  duvidas: [],
  suporte: [],
  formasPagamento: [],
  redesSociais: [],
  siteSeguro: [],
  logo: '',
}

Footer.schema = {
  title: 'Footer',
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
    atendimento: {
      type: 'array',
      title: 'Atendimento',
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
    servicos: {
      type: 'array',
      title: 'Serviços',
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
    voceNoPonto: {
      type: 'array',
      title: 'Você no Ponto',
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
