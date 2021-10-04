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

export default paneReducer
