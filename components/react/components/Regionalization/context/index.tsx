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
  regionId: string
}

const RegionalizationContext = createContext<RegionalizationProps | null>(null)

export const RegionalizationProvider: FC = ({ children }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const updateSession = useUpdateSession()
  const [regionId, setRegionId] = useState<string>('')
  // const [sessionAddress, setSessionAddress] = useState<VtexPostalCodeResponse>()

  const setRegionIdSession = useCallback(async () => {
    if (!regionId) return

    await updateSession({
      variables: {
        fields: { regionId },
      },
    })
  }, [regionId])

  useEffect(() => {
    setRegionIdSession().catch((error) => console.error(error))
  }, [regionId])

  const regionalizationProviderValue = useMemo(
    () => ({
      isOpenModal,
      setIsOpenModal,
      setRegionId,
      regionId,
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
