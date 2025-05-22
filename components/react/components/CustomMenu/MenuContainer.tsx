import React from 'react'

const MenuWrapper: React.FC<{
  headerHeight: number
  className: string
  isLoading: boolean
  display: string
}> = ({ headerHeight, children, className, isLoading, display }) => {
  if (isLoading) {
    return null
  }

  return (
    <div
      className={className}
      style={{
        top: headerHeight,
        display,
      }}
    >
      {children}
    </div>
  )
}

export default MenuWrapper
