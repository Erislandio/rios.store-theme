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
        header={<h4 className={handles.footerContainerH4}>{title}</h4>}
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
  atendimento,
  voceNoPonto,
  servicos,
}: Props) {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <section className={applyModifiers(handles.footerContainer, 'mobile')}>
      <div className={handles.newsletterForm}>
        <h4 className={handles.newsletterFormTitle}>Newsletter</h4>
        <p className={handles.newsletterFormDescription}>
          Receba as nossas novidades!
        </p>
        {children}
      </div>
      <Accordion
        id="atendimento"
        menuItems={atendimento}
        open
        title="Atendimento"
      />
      <Accordion
        id="institucional"
        menuItems={institucionals}
        open={false}
        title="Institucional"
      />
      <Accordion
        id="duvidas"
        menuItems={servicos}
        open={false}
        title="Serviços"
      />
      <Accordion
        id="suporte"
        menuItems={voceNoPonto}
        open={false}
        title="Você no Ponto"
      />
      <ul
        className={applyModifiers(handles.footerContainerUl, 'formasPagamento')}
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
      <div
        className={applyModifiers(handles.footerContainerWrapper, 'siga-nos')}
      >
        <h4 className={handles.footerContainerH4}>Siga-nos</h4>
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
  )
}
