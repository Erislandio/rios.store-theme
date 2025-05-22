import React from 'react'

import { RegionalizationProvider } from './components/Regionalization/context'
import RegionalizationHeader from './components/Regionalization/HeaderButton'

const Regionalization: StoreFrontFC = () => {
  return (
    <RegionalizationProvider>
      <RegionalizationHeader />
    </RegionalizationProvider>
  )
}

export default Regionalization
