import React, { Fragment, useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import { Collapsible } from 'vtex.styleguide'

import type { MainMenu, MenuItem } from './index'
import ProfileContainer from './ProfileContainer'

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

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
  >
    <path
      d="M18.0597 2.08337L2.22641 17.9167M2.22641 2.08337L18.0597 17.9167"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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

export const CollapsibleMenu = ({ section }: { section: MenuItem }) => {
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
          section?.href ? (
            <Link className={handles.collapsibleMenuTitle} to={section.href}>
              {section.__editorItemTitle}
            </Link>
          ) : (
            <span className={handles.collapsibleMenuTitle}>
              {section.__editorItemTitle}
            </span>
          )
        }
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        arrowAlign="center"
        align="right"
        caretColor="#000"
      >
        <div />
      </Collapsible>
    </div>
  )
}

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="12"
    viewBox="0 0 6 12"
    fill="none"
  >
    <path
      d="M5.75002 6.57136L1.47709 10.8443C1.31596 11 1.10011 11.0862 0.876041 11.0843C0.65197 11.0824 0.437603 10.9926 0.279111 10.8342C0.120619 10.6758 0.0306813 10.4615 0.028671 10.2374C0.0266608 10.0134 0.112739 9.79746 0.268364 9.63624L3.93761 5.96699L0.268364 2.29843C0.185163 2.21999 0.11855 2.12565 0.0724696 2.02101C0.0263888 1.91636 0.00177682 1.80353 9.27021e-05 1.68919C-0.00159141 1.57486 0.0196863 1.46136 0.0626649 1.3554C0.105643 1.24944 0.169448 1.15318 0.250302 1.07232C0.331156 0.99147 0.427413 0.927665 0.533373 0.884686C0.639333 0.841708 0.75284 0.82043 0.867172 0.822114C0.981504 0.823798 1.09434 0.84841 1.19898 0.89449C1.30363 0.940571 1.39797 1.00718 1.47641 1.09038L5.74933 5.36331C5.82874 5.44257 5.89175 5.5367 5.93476 5.64031C5.97777 5.74393 5.99994 5.855 6 5.96719C6.00006 6.07938 5.97802 6.19048 5.93513 6.29415C5.89223 6.39781 5.82933 6.49201 5.75002 6.57136Z"
      fill="black"
    />
  </svg>
)

export default function CustomMenuMobile({
  departments,
}: {
  departments: MainMenu[]
}) {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [isOpen, setIsOpen] = useState(false)
  const [openDept, setOpenDept] = useState<string | null>(null)

  return (
    <Fragment>
      <div className={handles.menuContainerItem}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-transparent bn pointer"
          style={{
            padding: 0,
          }}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <section
        className={applyModifiers(handles.menuContainer, 'mobile')}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <ProfileContainer />
        <ul className={handles.menuItemUl}>
          {departments.map((dept) => (
            <li key={dept.__editorItemTitle} className={handles.menuItemLi}>
              <button
                className={handles.drawerButton}
                onClick={() =>
                  setOpenDept(
                    openDept === dept.__editorItemTitle
                      ? null
                      : dept.__editorItemTitle
                  )
                }
              >
                {dept.__editorItemTitle}
                <ArrowIcon />
              </button>
              {openDept === dept.__editorItemTitle && (
                <div className={handles.submenuItemsWrapper}>
                  <button
                    className={handles.backButton}
                    onClick={() => setOpenDept(null)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="12"
                      viewBox="0 0 6 12"
                      fill="none"
                    >
                      <path
                        d="M0.249981 5.33495L4.52291 1.06202C4.68405 0.906308 4.89989 0.820109 5.12396 0.821993C5.34803 0.823876 5.5624 0.913692 5.72089 1.07209C5.87938 1.2305 5.96932 1.44481 5.97133 1.66888C5.97334 1.89295 5.88726 2.10885 5.73164 2.27007L2.06239 5.93932L5.73164 9.60788C5.81484 9.68632 5.88145 9.78066 5.92753 9.88531C5.97361 9.98995 5.99822 10.1028 5.99991 10.2171C6.00159 10.3314 5.98031 10.445 5.93734 10.5509C5.89436 10.6569 5.83055 10.7531 5.7497 10.834C5.66884 10.9148 5.57259 10.9786 5.46663 11.0216C5.36067 11.0646 5.24716 11.0859 5.13283 11.0842C5.0185 11.0825 4.90566 11.0579 4.80102 11.0118C4.69637 10.9657 4.60203 10.8991 4.52359 10.8159L0.250666 6.543C0.171263 6.46374 0.108255 6.36962 0.0652446 6.266C0.0222339 6.16238 6.38593e-05 6.05131 4.49805e-07 5.93912C-6.29597e-05 5.82693 0.0219812 5.71583 0.0648742 5.61216C0.107767 5.5085 0.170668 5.4143 0.249981 5.33495Z"
                        fill="#27272A"
                      />
                    </svg>
                    {dept.__editorItemTitle}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </Fragment>
  )
}
