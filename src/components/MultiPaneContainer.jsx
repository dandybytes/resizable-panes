import React, {useEffect, useContext, useRef} from 'react'

import './MultiPaneContainer.css'

import {useElementSize} from '../hooks/useElementSize'

import ResizablePane from './ResizablePane'
import Divider from './Divider'
import {PaneContext} from '../context'

const MultiPaneContainer = ({orientation = 'row', minPaneSize = 200, children}) => {
  // console.log('main pane container running')
  const containerRef = useRef(null)

  const {paneSizes, updateSizes, handleDragEnd, updateDividerPosition} = useContext(PaneContext)

  const containerSize = useElementSize(containerRef)

  const numChildren = children?.length ?? 0

  // add event listeners
  useEffect(() => {
    const container = containerRef.current

    if (container) {
      // console.log('adding event listeners')
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

  // adjust pane sizes whenever the container resizes
  useEffect(() => {
    let newPaneSizes = paneSizes
    // if pane sizes not set yet, do so
    if (!paneSizes?.length && containerSize?.width) {
      const averageSize = parseInt(containerSize?.width / numChildren)
      newPaneSizes = Array(numChildren ?? 0).fill(averageSize)
      // update pane sizes when the container resizes
    } else if (containerSize?.width) {
      const previousTotalWidth = paneSizes.reduce((acc, paneSize) => acc + paneSize, 0)
      newPaneSizes = paneSizes.map(previousPaneSize =>
        parseInt((containerSize.width * previousPaneSize) / previousTotalWidth)
      )
    }

    updateSizes(newPaneSizes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numChildren, containerSize?.width])

  return (
    <div
      className='splittable-container'
      ref={containerRef}
      style={{display: 'flex', flexDirection: orientation === 'column' ? 'column' : 'row'}}
    >
      {!paneSizes?.length
        ? null
        : children.map((child, index) => {
            const maxSpaceBefore = paneSizes[index - 1] - minPaneSize
            const maxSpaceAfter = paneSizes[index] - minPaneSize

            return index > 0 ? (
              [
                <Divider
                  key={`divider-${index}`}
                  orientation={orientation}
                  index={index}
                  maxSpaceBefore={maxSpaceBefore}
                  maxSpaceAfter={maxSpaceAfter}
                />,
                <ResizablePane
                  key={`pane-${index}`}
                  size={paneSizes[index]}
                  orientation={orientation}
                  child={child}
                />
              ]
            ) : (
              <ResizablePane
                key={`pane-${index}`}
                size={paneSizes[index]}
                orientation={orientation}
                child={child}
              />
            )
          })}
    </div>
  )
}

export default MultiPaneContainer
