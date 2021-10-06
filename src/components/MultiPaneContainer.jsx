import React, {useCallback, useEffect, useReducer, useRef} from 'react'

import './MultiPaneContainer.css'

import paneReducer, {initialState} from '../reducers/paneReducer'
import {useElementSize} from '../hooks/useElementSize'

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

            const getDividerStatus = () => {
              if (!isSelected || !isDragging || dividerPositionDelta === 0) return 'idle'
              const isOutsideBoundaries =
                dividerPositionDelta < -maxSpaceBefore || dividerPositionDelta > maxSpaceAfter
              return isOutsideBoundaries ? 'invalid' : 'valid'
            }

            const divider = (
              <div
                onMouseDown={event =>
                  handleDragStart({
                    indexSelectedPane: index,
                    initialPosition: event.clientX,
                    maxSpaceBefore,
                    maxSpaceAfter
                  })
                }
                key={`divider-${index}`}
                style={isSelected ? {left: dividerPositionDelta} : {}}
                className={`divider ${getDividerStatus()}`}
              />
            )

            const pane = (
              <div
                key={`pane-${index}`}
                className='resizable-pane'
                style={{width: `${paneSizes[index]}px`}}
              >
                {child}
              </div>
            )

            return index > 0 ? [divider, pane] : pane
          })}
    </div>
  )
}

export default MultiPaneContainer
