import React from 'react'

const GridIcon = () => (
  <svg
    className="vtex-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <rect className="vtex-icon" width="7" height="7" rx="1" fill="black" />
    <rect
      className="vtex-icon"
      x="9"
      width="7"
      height="7"
      rx="1"
      fill="black"
    />
    <rect
      className="vtex-icon"
      y="9"
      width="7"
      height="7"
      rx="1"
      fill="black"
    />
    <rect
      className="vtex-icon"
      x="9"
      y="9"
      width="7"
      height="7"
      rx="1"
      fill="black"
    />
  </svg>
)

const ListIcon = () => (
  <svg
    className="vtex-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <rect className="vtex-icon" width="7" height="16" rx="1" fill="#D4D4D8" />
    <rect
      className="vtex-icon"
      x="9"
      width="7"
      height="16"
      rx="1"
      fill="#D4D4D8"
    />
  </svg>
)

export default function CustomIcons({ icon }: { icon: string }) {
  const icons: Record<string, JSX.Element> = {
    grid: <GridIcon />,
    list: <ListIcon />,
  }

  const iconElement = icons[icon.toLowerCase()]

  if (iconElement) {
    return iconElement
  }

  return null
}
