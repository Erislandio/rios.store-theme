import type { FC } from 'react'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useUpdateSession } from 'vtex.session-client'

interface RegionalizationProps {
  isOpenModal: boolean
  setIsOpenModal: (isOpenModal: boolean) => void
  setRegionId: (regionId: string) => void
  setCityName: (city: string) => void
  regionId: string
}

const RegionalizationContext = createContext<RegionalizationProps | null>(null)

export const RegionalizationProvider: FC = ({ children }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const updateSession = useUpdateSession()
  const [regionId, setRegionId] = useState<string>('')
  const [cityName, setCityName] = useState<string>('')

  useEffect(() => {
    const hasModalBeenShown = localStorage.getItem('hasModalBeenShown')

    if (!hasModalBeenShown) {
      setIsOpenModal(true)
      localStorage.setItem('hasModalBeenShown', 'true')
    }
  }, [])

  const setRegionIdSession = useCallback(async () => {
    if (!regionId) return

    await updateSession({
      variables: {
        fields: { regionId },
      },
    })
  }, [regionId])

  const setAddressInSession = useCallback(async () => {
    if (!cityName) return

    await updateSession({
      variables: {
        fields: { cityName },
      },
    })
  }, [cityName])

  useEffect(() => {
    setRegionIdSession().catch((error) => console.error(error))
    setAddressInSession().catch((error) => console.error(error))
  }, [regionId, cityName])

  const regionalizationProviderValue = useMemo(
    () => ({
      isOpenModal,
      setIsOpenModal,
      setRegionId,
      regionId,
      setCityName,
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
