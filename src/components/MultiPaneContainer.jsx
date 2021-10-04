import React, {useCallback, useEffect, useReducer, useRef} from 'react'

import './MultiPaneContainer.css'

const paneReducer = (state, {type, payload}) => {
  switch (type) {
    case 'startDragging': {
      const {currentPaneIndex, initialPosition} = payload
      const newState = {...state, isDragging: true, currentPaneIndex, initialPosition}
      console.log(`startDragging new state:`)
      console.dir(newState)
      return newState
    }

    case 'endDragging': {
      console.log('endDragging')
      const {currentPaneIndex, dividerPositionDelta, paneSizes} = state
      const newSizes = [...paneSizes]
      newSizes[
        currentPaneIndex
      ] = `calc(${paneSizes[currentPaneIndex]} - ${dividerPositionDelta}px)`
      newSizes[currentPaneIndex - 1] = `calc(${
        paneSizes[currentPaneIndex - 1]
      } + ${dividerPositionDelta}px)`

      return {
        ...state,
        isDragging: false,
        dividerPositionDelta: 0,
        currentPaneIndex: null,
        paneSizes: newSizes
      }
    }

    case 'updateDividerPosition': {
      console.log('updateDividerPosition')
      const {dividerPositionDelta} = payload
      return {...state, dividerPositionDelta}
    }

    default:
      return state
  }
}

const MultiPaneContainer = ({children}) => {
  const containerRef = useRef(null)

  const numChildren = children?.length ?? 0
  const initialState = {
    isDragging: false,
    currentPaneIndex: 0,
    initialPosition: null,
    dividerPositionDelta: 0,
    paneSizes: !numChildren ? [] : Array(numChildren ?? 0).fill(`${100 / numChildren}%`)
  }

  const [state, dispatch] = useReducer(paneReducer, initialState)
  const {isDragging, currentPaneIndex, initialPosition, dividerPositionDelta, paneSizes} = state

  const startDragging = useCallback(
    (event, index) => {
      dispatch({
        type: 'startDragging',
        payload: {currentPaneIndex: index, initialPosition: event.clientX}
      })
    },
    [dispatch]
  )

  const endDragging = useCallback(() => {
    if (!isDragging) return
    dispatch({type: 'endDragging'})
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

  useEffect(() => {
    console.log('adding event listeners')
    const container = containerRef.current
    container.addEventListener('mousemove', updateDividerPosition)
    container.addEventListener('mouseup', endDragging)
    container.addEventListener('mouseleave', endDragging)

    return () => {
      container.removeEventListener('mousemove', updateDividerPosition)
      container.removeEventListener('mouseup', endDragging)
      container.removeEventListener('mouseleave', endDragging)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, updateDividerPosition, endDragging])

  if (!paneSizes?.length) return <></>

  return (
    <div className='splittable-container' ref={containerRef}>
      {children.map((child, index) => {
        const divider = (
          <div
            onMouseDown={event => startDragging(event, index)}
            key={`divider-${index}`}
            style={currentPaneIndex === index ? {left: dividerPositionDelta} : {}}
            className='divider'
          />
        )

        const pane = (
          <div key={`pane-${index}`} className='resizable-pane' style={{width: paneSizes[index]}}>
            {child}
          </div>
        )

        return index > 0 ? [divider, pane] : pane
      })}
    </div>
  )
}

export default MultiPaneContainer
