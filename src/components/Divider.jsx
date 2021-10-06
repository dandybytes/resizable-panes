import React, {useContext} from 'react'

import {DividerContext} from '../context'

import './Divider.css'

const Divider = ({orientation, index, maxSpaceBefore, maxSpaceAfter}) => {
  const {indexSelectedPane, initialDividerPosition, currentDividerPosition, handleDragStart} =
    useContext(DividerContext)

  const isSelected = indexSelectedPane === index
  const displacement = currentDividerPosition - initialDividerPosition

  const getDividerStatus = () => {
    if (!isSelected || currentDividerPosition === initialDividerPosition) return 'idle'
    const isOutsideBoundaries = displacement < -maxSpaceBefore || displacement > maxSpaceAfter
    return isOutsideBoundaries ? 'invalid' : 'valid'
  }

  const style = {
    left: isSelected ? displacement : 0,
    display: index > 0 ? 'block' : 'none',
    width: orientation === 'row' ? '0.25rem' : '100%',
    height: orientation === 'column' ? '0.25rem' : 'inherit'
  }

  return (
    <div
      onMouseDown={event =>
        handleDragStart({
          indexSelectedPane: index,
          initialDividerPosition: event.clientX,
          currentDividerPosition: event.clientX,
          maxSpaceBefore,
          maxSpaceAfter
        })
      }
      style={style}
      className={`divider ${getDividerStatus()}`}
    />
  )
}

export default Divider
