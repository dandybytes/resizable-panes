import React from 'react'

import './Pane.css'

const Pane = ({size, orientation, child}) => {
  const style = {
    width: orientation === 'row' ? `${size}px` : '100%',
    flexDirection: orientation === 'column' ? 'column' : 'row'
  }

  return (
    <div className='resizable-pane' style={style}>
      {child}
    </div>
  )
}

export default Pane
