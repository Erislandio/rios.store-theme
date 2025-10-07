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
  logo,
  redesSociais,
  institucionals,
  duvidas,
  formasPagamento,
  siteSeguro,
  suporte,
}: Props) {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <section className={applyModifiers(handles.footerContainer, 'mobile')}>
      <div className={handles.footerContainerImage}>
        <img
          alt="NCR"
          src={logo}
          className={handles.footerContainerImageContent}
          width={154}
          height={38}
        />
      </div>
      <Accordion
        id="redesSociais"
        menuItems={redesSociais}
        open
        title="Redes Sociais"
      />
      <Accordion
        id="institucional"
        menuItems={institucionals}
        open={false}
        title="Institucional"
      />
      <Accordion
        id="duvidas"
        menuItems={duvidas}
        open={false}
        title="Dúvidas"
      />
      <Accordion
        id="formasPagamento"
        menuItems={formasPagamento}
        open
        title="Formas de pagamento"
      />
      <Accordion id="suporte" menuItems={suporte} open title="Suporte" />
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
          </li>
        ))}
      </ul>
    </section>
  )
}
