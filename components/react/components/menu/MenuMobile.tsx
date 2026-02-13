import React, { useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { Collapsible } from 'vtex.styleguide'

import { Link } from 'vtex.render-runtime'
import type { MainMenu, MenuItem } from './index'

const CSS_HANDLES = [
  'menuContainer',
  'menuItem',
  'submenu',
  'submenuItem',
  'menuLink',
  'menuBanner',
  'menuItemTitle',
  'menuItemSectionTitle',
  'menuItemSection',
  'menuItemInner',
  'menuItems',
  'submenuItems',
  'submenuItemsWrapper',
  'menuItemElement',
  'allDepartamentItem',
  'allDepartamentWrapperLevel1',
  'moreitems',
  'collapsibleMenuTitleArrow',
  'collapsibleMenuTitle',
  'allDepartamentWrapperLevel2',
  'menuContainerItem',
  'childrenContainer',
  'menuOthers',
  'menuItemUl',
  'menuItemLi',
  'submenuUl',
  'backButton',
  'submenuLi',
  'profileContainer',
  'menuCardContainer',
  'collapsibleMenu',
  'menuOthersIcon',
  'drawerButton',
  'allDepartamentBottomDevider',
] as const

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="7"
    viewBox="0 0 12 7"
    fill="none"
  >
    <path
      d="M6.03045 5.72131C6.06969 5.65932 6.09724 5.59598 6.14066 5.54927C7.78919 3.77263 9.4394 1.99823 11.0871 0.221147C11.2282 0.0688632 11.3814 -0.0290653 11.586 0.00777022C11.9571 0.0751522 12.1257 0.547725 11.894 0.868463C11.8561 0.92147 11.8093 0.96729 11.765 1.01446C9.99044 2.92451 8.21583 4.83457 6.44122 6.74462C6.12479 7.08513 5.87682 7.08513 5.56039 6.74462C3.77493 4.82289 1.98947 2.90025 0.20234 0.980317C0.0654144 0.832975 -0.0230865 0.672157 0.00530053 0.458781C0.0595703 0.0513441 0.508335 -0.138673 0.809739 0.117828C0.858581 0.159155 0.900743 0.209467 0.944994 0.257084C2.58727 2.02429 4.22954 3.79149 5.87181 5.5587C5.91147 5.60137 5.95322 5.64225 6.03045 5.72131Z"
      fill="black"
    />
  </svg>
)

export const CollapsibleMenuSub = ({ section }: { section: MenuItem }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div
      className={`${applyModifiers(
        handles.collapsibleMenu,
        isOpen ? 'open' : 'closed'
      )} ${applyModifiers(handles.collapsibleMenu, 'submenu')}`}
    >
      <Collapsible
        header={
          <div
            className={applyModifiers(handles.collapsibleMenuTitle, 'submenu')}
          >
            {section.__editorItemTitle}
            <span
              className={applyModifiers(
                handles.collapsibleMenuTitleArrow,
                isOpen ? 'open' : 'closed'
              )}
            >
              <ArrowIcon />
            </span>
          </div>
        }
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        arrowAlign="center"
        align="right"
        caretColor="#000"
      >
        <ul className={handles.submenuUl}>
          {section.subMenu?.map((subItem: MenuItem) => (
            <li key={subItem.__editorItemTitle} className={handles.submenuLi}>
              <Link
                to={subItem.href}
                fetchPage
                className={applyModifiers(
                  handles.menuLink,
                  subItem.__editorItemTitle.toLowerCase().includes('todos')
                    ? 'seeAll'
                    : ''
                )}
              >
                {subItem.__editorItemTitle}
              </Link>
            </li>
          ))}
        </ul>
      </Collapsible>
    </div>
  )
}

export const CollapsibleMenu = ({ section }: { section: MainMenu }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div
      className={applyModifiers(
        handles.collapsibleMenu,
        isOpen ? 'open' : 'closed'
      )}
    >
      <Collapsible
        header={
          <div className={applyModifiers(handles.collapsibleMenuTitle, 'main')}>
            {section.__editorItemTitle}
            <span
              className={applyModifiers(
                handles.collapsibleMenuTitleArrow,
                isOpen ? 'open' : 'closed'
              )}
            >
              <ArrowIcon />
            </span>
          </div>
        }
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        arrowAlign="center"
        align="right"
        caretColor="#000"
      >
        <div className={handles.childrenContainer}>
          {section?.menu?.map((subItem: MenuItem) => (
            <CollapsibleMenuSub
              key={subItem.__editorItemTitle}
              section={subItem}
            />
          ))}
        </div>
      </Collapsible>
    </div>
  )
}

export default function CustomMenuMobile({
  departments,
  others,
  contacts,
}: {
  departments: MainMenu[]
  others: MenuItem[]
  contacts: MenuItem[]
}) {
  const { handles } = useCssHandles(CSS_HANDLES)

  console.log(departments, others, contacts)

  return (
    <section className={applyModifiers(handles.menuContainer, 'mobile')}>
      <div className={handles.menuItems}>
        {departments.map((department) => (
          <CollapsibleMenu
            key={department.__editorItemTitle}
            section={department}
          />
        ))}
      </div>
      <div className={handles.menuOthers}>
        <div className={applyModifiers(handles.profileContainer, 'others')}>
          {others.map((other) => (
            <Link
              key={other.__editorItemTitle}
              to={other.href}
              fetchPage
              className={handles.menuLink}
            >
              {other.icon && (
                <img
                  width={24}
                  height={24}
                  src={other.icon}
                  title={other.__editorItemTitle}
                  alt={other.__editorItemTitle}
                  className={handles.menuOthersIcon}
                />
              )}
              {other.__editorItemTitle}
            </Link>
          ))}
        </div>
        <div className={applyModifiers(handles.profileContainer, 'contacts')}>
          <h4 className={applyModifiers(handles.profileContainer, 'title')}>
            Contatos
          </h4>
          {contacts.map((contact) => (
            <Link
              key={contact.__editorItemTitle}
              to={contact.href}
              fetchPage
              className={handles.menuLink}
            >
              {contact.icon && (
                <img
                  width={24}
                  height={24}
                  src={contact.icon}
                  title={contact.__editorItemTitle}
                  alt={contact.__editorItemTitle}
                  className={handles.menuOthersIcon}
                />
              )}
              {contact.__editorItemTitle}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
