import React from 'react'

import { RegionalizationProvider } from './components/Regionalization/context'
import CustomRegionSummary from './components/Regionalization/RegionSummary'

const RegionSummary: StoreFrontFC = () => {
  return (
    <RegionalizationProvider>
      <CustomRegionSummary />
    </RegionalizationProvider>
  )
}

export default RegionSummary
