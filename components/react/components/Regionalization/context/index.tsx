import type { FC } from 'react'
import React, { createContext, useContext, useMemo, useState } from 'react'

interface RegionalizationProps {
  isOpenModal: boolean
  setIsOpenModal: (isOpenModal: boolean) => void
}

const RegionalizationContext = createContext<RegionalizationProps | null>(null)

export const RegionalizationProvider: FC = ({ children }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const regionalizationProviderValue = useMemo(
    () => ({
      isOpenModal,
      setIsOpenModal,
    }),
    [isOpenModal, setIsOpenModal]
  )

  return (
    <RegionalizationContext.Provider value={regionalizationProviderValue}>
      {children}
    </RegionalizationContext.Provider>
  )
}

export function useRegionalizationContext() {
  const context = useContext(RegionalizationContext)

  if (!context) {
    throw new Error(
      'useRegionalizationContext must be used within a RegionalizationProvider'
    )
  }

  return context
}
