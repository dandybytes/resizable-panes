import React from 'react'

import './Divider.css'

const Divider = ({
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
    display: index > 0 ? 'block' : 'none'
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
