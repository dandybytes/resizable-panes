import React, {useContext} from 'react'

import {DividerContext} from '../context'

import './Divider.css'

const Divider = ({index, maxSpaceBefore, maxSpaceAfter}) => {
  const {
    orientation,
    indexSelectedPane,
    initialDividerPosition,
    currentDividerPosition,
    handleDragStart
  } = useContext(DividerContext)

  const isSelected = indexSelectedPane === index
  const displacement = currentDividerPosition - initialDividerPosition

  const getDividerStatus = () => {
    if (!isSelected || currentDividerPosition === initialDividerPosition) return 'idle'
    const isOutsideBoundaries = displacement < -maxSpaceBefore || displacement > maxSpaceAfter
    return isOutsideBoundaries ? 'invalid' : 'valid'
  }

  const className =
    'divider' + (orientation === 'row' ? ' vertical ' : ' horizontal ') + getDividerStatus()

  const style = {
    left: isSelected && orientation === 'row' ? displacement : 0,
    top: isSelected && orientation === 'column' ? displacement : 0,
    display: index > 0 ? 'block' : 'none',
    width: orientation === 'row' ? '0.25rem' : '100%',
    height: orientation === 'column' ? '0.25rem' : 'inherit'
  }

  return (
    <div
      onMouseDown={event => {
        const position = orientation === 'column' ? event.clientY : event.clientX
        handleDragStart({
          indexSelectedPane: index,
          initialDividerPosition: position,
          currentDividerPosition: position,
          maxSpaceBefore,
          maxSpaceAfter
        })
      }}
      style={style}
      className={className}
    />
  )
}

export default Divider
