export const initialState = {
  isDragging: false,
  indexSelectedPane: null,
  initialPosition: null,
  dividerPositionDelta: 0,
  maxSpaceBefore: 0,
  maxSpaceAfter: 0,
  paneSizes: []
}

const paneReducer = (state, {type, payload}) => {
  switch (type) {
    case 'startDrag': {
      console.log(`startDrag`)
      const {indexSelectedPane, initialPosition, maxSpaceBefore, maxSpaceAfter} = payload
      const newState = {
        ...state,
        isDragging: true,
        indexSelectedPane,
        initialPosition,
        maxSpaceBefore,
        maxSpaceAfter
      }
      return newState
    }

    case 'endDrag': {
      console.log('endDrag')
      const {
        isDragging,
        indexSelectedPane,
        initialPosition,
        dividerPositionDelta,
        maxSpaceBefore,
        maxSpaceAfter,
        paneSizes
      } = state

      // if not in valid dragging process, return the same state
      if (
        !isDragging ||
        indexSelectedPane == null ||
        initialPosition == null ||
        dividerPositionDelta === 0 ||
        maxSpaceBefore === 0 ||
        maxSpaceAfter === 0
      )
        return state

      // if dropping divider outside allowed boundaries, clear all values except pane sizes
      if (dividerPositionDelta < -maxSpaceBefore || dividerPositionDelta > maxSpaceAfter)
        return {...initialState, paneSizes}

      // otherwise, update pane sizes according to divider position and clear all other values
      const newSizes = [...paneSizes]
      newSizes[indexSelectedPane] = paneSizes[indexSelectedPane] - dividerPositionDelta
      newSizes[indexSelectedPane - 1] = paneSizes[indexSelectedPane - 1] + dividerPositionDelta

      return {...initialState, paneSizes: newSizes}
    }

    case 'updatePaneSizes': {
      console.log('updatePaneSizes')
      const {paneSizes} = payload
      return {...state, paneSizes}
    }

    case 'updateDividerPosition': {
      console.log('updateDividerPosition')
      const {dividerPositionDelta} = payload
      return {...state, dividerPositionDelta}
    }

    default:
      console.error('unkown type: ', type)
      return state
  }
}

export default paneReducer
