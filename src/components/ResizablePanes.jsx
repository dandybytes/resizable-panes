import React from 'react'

import {MainProvider} from '../context'

import PaneContainer from './PaneContainer'

const ResizablePanes = ({orientation, minPaneSize = 200, children}) => {
  return (
    <MainProvider orientation={orientation} minPaneSize={minPaneSize}>
      <PaneContainer>{children}</PaneContainer>
    </MainProvider>
  )
}

export default ResizablePanes
