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
  linkText: string
}

export interface Props {
  atendimento: FooterLink[]
  institucionals: FooterLink[]
  ajudas: FooterLink[]
  formasPagamento: FooterLink[]
  redesSociais: FooterLink[]
  siteSeguro: FooterLink[]
  departaments: FooterLink[]
  children?: React.ReactNode
  contacts: FooterLink[]
}

const CSS_HANDLES = [
  'footerContainer',
  'footerContainerLogo',
  'newsletterFormContent',
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
  atendimento,
  institucionals,
  redesSociais,
  formasPagamento,
  siteSeguro,
  departaments,
  contacts,
  children,
  ajudas,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()

  if (isMobile) {
    return (
      <FooterMobile
        ajudas={ajudas}
        contacts={contacts}
        children={children}
        atendimento={atendimento}
        institucionals={institucionals}
        formasPagamento={formasPagamento}
        redesSociais={redesSociais}
        siteSeguro={siteSeguro}
        departaments={departaments}
      />
    )
  }

  return (
    <div>
      <section
        className={applyModifiers(handles.footerContainer, 'newsletter')}
      >
        <div className={handles.footerContainerLogo}>
          <div className={handles.newsletterForm}>
            <div
              className={handles.newsletterFormContent}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <h4 className={handles.newsletterFormTitle}>
                Fique por dentro das nossas novidades
              </h4>
              <p className={handles.newsletterFormDescription}>
                Cadastre-se, receba, use e #abuserios
              </p>
            </div>
            {children}
          </div>
        </div>
      </section>
      <div
        style={{
          width: '100%',
          background: '#F1F1F1',
        }}
      >
        <section className={applyModifiers(handles.footerContainer, 'content')}>
          <div
            className={applyModifiers(
              handles.footerContainerWrapper,
              'contacts'
            )}
          >
            <h4 className={handles.footerContainerH4}>Contatos</h4>
            <ul className={handles.footerContainerUl}>
              {contacts.map((item, index, array) => (
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
                        width={52}
                        height={52}
                      />
                    )}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <b
                        className={applyModifiers(
                          handles.footerContainerLink,
                          'title'
                        )}
                      >
                        {item.__editorItemTitle}
                      </b>
                      <span
                        className={`${applyModifiers(
                          handles.footerContainerLink,
                          'description'
                        )} ${applyModifiers(
                          handles.footerContainerLink,
                          item.linkText.includes('aqui') ? 'here' : ''
                        )}`}
                      >
                        {item.linkText}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={applyModifiers(
              handles.footerContainerWrapper,
              'departaments'
            )}
          >
            <h4 className={handles.footerContainerH4}>
              Categorias em Destaque
            </h4>
            <ul className={handles.footerContainerUl}>
              {departaments.map((item) => (
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

          {/* Institucional */}
          <div
            className={applyModifiers(
              handles.footerContainerWrapper,
              'institucional'
            )}
          >
            <h4 className={handles.footerContainerH4}>LINKS ÍNSTITUCIONAIS</h4>
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

          {/* Ajuda */}
          <div
            className={applyModifiers(handles.footerContainerWrapper, 'ajuda')}
          >
            <h4 className={handles.footerContainerH4}>Links de Ajuda</h4>
            <ul className={handles.footerContainerUl}>
              {ajudas.map((item) => (
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
        </section>
        <section className={handles.footerContainerBottom}>
          <div
            className={applyModifiers(
              handles.footerContainerWrapper,
              'siga-nos'
            )}
          >
            <h4 className={handles.footerContainerH4}>Siga-nos nas redes</h4>
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
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
              className={applyModifiers(
                handles.footerContainerUl,
                'site-seguro'
              )}
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
        </section>
      </div>
    </div>
  )
}

Footer.defaultProps = {
  atendimento: [],
  institucionals: [],
  formasPagamento: [],
  redesSociais: [],
  siteSeguro: [],
  departaments: [],
  ajudas: [],
  contacts: [],
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
    contacts: {
      type: 'array',
      title: 'Contatos',
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
          linkText: {
            type: 'string',
            title: 'Texto do link',
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
    ajudas: {
      type: 'array',
      title: 'Links de Ajuda',
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
