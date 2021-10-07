export const initialState = {
  indexSelectedPane: null,
  initialDividerPosition: null,
  currentDividerPosition: 0,
  maxSpaceBefore: 0,
  maxSpaceAfter: 0,
  paneSizes: []
}

const paneReducer = (state, {type, payload}) => {
  switch (type) {
    case 'startDrag': {
      const {
        indexSelectedPane,
        initialDividerPosition,
        currentDividerPosition,
        maxSpaceBefore,
        maxSpaceAfter
      } = payload
      const newState = {
        ...state,
        indexSelectedPane,
        initialDividerPosition,
        currentDividerPosition,
        maxSpaceBefore,
        maxSpaceAfter
      }
      return newState
    }

    case 'endDrag': {
      const {
        indexSelectedPane,
        initialDividerPosition,
        currentDividerPosition,
        maxSpaceBefore,
        maxSpaceAfter,
        paneSizes
      } = state

      const displacement = currentDividerPosition - initialDividerPosition

      // if not in valid dragging process, return the same state
      if (
        indexSelectedPane == null ||
        initialDividerPosition == null ||
        currentDividerPosition === initialDividerPosition ||
        maxSpaceBefore === 0 ||
        maxSpaceAfter === 0
      )
        return state

      // if dropping divider outside allowed boundaries, clear all values except pane sizes
      if (displacement < -maxSpaceBefore || displacement > maxSpaceAfter)
        return {...initialState, paneSizes}

      // otherwise, update pane sizes according to divider position and clear all other values
      const newSizes = [...paneSizes]
      newSizes[indexSelectedPane] = paneSizes[indexSelectedPane] - displacement
      newSizes[indexSelectedPane - 1] = paneSizes[indexSelectedPane - 1] + displacement

      return {...initialState, paneSizes: newSizes}
    }

    case 'updatePaneSizes': {
      const {paneSizes} = payload
      return {...state, paneSizes}
    }

    case 'updateDividerPosition': {
      const {currentDividerPosition} = payload
      return {...state, currentDividerPosition}
    }

    default:
      console.error('unkown type: ', type)
      return state
  }
}

export default paneReducer
