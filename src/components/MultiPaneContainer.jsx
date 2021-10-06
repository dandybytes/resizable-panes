import React, {useCallback, useEffect, useReducer, useRef} from 'react'

import './MultiPaneContainer.css'

import paneReducer, {initialState} from '../reducers/paneReducer'
import {useElementSize} from '../hooks/useElementSize'

import ResizablePane from './ResizablePane'
import Divider from './Divider'

const MultiPaneContainer = ({minPaneSize = 200, children}) => {
  const containerRef = useRef(null)

  const containerSize = useElementSize(containerRef)

  const numChildren = children?.length ?? 0

  const [state, dispatch] = useReducer(paneReducer, initialState)
  const {isDragging, indexSelectedPane, initialPosition, dividerPositionDelta, paneSizes} = state

  const handleDragStart = useCallback(
    ({indexSelectedPane, initialPosition, maxSpaceBefore, maxSpaceAfter}) => {
      dispatch({
        type: 'startDrag',
        payload: {indexSelectedPane, initialPosition, maxSpaceBefore, maxSpaceAfter}
      })
    },
    [dispatch]
  )

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return
    dispatch({type: 'endDrag'})
  }, [dispatch, isDragging])

  const updateDividerPosition = useCallback(
    event => {
      if (!isDragging) return
      dispatch({
        type: 'updateDividerPosition',
        payload: {dividerPositionDelta: event.clientX - initialPosition}
      })
    },
    [dispatch, initialPosition, isDragging]
  )

  // add event listeners
  useEffect(() => {
    const container = containerRef.current

    if (container) {
      console.log('adding event listeners')
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
    let newPaneSizes = []
    if (!paneSizes?.length && containerSize?.width) {
      const averageSize = parseInt(containerSize?.width / numChildren)
      newPaneSizes = Array(numChildren ?? 0).fill(averageSize)
    } else if (containerSize?.width) {
      const previousTotalWidth = paneSizes.reduce((acc, paneSize) => acc + paneSize, 0)
      newPaneSizes = paneSizes.map(previousPaneSize =>
        parseInt((containerSize.width * previousPaneSize) / previousTotalWidth)
      )
    } else {
      newPaneSizes = paneSizes
    }

    dispatch({
      type: 'updatePaneSizes',
      payload: {paneSizes: newPaneSizes}
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numChildren, containerSize?.width])

  return (
    <div className='splittable-container' ref={containerRef}>
      {!paneSizes?.length
        ? null
        : children.map((child, index) => {
            const isSelected = indexSelectedPane === index
            const maxSpaceBefore = paneSizes[index - 1] - minPaneSize
            const maxSpaceAfter = paneSizes[index] - minPaneSize

            return index > 0 ? (
              [
                <Divider
                  key={`divider-${index}`}
                  index={index}
                  isSelected={isSelected}
                  isDragging={isDragging}
                  dividerPositionDelta={dividerPositionDelta}
                  maxSpaceBefore={maxSpaceBefore}
                  maxSpaceAfter={maxSpaceAfter}
                  handleDragStart={handleDragStart}
                />,
                <ResizablePane key={`pane-${index}`} paneSize={paneSizes[index]} child={child} />
              ]
            ) : (
              <ResizablePane key={`pane-${index}`} paneSize={paneSizes[index]} child={child} />
            )
          })}
    </div>
  )
}

export default MultiPaneContainer
