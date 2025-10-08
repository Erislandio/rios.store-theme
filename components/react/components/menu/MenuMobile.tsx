/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, useEffect, useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import { Drawer, DrawerCloseButton, DrawerTrigger } from 'vtex.store-drawer'

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
  'allDepartamentWrapperLevel2',
  'menuContainerItem',
  'drawerHeader',
  'drawerHeaderClose',
  'drawerHeaderCloseButton',
  'drawerHeaderCloseContainer',
  'childrenContainer',
  'drawerTagLink',
  'drawerUl',
  'drawerLi',
  'allDepartamentBottom',
  'allDepartamentBottomDevider',
  'menuItemUl',
  'menuItemLi',
  'drawerLiAccount',
  'drawerUlAccount',
] as const

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
  >
    <g clip-path="url(#clip0_11766_5350)">
      <path
        d="M18.0597 2.08337L2.22641 17.9167M2.22641 2.08337L18.0597 17.9167"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_11766_5350">
        <rect
          width="19"
          height="19"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
)

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="20"
    viewBox="0 0 23 20"
    fill="none"
  >
    <path
      d="M1.714 0C1.25942 0 0.823467 0.180577 0.502029 0.502014C0.180592 0.823452 0 1.25942 0 1.714C0 2.16859 0.180592 2.60454 0.502029 2.92598C0.823467 3.24742 1.25942 3.42799 1.714 3.42799H21.143C21.5976 3.42799 22.0335 3.24742 22.355 2.92598C22.6764 2.60454 22.857 2.16859 22.857 1.714C22.857 1.25942 22.6764 0.823452 22.355 0.502014C22.0335 0.180577 21.5976 0 21.143 0H1.714ZM1.714 8.286C1.25942 8.286 0.823467 8.46659 0.502029 8.78802C0.180592 9.10946 0 9.54542 0 10C0 10.4546 0.180592 10.8905 0.502029 11.212C0.823467 11.5334 1.25942 11.714 1.714 11.714H21.143C21.5976 11.714 22.0335 11.5334 22.355 11.212C22.6764 10.8905 22.857 10.4546 22.857 10C22.857 9.54542 22.6764 9.10946 22.355 8.78802C22.0335 8.46659 21.5976 8.286 21.143 8.286H1.714ZM1.714 16.572C1.25942 16.572 0.823467 16.7526 0.502029 17.074C0.180592 17.3955 0 17.8314 0 18.286C0 18.7406 0.180592 19.1765 0.502029 19.498C0.823467 19.8194 1.25942 20 1.714 20H21.143C21.5976 20 22.0335 19.8194 22.355 19.498C22.6764 19.1765 22.857 18.7406 22.857 18.286C22.857 17.8314 22.6764 17.3955 22.355 17.074C22.0335 16.7526 21.5976 16.572 21.143 16.572H1.714Z"
      fill="#27272A"
    />
  </svg>
)

export default function CustomMenuMobile({
  departments,
}: {
  departments: any[]
  others: any[]
}) {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const height = document.getElementById('header-mobile')?.clientHeight ?? 168

    setHeaderHeight(height)
  }, [isOpen])

  return (
    <Fragment>
      <div
        role="presentation"
        aria-hidden="false"
        className="pa4 pointer vtex-store-drawer-0-x-openIconContainer vtex-store-drawer-0-x-openIconContainer--menu-mobile"
      >
        <button
          onClick={() => {
            setIsOpen(!isOpen)
          }}
          role="button"
          tabIndex={0}
          className="vtex-store-drawer-0-x-drawerTriggerContainer vtex-store-drawer-0-x-drawerTriggerContainer--menu-mobile"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      <section
        className={applyModifiers(handles.menuContainer, 'mobile')}
        style={{ top: `${headerHeight}px`, display: isOpen ? 'block' : 'none' }}
      >
        <ul className={handles.menuItemUl}>
          {departments.map((item) => {
            return (
              <li key={item.__editorItemTitle} className={handles.menuItemLi}>
                {item.url ? (
                  <Link
                    to={item.url}
                    className="ncrangola-components-1-x-drawerTriggerContainer ncrangola-components-1-x-drawerTriggerContainer--link"
                  >
                    {item.icon && (
                      <img
                        loading="eager"
                        src={item.icon}
                        alt={`Icon for ${item.__editorItemTitle}`}
                        width={24}
                        height={24}
                      />
                    )}
                    {item.__editorItemTitle}
                  </Link>
                ) : (
                  <DrawerTrigger customPixelEventId={item.__editorItemTitle}>
                    <span>
                      {item.icon && (
                        <img
                          loading="eager"
                          src={item.icon}
                          alt={`Icon for ${item.__editorItemTitle}`}
                          width={24}
                          height={24}
                        />
                      )}
                      {item.__editorItemTitle}
                    </span>
                  </DrawerTrigger>
                )}
                <Drawer
                  position="left"
                  customPixelEventId={item.__editorItemTitle}
                  customIcon={<span />}
                  renderingStrategy="lazy"
                  slideDirection="leftToRight"
                  header={
                    <section className={handles.drawerHeaderCloseContainer}>
                      <div className={handles.drawerHeaderClose}>
                        <DrawerCloseButton text={item.__editorItemTitle} />
                      </div>
                      <div className={handles.drawerHeaderCloseButton}>
                        <DrawerCloseButton />
                      </div>
                    </section>
                  }
                >
                  <ul className={handles.drawerUl}>
                    {item?.sections?.map((section: any) => {
                      return (
                        <li
                          key={section.__editorItemTitle}
                          className={handles.drawerLi}
                        >
                          {section.url ? (
                            <Link
                              className={handles.drawerTagLink}
                              to={section.url}
                            >
                              {section.__editorItemTitle}
                            </Link>
                          ) : (
                            <DrawerTrigger
                              customPixelEventId={section.__editorItemTitle}
                            >
                              <span>{section.__editorItemTitle}</span>
                            </DrawerTrigger>
                          )}
                          <Drawer
                            position="left"
                            customPixelEventId={section.__editorItemTitle}
                            customIcon={<span />}
                            renderingStrategy="lazy"
                            slideDirection="leftToRight"
                            header={
                              <section
                                className={handles.drawerHeaderCloseContainer}
                              >
                                <div className={handles.drawerHeaderClose}>
                                  <DrawerCloseButton
                                    text={section.__editorItemTitle}
                                  />
                                </div>
                                <div
                                  className={handles.drawerHeaderCloseButton}
                                >
                                  <DrawerCloseButton />
                                </div>
                              </section>
                            }
                          >
                            <ul className={handles.drawerUl}>
                              {section?.links?.map((link: any) => {
                                return (
                                  <li
                                    className={handles.drawerLi}
                                    key={link.__editorItemTitle}
                                  >
                                    <Link
                                      to={link.url}
                                      className={handles.drawerTagLink}
                                    >
                                      {link.__editorItemTitle}
                                    </Link>
                                  </li>
                                )
                              })}
                            </ul>
                          </Drawer>
                        </li>
                      )
                    })}
                  </ul>
                </Drawer>
              </li>
            )
          })}
        </ul>
        <div className={handles.allDepartamentBottomDevider} />
      </section>
    </Fragment>
  )
}
