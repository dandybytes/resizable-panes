import React, {useEffect, useContext, useRef} from 'react'

import './PaneContainer.css'

import {PaneContext} from '../context'
import {useElementSize} from '../hooks/useElementSize'

import Pane from './Pane'
import Divider from './Divider'

const PaneContainer = ({children}) => {
  const containerRef = useRef(null)

  const {orientation, minPaneSize, paneSizes, updateSizes, handleDragEnd, updateDividerPosition} =
    useContext(PaneContext)

  const relevantSize = orientation === 'row' ? 'width' : 'height'

  const containerSize = useElementSize(containerRef)

  const previousOrientationRef = useRef(orientation)
  const previousContainerSizeRef = useRef(containerSize?.[relevantSize])

  const numChildren = children?.length ?? 0

  // add event listeners
  useEffect(() => {
    const container = containerRef.current

    if (container) {
      container.addEventListener('mousemove', updateDividerPosition)
      container.addEventListener('mouseup', handleDragEnd)
      container.addEventListener('mouseleave', handleDragEnd)

      return () => {
        container.removeEventListener('mousemove', updateDividerPosition)
        container.removeEventListener('mouseup', handleDragEnd)
        container.removeEventListener('mouseleave', handleDragEnd)
      }
    }
  }, [containerRef, updateDividerPosition, handleDragEnd])

  useEffect(() => {
    const currentContainerSize = containerSize?.[relevantSize]
    if (!currentContainerSize) return

    const orientationHasChanged = previousOrientationRef.current !== orientation
    const previousContainerSize = previousContainerSizeRef?.[relevantSize]
    const containerSizeHasChanged =
      previousContainerSize != null && previousContainerSize !== currentContainerSize

    // divide container size into equal parts among all panes when first loading and whenever orientation changes
    if (!paneSizes?.length || orientationHasChanged) {
      const averageSize = parseInt(currentContainerSize / numChildren)
      const newPaneSizes = Array(numChildren ?? 0).fill(averageSize)
      updateSizes(newPaneSizes)
      // adjust pane sizes whenever the container resizes
    } else if (containerSizeHasChanged && !orientationHasChanged) {
      const previousTotalWidth = paneSizes.reduce((acc, paneSize) => acc + paneSize, 0)
      const newPaneSizes = paneSizes.map(previousPaneSize =>
        parseInt((currentContainerSize * previousPaneSize) / previousTotalWidth)
      )
      updateSizes(newPaneSizes)
    }

    if (orientationHasChanged) previousOrientationRef.current = orientation
    if (containerSizeHasChanged) previousContainerSizeRef.current = containerSize
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orientation, containerSize, numChildren, updateSizes, paneSizes.length])

  return (
    <div
      className='splittable-container'
      ref={containerRef}
      style={{display: 'flex', flexDirection: orientation === 'column' ? 'column' : 'row'}}
    >
      {!paneSizes?.length
        ? null
        : children.map((child, index) =>
            index > 0 ? (
              [
                <Divider
                  key={`divider-${index}`}
                  index={index}
                  maxSpaceBefore={paneSizes[index - 1] - minPaneSize}
                  maxSpaceAfter={paneSizes[index] - minPaneSize}
                />,
                <Pane
                  key={`pane-${index}`}
                  size={paneSizes[index]}
                  orientation={orientation}
                  child={child}
                />
              ]
            ) : (
              <Pane
                key={`pane-${index}`}
                size={paneSizes[index]}
                orientation={orientation}
                child={child}
              />
            )
          )}
    </div>
  )
}

export default PaneContainer
