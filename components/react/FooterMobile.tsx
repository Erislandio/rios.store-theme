import React, { Fragment, useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import { Collapsible } from 'vtex.styleguide'

import type { FooterLink, Props } from './Footer'

const CSS_HANDLES = [
  'footerContainer',
  'footerContainerLogo',
  'footerContainerWrapper',
  'footerContainerLi',
  'footerContainerUl',
  'footerContainerH4',
  'footerContainerBottom',
  'footerContainerLink',
  'footerContainerImage',
  'footerCollapsableIcon',
  'footerContainerImageContent',
  'newsletterForm',
  'newsletterFormTitle',
  'newsletterFormDescription',
] as const

function Accordion({
  open = false,
  menuItems,
  title,
  id,
}: {
  open: boolean
  title: string
  menuItems: FooterLink[]
  id: string
}) {
  const [isOpen, setOpen] = useState<boolean>(open)
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.footerContainerWrapper}>
      <Collapsible
        align="right"
        caretColor="#fff"
        header={
          <h4 className={handles.footerContainerH4}>
            {title}
            <span className={handles.footerCollapsableIcon}>
              {isOpen ? '-' : '+'}
            </span>
          </h4>
        }
        onClick={() => setOpen(!isOpen)}
        isOpen={isOpen}
      >
        <ul className={applyModifiers(handles.footerContainerUl, id)}>
          {menuItems.map((item) => (
            <li
              key={item.__editorItemTitle}
              className={handles.footerContainerLi}
            >
              {id === 'formasPagamento' ? (
                item.image ? (
                  <img alt="NCR" src={item.image} />
                ) : (
                  <Fragment>
                    {item.icon ? (
                      <img
                        loading="eager"
                        src={item.icon}
                        alt={item.__editorItemTitle}
                        title={item.__editorItemTitle}
                      />
                    ) : null}
                    {item.__editorItemTitle}
                  </Fragment>
                )
              ) : (
                <Link
                  className={handles.footerContainerLink}
                  target={item.newTab ? '_blank' : ''}
                  to={item.url}
                  fetchPage
                  rel="noreferrer"
                >
                  {item.image ? (
                    <img alt="NCR" src={item.image} />
                  ) : (
                    <Fragment>
                      {item.icon ? (
                        <img
                          loading="eager"
                          src={item.icon}
                          alt={item.__editorItemTitle}
                          title={item.__editorItemTitle}
                        />
                      ) : null}
                      {item.__editorItemTitle}
                    </Fragment>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </Collapsible>
    </div>
  )
}

export default function FooterMobile({
  redesSociais,
  institucionals,
  formasPagamento,
  siteSeguro,
  children,
  departaments,
  ajudas,
  contacts,
}: Props) {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <section className={applyModifiers(handles.footerContainer, 'mobile')}>
      <div className={handles.newsletterForm}>
        <h4 className={handles.newsletterFormTitle}>
          Fique por dentro das nossas novidades
        </h4>
        <p className={handles.newsletterFormDescription}>
          Cadastre-se, receba, use e #abuserios
        </p>
        {children}
      </div>
      <Accordion
        id="departaments"
        menuItems={departaments}
        open
        title="Categorias em destaques"
      />
      <div
        className={applyModifiers(handles.footerContainerWrapper, 'contacts')}
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
      <Accordion
        id="institucional"
        menuItems={institucionals}
        open={false}
        title="Institucional"
      />
      <Accordion
        id="ajudas"
        menuItems={ajudas}
        open={false}
        title="Links de Ajuda"
      />
      <div
        className={applyModifiers(handles.footerContainerWrapper, 'siga-nos')}
      >
        <h4 className={handles.footerContainerH4}>Siga-nos nas redes</h4>
        <ul
          className={applyModifiers(handles.footerContainerUl, 'redes-sociais')}
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
                    width={42}
                    height={42}
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
          'formasPagamento'
        )}
      >
        <h4 className={handles.footerContainerH4}>Formas de Pagamento</h4>
        <ul
          className={applyModifiers(
            handles.footerContainerUl,
            'formasPagamento'
          )}
        >
          {formasPagamento.map((item) => (
            <li
              key={item.__editorItemTitle}
              className={handles.footerContainerLi}
            >
              <img
                alt={item.__editorItemTitle}
                width={300}
                height={30}
                src={item.image}
              />
            </li>
          ))}
        </ul>
      </div>
      <div
        className={applyModifiers(handles.footerContainerWrapper, 'siteSeguro')}
      >
        <h4 className={handles.footerContainerH4}>Site Seguro</h4>
        <ul className={applyModifiers(handles.footerContainerUl, 'siteSeguro')}>
          {siteSeguro.map((item) => (
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
                <img
                  alt={item.__editorItemTitle}
                  loading="lazy"
                  src={item.image}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
