import React from 'react'

import './ResizablePane.css'

const ResizablePane = ({paneSize, child}) => {
  return (
    <div className='resizable-pane' style={{width: `${paneSize}px`}}>
      {child}
    </div>
  )
}

export default ResizablePane
