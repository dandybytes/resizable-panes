import React from 'react'

import './Divider.css'

const Divider = ({
  orientation,
  index,
  isSelected,
  isDragging,
  dividerPositionDelta,
  maxSpaceBefore,
  maxSpaceAfter,
  handleDragStart
}) => {
  const getDividerStatus = () => {
    if (!isSelected || !isDragging || dividerPositionDelta === 0) return 'idle'
    const isOutsideBoundaries =
      dividerPositionDelta < -maxSpaceBefore || dividerPositionDelta > maxSpaceAfter
    return isOutsideBoundaries ? 'invalid' : 'valid'
  }

  const style = {
    left: isSelected ? dividerPositionDelta : 0,
    display: index > 0 ? 'block' : 'none',
    width: orientation === 'row' ? '0.25rem' : '100%',
    height: orientation === 'column' ? '0.25rem' : 'inherit'
  }

  return (
    <div
      onMouseDown={event =>
        handleDragStart({
          indexSelectedPane: index,
          initialPosition: event.clientX,
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
